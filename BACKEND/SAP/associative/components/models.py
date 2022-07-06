from sqlalchemy.exc import SQLAlchemyError
from app import db


class Component(db.Model):
    __tablename__ = 'componente'

    id = db.Column('codigo_id', db.BigInteger, primary_key=True)
    situation = db.Column('situacao', db.String, nullable=False)
    component_classification = db.Column('classificacao', db.BigInteger,
                               db.ForeignKey('classificacao.codigo_id', ondelete='CASCADE'),
                               nullable=False)

    infrastructure = db.Column('infraestrutura', db.BigInteger,
                               db.ForeignKey('infraestrutura.codigo_id', ondelete='CASCADE'),
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


