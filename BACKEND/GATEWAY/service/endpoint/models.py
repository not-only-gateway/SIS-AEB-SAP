from app import db
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.dialects import postgresql as pg
from service.service.models import Service


class Endpoint(db.Model):
    __tablename__ = 'endpoint'

    url = db.Column('url', db.String, primary_key=True)

    require_auth = db.Column('requer_autenticacao', db.Boolean, nullable=False)
    service = db.Column('servico', db.BigInteger, db.ForeignKey('servico.codigo_id', ondelete='CASCADE'),
                        nullable=False)
    versioning = db.Column('versionamento', db.Boolean, nullable=False)
    entity = db.Column(
        'entidade',
        db.BigInteger,
        db.ForeignKey('entidade.codigo_id', ondelete='SET NULL'),
        nullable=True
    )

    denomination = db.Column('denominacao', db.String, nullable=False, unique=True)
    description = db.Column('descricao', db.String)

    def as_dict(self):
        fields = [
            'url', 'require_auth', 'service', 'denomination', 'description', 'entity', 'versioning'
        ]
        pack = {c: getattr(self, c) for c in fields}

        pack['service'] = Service.query.get(pack.get('service', None)).as_dict()
        pack['entity'] = Service.query.get(pack.get('entity', None)).as_dict() if pack.get('entity', None) is not None else None
        return pack

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


class Access(db.Model):
    __tablename__ = 'endpoint_privilegio'

    method = db.Column('metodo_http',db.String, nullable=False)
    endpoint = db.Column('endpoint', db.String,
                         db.ForeignKey('endpoint.url', ondelete='CASCADE'), primary_key=True)
    privilege = db.Column('privilegio', db.BigInteger,
                          db.ForeignKey('privilegio.codigo_id', ondelete='CASCADE'), primary_key=True)

    def as_dict(self):
        fields = [
            'endpoint', 'privilege', 'method'
        ]
        return {c: getattr(self, c) for c in fields}

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
