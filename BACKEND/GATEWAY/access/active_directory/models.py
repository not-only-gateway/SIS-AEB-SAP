from app import db
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.dialects import postgresql as pg


class ActiveDirectory(db.Model):
    __tablename__ = 'ad'

    id = db.Column('codigo_id', db.BigInteger, primary_key=True)
    denomination = db.Column('denominacao', db.String, nullable=False)
    description = db.Column('descricao', db.String)

    server = db.Column('servidor', db.String, nullable=False)
    filter = db.Column('filtros', db.String, nullable=False)
    base = db.Column('base', db.String, nullable=False)
    attr = db.Column('atributos', pg.ARRAY(db.String, dimensions=1), nullable=False)

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
