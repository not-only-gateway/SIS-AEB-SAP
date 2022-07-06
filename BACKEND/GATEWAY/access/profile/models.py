from app import db
from sqlalchemy.exc import SQLAlchemyError


class AccessProfile(db.Model):
    __tablename__ = 'perfil_acesso'

    id = db.Column('codigo_id', db.BigInteger, primary_key=True)
    denomination = db.Column('denominacao', db.String, nullable=False)

    def as_dict(self):
        fields = [
            'denomination', 'id'
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

class AccessPrivilege(db.Model):
    __tablename__ = 'privilegio_acesso'

    access = db.Column('perfil_acesso', db.BigInteger,
                                 db.ForeignKey('perfil_acesso.codigo_id', ondelete='CASCADE'),
                                 primary_key=True)
    privilege = db.Column('privilegio', db.BigInteger,
                                 db.ForeignKey('privilegio.codigo_id', ondelete='CASCADE'),
                                 primary_key=True)

    def as_dict(self):
        fields = [
            'privilege', 'access'
        ]
        return {c: getattr(self, c) for c in fields}


    def __init__(self, data):
        for key in data.keys():
            if hasattr(self, key):
                setattr(self, key, data.get(key, None))
        db.session.add(self)
        db.session.commit()