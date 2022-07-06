from sqlalchemy.exc import SQLAlchemyError
from app import db
from structural.models import Unit
from project_ted.models import Teds


class WorkPlan(db.Model):
    __tablename__ = 'plano_de_trabalho'

    id = db.Column('codigo_id', db.BigInteger, primary_key=True)
    responsible = db.Column(
        'responsavel', db.BigInteger,
        db.ForeignKey('unidade.codigo_id', ondelete='CASCADE'),
        nullable=False
    )
    apostille_work_plan = db.Column(
        'plano_de_trabalho_apostilamento', db.BigInteger,
        db.ForeignKey('plano_de_trabalho.codigo_id', ondelete='SET NULL')
    )
    object = db.Column('objeto', db.String, nullable=False)
    additive = db.Column('aditivo', db.Integer, nullable=True)

    ted = db.Column('ted_id', db.BigInteger, nullable=False)
    activity_project = db.Column('projeto_id', db.BigInteger, nullable=False)

    sub_decentralization = db.Column('sub_descentralizacao', db.Boolean, nullable=False)
    justification = db.Column('jusitificativa_motivacao', db.String, nullable=False)
    ways_of_execution = db.Column('formas_de_execucao', db.String, nullable=False)
    indirect_costs = db.Column('custos_indiretos', db.Boolean, nullable=False)
    detailing_of_indirect_costs = db.Column('detalhamento_custos_indiretos', db.String, nullable=False)
    budget_plan = db.Column('plano_orcamentario', db.BigInteger,
                            db.ForeignKey('plano_orcamentario.codigo_id', ondelete='CASCADE'),
                            nullable=False)

    responsible_execution = db.Column('responsavel_execucao', db.String, nullable=False)
    func = db.Column('funcao', db.String, nullable=False)
    email = db.Column(db.String, nullable=False)
    phone = db.Column('telefone', db.String, nullable=False)

    infrastructure = db.Column('infraestrutura', db.BigInteger,
                               db.ForeignKey('infraestrutura.codigo_id', ondelete='SET NULL'),
                               )

    __table_args__ = (
        db.ForeignKeyConstraint(['ted_id', 'projeto_id'], ['projeto_ted.ted', 'projeto_ted.projeto'],
                                ondelete='CASCADE'),
        {})

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
            if hasattr(self, key) and key != 'id' and key != '_sa_instance_state':
                setattr(self, key, data.get(key, None))
        db.session.add(self)
        db.session.commit()
