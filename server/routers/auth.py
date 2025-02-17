import os
from fastapi import APIRouter,Depends,HTTPException, status
from schemas.auth import UserCreate,Token
from utils import hash_password,verify_password
from sqlalchemy.orm import Session
from db.connection import get_db
from db.models.user import User,UserProfile
from sqlalchemy.exc import SQLAlchemyError
from jose import JWTError, jwt
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from typing import Annotated
from datetime import timedelta,datetime


# ------------------------------------------------------------------------------
# Configurations
# ------------------------------------------------------------------------------

    
ACCESS_SECRET_KEY = os.environ.get("ACCESS_SECRET_KEY")
REFRESH_SECRET_KEY = os.environ.get("REFRESH_SECRET_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
REFRESH_TOKEN_EXPIRE_DAYS = 7       # 7 days for refresh token


oauth2_bearer = OAuth2PasswordBearer(tokenUrl="auth/token")
router = APIRouter(tags=["auth"],prefix="/auth")

@router.post("/register")
async def register(user: UserCreate, db: Session = Depends(get_db)):
    try:
        # Start transaction
        with db.begin():  
            # Check if email already exists
            existing_user = db.query(User).filter(User.email == user.email).first()
            if existing_user:
                raise HTTPException(status_code=400, detail="User with that email already exist.")
            
            existing_user = db.query(User).filter(User.displayName == user.displayName).first()
            if existing_user:
                raise HTTPException(status_code=400, detail="User with that display name already exist.")
            
            # Hash password
            hashed_password = hash_password(user.password)

            # Create User record
            new_user = User(displayName=user.displayName, email=user.email, password=hashed_password)
            db.add(new_user)
            db.flush()  # Flush to get new_user.id before commit

            # Create UserProfile record (One-to-One relation)
            new_profile = UserProfile(user_id=new_user.id, bio="")  
            db.add(new_profile)

            db.commit()  # Commit both User and UserProfile

        db.refresh(new_user)
        return new_user  # Return user details without password

    except SQLAlchemyError as e:
        db.rollback()  # Rollback if any error occurs
        raise HTTPException(status_code=500, detail="Database transaction failed")
    
def auth_user(email: str, password: str, db):
    user = db.query(User).filter(User.email == email).first()
    if not user:
        return False
    if not verify_password(password, user.password):
        return False
    return user

def create_access_token(data: dict, expires_delta: timedelta | None = None) -> str:
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        # Default expiration time: 15 minutes
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, ACCESS_SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def create_refresh_token(data: dict, expires_delta: timedelta | None = None) -> str:
    """
    Create a refresh token using the REFRESH_SECRET_KEY.
    """
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(days=7))
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, REFRESH_SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# Dependency to get current user from token
def get_current_user(token: str = Depends(oauth2_bearer)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials.",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        # Decode the JWT token
        payload = jwt.decode(token, os.environ.get("ACCESS_SECRET_KEY"), algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    return email

# ------------------------------------------------------------------------------
# Login Endpoint (Token Issuance with Refresh Token)
# ------------------------------------------------------------------------------
@router.post("/token")
async def login(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    db: Session = Depends(get_db)
) -> Token:
    """
    Validate user credentials, then issue an access token and a refresh token.
    The refresh token is stored in the active_refresh_tokens dict for rotation.
    """
    user = auth_user(form_data.username, form_data.password, db)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Create access token
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    
    # Create refresh token
    refresh_token = create_refresh_token(
        data={"sub": user.email}, expires_delta=timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS)
    )
    
    return Token(
        access_token=access_token,
        refresh_token=refresh_token,
        token_type="bearer"
    )


@router.get("/user")
def user(current_user: str = Depends(get_current_user)):
    return {"message": "Work"}

    