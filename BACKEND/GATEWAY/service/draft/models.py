from app import db
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.types import ARRAY
from uuid import uuid4
from sqlalchemy.dialects.postgresql import UUID, JSONB


class Draft(db.Model):
    __tablename__ = 'rascunho'

    id = db.Column('codigo_id', db.BigInteger, primary_key=True)
    endpoint  =db.Column('endpoint', db.String, db.ForeignKey('endpoint.url', ondelete='CASCADE'), nullable=False)

    data = db.Column('dado', JSONB, nullable=False)
    user = db.Column('usuario', db.String, db.ForeignKey('usuario.email_usuario', ondelete='CASCADE'), nullable=False)
    def update(self, data):
        try:
            self.data = data
            db.session.commit()
        except SQLAlchemyError:
            pass

    def __init__(self, data):
        for key in data.keys():
            if hasattr(self, key):
                setattr(self, key, data.get(key, None))
        db.session.add(self)
        db.session.commit()
