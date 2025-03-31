from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from .user import Base

class Campaign(Base):
    __tablename__ = "campaigns"

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    description = Column(String)
    budget = Column(String)
    startDate = Column(String)
    endDate = Column(String)
    createdBy = Column(String)
    user_id = Column(Integer, ForeignKey("users.id"))

    user = relationship("User", backref="campaigns")
