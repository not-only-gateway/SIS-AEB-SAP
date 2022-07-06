from sqlalchemy.exc import SQLAlchemyError
from app import db


class NatureOfExpense(db.Model):
    __tablename__ = 'natureza_de_despesa'

    id = db.Column('codigo_id', db.BigInteger, primary_key=True)
    gnd = db.Column(db.Integer(), nullable=False)
    nature_of_expense = db.Column('natureza_de_despesa', db.String(), nullable=False)
    description = db.Column('descricao', db.String(), nullable=False)

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

