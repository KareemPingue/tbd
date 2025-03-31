from sqlalchemy import Column, Integer, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from .user import Base

class Traffic(Base):
    __tablename__ = "traffic"

    id = Column(Integer, primary_key=True)
    timestamp = Column(DateTime, nullable=False)
    campaign_id = Column(Integer, ForeignKey("campaigns.id"))
    user_id = Column(Integer, ForeignKey("users.id"))

    campaign = relationship("Campaign", backref="traffic")
    user = relationship("User", backref="traffic")

