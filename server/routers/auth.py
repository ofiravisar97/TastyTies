from fastapi import APIRouter,Depends,HTTPException
from schemas.auth import UserCreate
from utils import hash_password
from sqlalchemy.orm import Session
from db.connection import get_db
from db.models.user import User,UserProfile
from sqlalchemy.exc import SQLAlchemyError

router = APIRouter(tags=["auth"],prefix="/auth")

@router.post("/register")
async def register(user: UserCreate, db: Session = Depends(get_db)):
    try:
        # Start transaction
        with db.begin():  
            # Check if email already exists
            existing_user = db.query(User).filter(User.email == user.email).first()
            if existing_user:
                raise HTTPException(status_code=400, detail="Email already registered")

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