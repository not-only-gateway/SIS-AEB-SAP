from sqlalchemy.exc import SQLAlchemyError
from app import db


class Goal(db.Model):
    __tablename__ = 'pt_meta'

    id = db.Column('codigo_id', db.BigInteger, primary_key=True)
    goal_number = db.Column('numero_da_meta', db.String(), nullable=False)
    detailing = db.Column('detalhamento', db.String(), nullable=False)
    unit_of_measurement = db.Column('unidade_de_medida', db.String(), nullable=False)
    value = db.Column('valor', db.Float(), nullable=False)
    initial_situation = db.Column('situacao_inicial', db.Float(), nullable=False)
    final_situation = db.Column('situacao_final', db.Float(), nullable=False)
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
