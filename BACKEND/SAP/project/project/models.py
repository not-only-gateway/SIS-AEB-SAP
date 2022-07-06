from sqlalchemy.exc import SQLAlchemyError
from app import db
from structural.models import Unit

class ActivityProject(db.Model):
    __tablename__ = 'projeto_atividade'

    id = db.Column('codigo_id', db.BigInteger, primary_key=True)
    name = db.Column('nome', db.String, nullable=False)
    sponsor = db.Column('patrocinador', db.String, nullable=False)
    estimated_value = db.Column('valor_previsto', db.Float, nullable=False)
    description = db.Column('descricao', db.String, nullable=False)
    manager = db.Column('gerente', db.String, nullable=False)
    public_sector_team = db.Column('equipe_setor_publico', db.String, nullable=False)
    private_sector_team = db.Column('equipe_setor_privado', db.String, nullable=False)
    objectives = db.Column('objetivos', db.String, nullable=False)
    stakeholders = db.Column('stakeholders', db.String, nullable=False)
    scope = db.Column('escopo', db.String, nullable=False)
    critical_factors = db.Column('fatores_criticos', db.String, nullable=False)
    type = db.Column('tipo', db.String, nullable=False)
    responsible = db.Column(
        'responsavel', db.BigInteger,
        db.ForeignKey('unidade.codigo_id', ondelete='CASCADE'),
        nullable=False
    )

    lessons_learned = db.Column('licoes_aprendidas', db.String, nullable=False)


    def update(self, data):
        Unit.retrieve(data.get('responsible', None))
        try:
            for key in data.keys():
                setattr(self, key, data.get(key, None))

            db.session.commit()

        except SQLAlchemyError:
            pass

    def __init__(self, data):
        Unit.retrieve(data.get('responsible', None))
        for key in data.keys():
            setattr(self, key, data.get(key, None))
        db.session.add(self)
        db.session.commit()
