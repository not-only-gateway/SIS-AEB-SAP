from sqlalchemy.exc import SQLAlchemyError
from app import db


class Unit(db.Model):
    __tablename__ = 'unidade'

    id = db.Column(db.BigInteger, primary_key=True)
    name = db.Column('nome', db.String, nullable=False)
    acronym = db.Column('acronomo', db.String, nullable=False)
    is_decentralized = db.Column('descentraizada', db.Boolean, nullable=False, default=False)

    sphere = db.Column('esfera', db.String)
    power = db.Column('poder', db.String)
    legal_nature = db.Column('natureza_juridica', db.String)
    change_type = db.Column('tipo_mudanca', db.String)
    category = db.Column('categoria', db.String)

    competence = db.Column('competencia', db.String)
    finality = db.Column('finalidade', db.String)
    mission = db.Column('missao', db.String)
    strategic_objective = db.Column('objetivo_estrategico', db.String)
    standardization = db.Column('uniformizacao', db.String)

    parent_entity = db.Column('entidade_pai', db.BigInteger,
                              db.ForeignKey('entidade.id', ondelete='SET NULL'))
    parent_unit = db.Column('unidade_superior', db.BigInteger,
                            db.ForeignKey('unidade.id', ondelete='SET NULL'))
    address = db.Column('endereço', db.BigInteger,
                        db.ForeignKey('endereco.id', ondelete='SET NULL'))

    def update(self, data):
        try:
            for key in data.keys():
                setattr(self, key, data.get(key, None))

            db.session.commit()
        except SQLAlchemyError:
            pass

    def __init__(self, data):
        for key in data.keys():
            if hasattr(self, key):
                setattr(self, key, data.get(key, None))
        db.session.add(self)
        db.session.commit()
