from sqlalchemy.exc import SQLAlchemyError
from app import db
from structural.models import Unit

class Ted(db.Model):
    __tablename__ = 'ted'

    id = db.Column('codigo_id', db.BigInteger, primary_key=True)

    number = db.Column('numero', db.String, nullable=False)
    process = db.Column('processo', db.String, nullable=False)
    year = db.Column('ano', db.String, nullable=False)
    start_date = db.Column('data_inicio', db.Date, nullable=False)
    end_date = db.Column('data_fim', db.Date, nullable=False)
    responsible = db.Column(
        'responsavel', db.BigInteger,
        db.ForeignKey('unidade.codigo_id', ondelete='CASCADE'),
        nullable=False
    )
    global_value = db.Column('valor_global', db.Float, nullable=False)
    addendum_ted = db.Column(
        'ted_termo_aditivo', db.BigInteger,
        db.ForeignKey('ted.codigo_id', ondelete='SET NULL')
    )
    action = db.Column(
        'acao', db.BigInteger,
        db.ForeignKey('acao.codigo_id', ondelete='SET NULL')
    )
    decentralized_unit = db.Column('unidade_descentralizada', db.BigInteger,
                                   db.ForeignKey('unidade_descentralizada.codigo_id', ondelete='SET NULL'))

    object = db.Column('objeto', db.String, nullable=False)
    object_summary = db.Column('objeto_resumido', db.String, nullable=False)
    justification = db.Column('justificativa', db.String, nullable=False)

    summary_justification = db.Column('justificativa_resumida', db.String, nullable=False)

    programmatic_functional_classification = db.Column('classificação_funcional_programatica', db.String,
                                                       nullable=False)
    ownership_destination_assets = db.Column('titularidade_destinacao_bens', db.String)

    remaining_assets = db.Column('bens_remanescentes', db.Boolean, nullable=False)



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
            if key != 'id' and key != '_sa_instance_state':
                setattr(self, key, data.get(key, None))
        db.session.add(self)
        db.session.commit()
