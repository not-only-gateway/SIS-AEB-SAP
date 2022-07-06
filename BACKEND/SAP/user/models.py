from sqlalchemy.exc import SQLAlchemyError
from app import db
from sqlalchemy.types import ARRAY

class User(db.Model):
    __tablename__ = 'usuario'
    user_email = db.Column('email_usuario', db.String, primary_key=True)

    def __init__(self, data):
        for key in data.keys():
            setattr(self, key, data.get(key, None))
        db.session.add(self)
        db.session.commit()
