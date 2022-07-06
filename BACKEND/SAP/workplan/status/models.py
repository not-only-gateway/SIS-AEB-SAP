from sqlalchemy.exc import SQLAlchemyError
from app import db


class WorkPlanStatus(db.Model):
    __tablename__ = 'pt_status'

    id = db.Column('codigo_id', db.BigInteger, primary_key=True)
    status = db.Column('plano_status', db.String, nullable=False)

    update_date = db.Column('data_atualizacao', db.Date, nullable=False)
    difficulties = db.Column('dificuldades', db.String, nullable=False)

    work_plan = db.Column('plano_de_trabalho', db.BigInteger,
                          db.ForeignKey('plano_de_trabalho.codigo_id', ondelete='CASCADE'),
                          nullable=False)

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
