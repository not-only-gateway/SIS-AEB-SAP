from app import db
from sqlalchemy.exc import SQLAlchemyError


class Entity(db.Model):
    __tablename__ = 'entidade'

    id = db.Column('codigo_id', db.BigInteger, primary_key=True)
    identification_key = db.Column('chave_identificacao', db.String, nullable=False)
    denomination = db.Column('denominacao', db.String, nullable=False, unique=True)
    description = db.Column('descricao', db.String)

    def as_dict(self):
        fields = [
            'id', 'denomination', 'description', 'identification_key'
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
