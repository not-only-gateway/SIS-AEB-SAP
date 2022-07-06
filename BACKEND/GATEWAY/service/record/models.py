from app import db
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.types import ARRAY
from uuid import uuid4
from sqlalchemy.dialects.postgresql import UUID, JSONB


class Record(db.Model):
    __tablename__ = 'registro'

    id = db.Column('codigo_id', db.BigInteger, primary_key=True)
    data_id = db.Column('id_dado', db.BigInteger, primary_key=True)
    endpoint = db.Column('endpoint', db.String, db.ForeignKey('endpoint.url', ondelete='CASCADE'), nullable=False)
    entity = db.Column('entity', db.BigInteger, db. ForeignKey('entidade.codigo_id', ondelete='CASCADE'), primary_key=True)

    data = db.Column('dado', JSONB, nullable=False)

    def as_dict(self):
        fields = [
            'data_id', 'entity', 'id', 'data'
        ]
        return {c: getattr(self, c) for c in fields}

    def __init__(self, data):
        for key in data.keys():
            if hasattr(self, key):
                setattr(self, key, data.get(key, None))
        db.session.add(self)
        db.session.commit()
