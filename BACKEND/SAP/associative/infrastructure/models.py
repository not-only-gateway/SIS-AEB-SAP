from sqlalchemy.exc import SQLAlchemyError
from app import db


class Infrastructure(db.Model):
    __tablename__ = 'infraestrutura'

    id = db.Column('codigo_id', db.BigInteger, primary_key=True)
    name = db.Column('nome', db.String, nullable=False)
    type = db.Column('tipo_infraestrutura', db.String, nullable=False)
    address = db.Column('endereco', db.String, nullable=True)

    def update(self, data):
        try:
            for key in data.keys():
                setattr(self, key, data.get(key, None))

            db.session.commit()


        except SQLAlchemyError:
            pass

    def __init__(self, data):
        for key in data.keys():
            setattr(self, key, data.get(key, None))
        db.session.add(self)
        db.session.commit()
