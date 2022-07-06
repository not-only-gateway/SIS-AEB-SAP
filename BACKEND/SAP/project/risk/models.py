from sqlalchemy.exc import SQLAlchemyError
from app import db


class Risks(db.Model):
    __tablename__ = 'riscos'

    id = db.Column('codigo_id', db.BigInteger, primary_key=True)
    description = db.Column('descricao', db.String, nullable=False)
    analysis = db.Column('analise', db.String, nullable=False)

    project = db.Column('projeto_atividade', db.BigInteger,
                    db.ForeignKey('projeto_atividade.codigo_id', ondelete='CASCADE'),
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
            setattr(self, key, data.get(key, None))
        db.session.add(self)
        db.session.commit()
