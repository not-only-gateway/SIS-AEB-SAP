from sqlalchemy.exc import SQLAlchemyError
from app import db


class Execution(db.Model):
    __tablename__ = 'pt_execucao'

    id = db.Column('codigo_id', db.BigInteger, primary_key=True)
    current_execution = db.Column('execucao_atual', db.Integer(), nullable=False)
    committed = db.Column('empenhado', db.Float(), nullable=False)
    liquidated = db.Column('liquidado', db.Float(), nullable=False)
    paid = db.Column('pago', db.Float(), nullable=False)

    description = db.Column('descricao', db.String(), nullable=False)
    difficulties = db.Column('deficuldades', db.String(), nullable=False)
    measures_taken = db.Column('medidas_adotadas', db.String(), nullable=False)

    execution_date = db.Column('data_execucao', db.Date(), nullable=False)
    operation_phase = db.Column('fase_operacao', db.BigInteger,
                                db.ForeignKey('fase_operacao.codigo_id', ondelete='CASCADE'), nullable=False)

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