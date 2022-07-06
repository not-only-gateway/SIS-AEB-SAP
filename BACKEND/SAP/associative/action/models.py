from sqlalchemy.exc import SQLAlchemyError
from app import db


class Action(db.Model):
    __tablename__ = 'acao'

    id = db.Column('codigo_id', db.BigInteger, primary_key=True)
    number = db.Column('numero', db.String(), nullable=False)
    detailing = db.Column('detalhamento', db.String(), nullable=False)



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

