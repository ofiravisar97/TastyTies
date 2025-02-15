from ..connection import Base
from sqlalchemy import Column, String,DateTime,ForeignKey,Text,Integer
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
import uuid
from .mixins import Timestamp

class User(Timestamp,Base):
    __tablename__ = "users"
    
    id = Column(UUID(as_uuid=True), primary_key=True, index=True,default=uuid.uuid4)
    email = Column(String, unique=True, index=True, nullable=False)
    displayName = Column(String,unique=True,nullable=False)
    password = Column(String,nullable=False)
    avatar = Column(String,default=None,nullable=True)
    profile = relationship("UserProfile", uselist=False, back_populates="user")
    
class UserProfile(Timestamp,Base):
    __tablename__ = "user_profiles"
    
    id = Column(UUID(as_uuid=True), primary_key=True, index=True,default=uuid.uuid4)
    bio = Column(Text)
    followers_count = Column(Integer,default=0)
    recipes_count = Column(Integer,default=0)
    bookmarks_count = Column(Integer,default=0)
    
    
    user_id = Column(UUID(as_uuid=True), ForeignKey('users.id', ondelete='CASCADE'),unique=True)  
    # Back-reference to User
    user = relationship("User", back_populates="profile")