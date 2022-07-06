from sqlalchemy.exc import SQLAlchemyError
from app import db



class ActivityStage(db.Model):
    __tablename__ = 'etapa_atividade'

    id = db.Column('codigo_id', db.BigInteger, primary_key=True)
    stage = db.Column('etapa', db.String(), nullable=False)
    description = db.Column('descricao', db.String(), nullable=False)
    representation = db.Column('representacao', db.Float(), nullable=False)

    goal = db.Column('pt_meta', db.BigInteger, db.ForeignKey('pt_meta.codigo_id', ondelete='CASCADE'), nullable=False)

    def update(self, data):
        try:
            for key in data.keys():
                setattr(self, key, data.get(key, None))

            db.session.commit()


        except SQLAlchemyError:
            pass
    def __init__(self, data):
        for key in data.keys():
            if key != 'id' and key != '_sa_instance_state':
                setattr(self, key, data.get(key, None))
        db.session.add(self)
        db.session.commit()