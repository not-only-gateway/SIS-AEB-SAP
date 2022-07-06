from backend_utils.utils.publisher import publish
import env

class Publisher:
    @staticmethod
    def publish_unit(entry, method):
        m = 'unit'
        if method == 'put':
            m = 'unit_updated'
        elif method == 'delete':
            m = 'unit_deleted'

        publish(method=m, body=entry, routing='corporate', user=env.RABBITMQ_USER, password=env.RABBITMQ_PASSWORD, server=env.RABBITMQ_SERVER)
        publish(method=m, body=entry, routing='organizational', user=env.RABBITMQ_USER, password=env.RABBITMQ_PASSWORD, server=env.RABBITMQ_SERVER)
        publish(method=m, body=entry, routing='sap', user=env.RABBITMQ_USER, password=env.RABBITMQ_PASSWORD, server=env.RABBITMQ_SERVER)
        publish(method=m, body=entry, routing='pat', user=env.RABBITMQ_USER, password=env.RABBITMQ_PASSWORD, server=env.RABBITMQ_SERVER)

    @staticmethod
    def publish_entity(entry):
        pass