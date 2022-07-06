import pika, json
from pika import exceptions
from sqlalchemy.exc import SQLAlchemyError
from app import db


def consumer(callback, queue, user, password, server):
    try:
        credentials = pika.PlainCredentials(user,  password)
        params = pika.ConnectionParameters(server, 5672, '/', credentials)
        connection = pika.BlockingConnection(params)
        channel = connection.channel()
        channel.queue_declare(queue=queue)

        channel.basic_consume(queue=queue, on_message_callback=callback, auto_ack=True)
        channel.start_consuming()
        channel.close()
    except (exceptions.ProbableAccessDeniedError, exceptions.ChannelClosedByBroker):
        pass
