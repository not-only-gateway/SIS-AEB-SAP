from app import db
import requests
from simplejson.errors import JSONDecodeError
import env
from backend_utils.env import get_values

shared_env = get_values()


class Unit(db.Model):
    __tablename__ = 'unidade'
    id = db.Column('codigo_id', db.BigInteger, primary_key=True)
    name = db.Column('nome', db.String)
    acronym = db.Column('acronomo', db.String)

    @staticmethod
    def retrieve(key):

        exists = Unit.query.get(key)
        try:
            res = requests.get(env.STRUCTURAL_URL, params={'id': str(key)},
                               headers={'authorization': shared_env.get('INTERNAL_COMMUNICATION_TOKEN', None)})
            if res.status_code < 300:
                data = res.json()
                obj = data
            else:
                obj = None
        except (requests.exceptions.Timeout, requests.exceptions.ConnectionError, JSONDecodeError):
            obj = None

        if exists is None and obj is not None:
            Unit(obj)
        elif exists is not None and obj is not None:
            exists.update(obj)
        return obj

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
