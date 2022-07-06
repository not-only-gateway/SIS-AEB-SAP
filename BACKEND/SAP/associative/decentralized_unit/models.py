from sqlalchemy.exc import SQLAlchemyError
from app import db


class DecentralizedUnit(db.Model):
    __tablename__ = 'unidade_descentralizada'

    id = db.Column('codigo_id', db.BigInteger, primary_key=True)
    name = db.Column('nome', db.String, nullable=False)
    competent_authority = db.Column('autoridade_competente', db.String, nullable=False)
    cpf = db.Column(db.String, nullable=False)
    identification = db.Column('identificacao', db.String, nullable=False)
    ugi = db.Column(db.String, nullable=True)
    uge = db.Column(db.String, nullable=False)
    ug = db.Column(db.String, nullable=False, unique=True)
    cnpj = db.Column(db.String, nullable=False)
    unit_responsible = db.Column('responsavel', db.String, nullable=False)


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
