from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from .user import Base

class EmailTemplate(Base):
    __tablename__ = "email_templates"

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    subject = Column(String, nullable=False)
    body = Column(String, nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"))

    user = relationship("User", backref="email_templates")
