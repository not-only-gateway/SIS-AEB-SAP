from sqlalchemy.exc import SQLAlchemyError
from app import db


class ResourceApplication(db.Model):
    __tablename__ = 'aplicacao_dos_recursos'

    id = db.Column('codigo_id', db.BigInteger, primary_key=True)

    indirect_cost = db.Column('custo_indireto', db.Boolean, nullable=False)
    value = db.Column('valor', db.Float, nullable=False)
    nature_of_expense_field = db.Column(
        'natureza_de_despesa', db.BigInteger,
        db.ForeignKey('natureza_de_despesa.codigo_id', ondelete='CASCADE'),
        nullable=False
    )
    operation_phase = db.Column('fase_operacao', db.BigInteger,
                                db.ForeignKey('fase_operacao.codigo_id', ondelete='CASCADE'),
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