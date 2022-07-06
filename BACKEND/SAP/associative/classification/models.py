from sqlalchemy.exc import SQLAlchemyError
from app import db


class Classification(db.Model):
    __tablename__ = 'classificacao'

    id = db.Column('codigo_id', db.BigInteger, primary_key=True)
    description = db.Column('classificacao', db.String, nullable=False)
    classification_type = db.Column(
        'tipo',
        db.BigInteger,
        db.ForeignKey('tipo.codigo_id', ondelete='CASCADE'),
        nullable=False
    )

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


class ClassificationInfrastructure(db.Model):
    __tablename__ = 'classificacao_infraestrutura'

    component_classification = db.Column('classificacao', db.BigInteger,
                               db.ForeignKey('classificacao.codigo_id', ondelete='CASCADE'), primary_key=True)
    infrastructure = db.Column('infraestrutura', db.BigInteger,
                               db.ForeignKey('infraestrutura.codigo_id', ondelete='CASCADE'), primary_key=True)

    def __init__(self, data):
        for key in data.keys():
            setattr(self, key, data.get(key, None))
        db.session.add(self)
        db.session.commit()
