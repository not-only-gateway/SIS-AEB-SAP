from app import db
from sqlalchemy.exc import SQLAlchemyError


class Privilege(db.Model):
    __tablename__ = 'privilegio'

    id = db.Column('codigo_id', db.BigInteger, primary_key=True)
    denomination = db.Column('denominacao', db.String, nullable=False)
    description = db.Column('descricao', db.String)

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
