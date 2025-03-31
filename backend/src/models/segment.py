from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from .user import Base

class Segment(Base):
    __tablename__ = "segments"

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    description = Column(String)
    user_id = Column(Integer, ForeignKey("users.id"))

    user = relationship("User", backref="segments")
