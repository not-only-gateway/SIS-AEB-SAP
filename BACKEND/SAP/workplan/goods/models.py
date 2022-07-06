from sqlalchemy.exc import SQLAlchemyError
from app import db


class PermanentGoods(db.Model):
    __tablename__ = 'bens_permanentes'

    id = db.Column('codigo_id', db.BigInteger, primary_key=True)
    description = db.Column('descricao', db.String, nullable=False)
    quantity = db.Column('quantidade', db.Float, nullable=False)
    unit_of_measurement = db.Column('unidade_de_medida', db.String, nullable=False)
    unit_price = db.Column('preco_unitario', db.Float, nullable=False)
    total_value = db.Column('valor_total', db.Float, nullable=False)
    acquisition_date = db.Column('data_aquisicao', db.Date, nullable=False)
    invoice = db.Column('nota_fiscal', db.String, nullable=False)
    work_plan = db.Column('plano_de_trabalho', db.BigInteger,
                                db.ForeignKey('plano_de_trabalho.codigo_id', ondelete='CASCADE'), nullable=False)


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