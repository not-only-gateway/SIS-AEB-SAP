from app import db
from sqlalchemy.exc import SQLAlchemyError


class User(db.Model):
    __tablename__ = 'usuario'

    pic = db.Column('imagem_url', db.String)
    about = db.Column('sobre', db.String)
    user_email = db.Column('email_usuario', db.String, primary_key=True)
    name = db.Column('nome', db.String, nullable=False)
    access_profile = db.Column('perfil_acesso', db.BigInteger, db.ForeignKey('perfil_acesso.codigo_id', ondelete="SET NULL"),
                               nullable=True)

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
