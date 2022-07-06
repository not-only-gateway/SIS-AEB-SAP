from app import db
from sqlalchemy.exc import SQLAlchemyError


class Manager(db.Model):
    __tablename__ = 'gerente'

    id = db.Column('codigo_id', db.BigInteger, primary_key=True)
    hash = db.Column('hash', db.String, nullable=False)

    def as_dict(self):
        fields = [
            'id', 'hash'
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

