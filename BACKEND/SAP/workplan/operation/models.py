from sqlalchemy.exc import SQLAlchemyError
from app import db


class OperationPhase(db.Model):
    __tablename__ = 'fase_operacao'

    id = db.Column('codigo_id', db.BigInteger, primary_key=True)
    phase = db.Column('fase', db.String, nullable=False)
    detailing = db.Column('detalhamento', db.String, nullable=False)
    stage_representation = db.Column('representacao_etapa', db.Integer, nullable=False)
    indicator_planned = db.Column('indicador_planejado', db.Integer, nullable=False)
    initial_situation = db.Column('situacao_inicial', db.Float, nullable=False)
    start_date = db.Column('data_inicio', db.Date, nullable=False)
    end_date = db.Column('data_fim', db.Date, nullable=False)
    estimated_cost = db.Column('custo_previsto', db.Float, nullable=False)
    activity_stage = db.Column('etapa_atividade', db.BigInteger,
                               db.ForeignKey('etapa_atividade.codigo_id', ondelete='CASCADE'),
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