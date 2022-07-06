import pika, json
from pika import exceptions


def publish(method, body, routing, user, password, server):
    try:
        credentials = pika.PlainCredentials(user, password)
        params = pika.ConnectionParameters(server, 5672, '/', credentials)
        connection = pika.BlockingConnection(params)
        channel = connection.channel()
        properties = pika.BasicProperties(method)
        channel.basic_publish(exchange='', routing_key=routing, body=json.dumps(body), properties=properties)
    except (
            exceptions.ProbableAccessDeniedError,
            exceptions.ChannelClosedByBroker,
            exceptions.StreamLostError,
            exceptions.AMQPConnectionError
    ):
        pass
