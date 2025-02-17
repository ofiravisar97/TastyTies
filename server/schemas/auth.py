from pydantic import BaseModel, EmailStr,validator

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    confirmPassword: str
    displayName: str
    
    @validator('confirmPassword')
    def passwords_match(cls, v, values):
        if 'password' in values and v != values['password']:
            raise ValueError('passwords do not match')
        return v
    
    @validator('displayName')
    def display_name_length(cls, v):
        if len(v) < 3:
            raise ValueError('display name must be at least 3 characters')
        return v
    
    @validator('password')
    def password_length(cls, v):
        if len(v) < 8:
            raise ValueError('password must be at least 8 characters')
        return v
    
class UserLogin(BaseModel):
    email: str
    password: str
    
class Token(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str
