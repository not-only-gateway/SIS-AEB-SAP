from sqlalchemy.exc import SQLAlchemyError
from app import db


class ActionItem(db.Model):
    __tablename__ = 'item_acao'

    id = db.Column('codigo_id', db.BigInteger, primary_key=True)
    detailing = db.Column('detalhamento', db.String, nullable=False)
    accomplished = db.Column('realizado', db.Boolean(), nullable=False)
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
