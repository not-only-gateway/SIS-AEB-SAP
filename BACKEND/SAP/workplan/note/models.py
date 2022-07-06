from sqlalchemy.exc import SQLAlchemyError
from app import db


class CommitmentNotes(db.Model):
    __tablename__ = 'nota_empenho'

    id = db.Column('codigo_id', db.BigInteger, primary_key=True)
    number = db.Column('numero_nota', db.String, nullable=False, unique=True)
    value = db.Column('valor', db.Float, nullable=False)
    file = db.Column('url_arquivo', db.String)
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