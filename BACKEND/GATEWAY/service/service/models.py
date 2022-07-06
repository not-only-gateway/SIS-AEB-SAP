from app import db
from sqlalchemy.exc import SQLAlchemyError


class Service(db.Model):
    __tablename__ = 'servico'

    id = db.Column('codigo_id', db.BigInteger, primary_key=True)
    host = db.Column('host', db.String, nullable=False, unique=True)
    denomination = db.Column('denominacao', db.String, nullable=False, unique=True)
    description = db.Column('descricao', db.String)
    mask = db.Column('mascara', db.String, nullable=False, unique=True)

    def update(self, data):
        try:
            for key in data.keys():
                setattr(self, key, data.get(key, None))

            db.session.commit()
        except SQLAlchemyError:
            pass

    def __init__(self, data):
        for key in data.keys():
            if hasattr(self, key):
                setattr(self, key, data.get(key, None))
        db.session.add(self)
        db.session.commit()

