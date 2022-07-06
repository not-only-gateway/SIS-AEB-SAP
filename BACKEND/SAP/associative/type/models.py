from sqlalchemy.exc import SQLAlchemyError
from app import db



class ClassificationType(db.Model):
    __tablename__ = 'tipo'

    id = db.Column('codigo_id', db.BigInteger, primary_key=True)
    type = db.Column('tipo', db.String, nullable=False)

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
