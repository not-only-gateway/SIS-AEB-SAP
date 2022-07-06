import pika, json
from pika import exceptions
from sqlalchemy.exc import SQLAlchemyError,PendingRollbackError
from app import db
from structural.models import Unit
from backend_utils.utils.consumer import consumer
from user.models import User
import env

def callback(ch, method, properties, body):
    parsed = json.loads(body)
    if properties.content_type == 'unit':
        unit = Unit.query.get(parsed.get('id'))
        if unit is None:
            Unit(parsed)
    elif properties.content_type == 'unit_updated':
        unit = Unit.query.get(parsed.get('id', None))


        if unit is not None:
            unit.update(data=parsed)
    elif properties.content_type == 'unit_deleted':
        obj = Unit.query.get(parsed.get('id'))
        if obj is not None:
            db.session.delete(obj)
            db.session.commit()
    elif properties.content_type == 'user':
        try:
            User(parsed)
        except (SQLAlchemyError, PendingRollbackError):
            pass


consumer(callback, 'sap', user=env.RABBITMQ_USER, password=env.RABBITMQ_PASSWORD, server=env.RABBITMQ_SERVER)
