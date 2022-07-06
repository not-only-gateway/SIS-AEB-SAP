from sqlalchemy.exc import SQLAlchemyError
from app import db


class Address(db.Model):
    __tablename__ = 'endereco'

    id = db.Column(db.BigInteger, primary_key=True)
    zip_code = db.Column('cep', db.String, nullable=False)
    address = db.Column('endereco', db.String, nullable=False)
    city = db.Column('cidade', db.String, nullable=False)
    state_initials = db.Column('inicias_estado', db.String, nullable=False)
    state = db.Column('estado', db.String, nullable=False)

    neighborhood = db.Column('vizinhanca', db.String)
    complement = db.Column('complemento', db.String)
    street = db.Column('rua', db.String)

    def as_dict(self):
        fields = [
            'id',
            'zip_code',
            'address',
            'city',
            'state_initials',
            'state',
            'complement',
            'neighborhood',
            'street'
        ]
        return {c: getattr(self, c) for c in fields}

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

