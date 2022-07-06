from app import db
from sqlalchemy.exc import SQLAlchemyError


class Publish(db.Model):
    __tablename__ = 'publicar'

    id = db.Column('codigo_id', db.BigInteger, primary_key=True)
    method = db.Column('metodo', db.String, nullable=False)
    routing = db.Column('roteamento', db.String, nullable=False, unique=True)

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
