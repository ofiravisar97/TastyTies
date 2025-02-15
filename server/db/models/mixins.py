from datetime import datetime, timezone
from sqlalchemy.orm import declarative_mixin
from sqlalchemy import Column, DateTime

@declarative_mixin
class Timestamp:
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))
