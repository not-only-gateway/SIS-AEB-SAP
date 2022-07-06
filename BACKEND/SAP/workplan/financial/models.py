from sqlalchemy.exc import SQLAlchemyError
from app import db


class FinancialDisbursement(db.Model):
    __tablename__ = 'desembolso_financeiro'

    id = db.Column('codigo_id', db.BigInteger, primary_key=True)
    year = db.Column('ano', db.String, nullable=False)  # current year
    month = db.Column('mes', db.String, nullable=False)
    value = db.Column('valor_a_ser_desembolsado', db.Float, nullable=False)
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
