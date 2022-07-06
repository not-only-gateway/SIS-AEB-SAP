from sqlalchemy.exc import SQLAlchemyError
from app import db

class Entity(db.Model):
    __tablename__ = 'entidade'

    id = db.Column(db.BigInteger, primary_key=True)
    acronym = db.Column('acronomo', db.String, nullable=False)
    denomination = db.Column('denominacao', db.String, nullable=False, unique=True)
    corporate_name = db.Column('nome_corporativo', db.String, nullable=False, unique=True)
    cnpj = db.Column(db.String, nullable=False, unique=True)
    address = db.Column('endereco', db.BigInteger,
                        db.ForeignKey('endereco.id', ondelete='CASCADE'), nullable=False)

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
