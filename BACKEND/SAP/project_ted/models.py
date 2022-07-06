from sqlalchemy.exc import SQLAlchemyError
from app import db


class Teds(db.Model):
    __tablename__ = 'projeto_ted'

    activity_project = db.Column('projeto', db.BigInteger,
                                 db.ForeignKey('projeto_atividade.codigo_id', ondelete='CASCADE'),
                                 primary_key=True)
    ted = db.Column('ted', db.BigInteger, db.ForeignKey('ted.codigo_id', ondelete='CASCADE'), primary_key=True)


    def __init__(self, data):
        for key in data.keys():
            setattr(self, key, data.get(key, None))
        db.session.add(self)
        db.session.commit()

