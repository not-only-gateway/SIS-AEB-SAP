from flask import jsonify
from flask import request
from service.endpoint.models import Endpoint, Access
from app import app
from utils import Utils
from request import make_request
from service.entity.models import Entity
from service.service.models import Service
from backend_utils.env import get_values
from access.user.models import User
shared_env = get_values()


@app.route('/api/<mask>/<path:url>', methods=['POST', 'GET', 'PUT', 'PATCH', 'DELETE'])
def redirect(mask=None, url=None):
    service = Service.query.filter(Service.mask == mask).first()
    endpoint = Endpoint.query.filter(Endpoint.url == url, Endpoint.service == service.id).first() if service is not None else None

    if endpoint is not None:
        service = Service.query.get(endpoint.service)

        decrypted = Utils.decrypt_jwt(request.headers.get('authorization', None)) if request.headers.get('authorization', None) is not None else None

        if endpoint.require_auth and request.headers.get('authorization', None) != shared_env.get('INTERNAL_COMMUNICATION_TOKEN', None):
            valid = Utils.check_access(token=request.headers.get('authorization', None), endpoint=endpoint.url, method=request.method)
            if valid:

                response = make_request(
                    service_mask=service.mask,
                    service_id=endpoint.service,
                    service_url=service.host,
                    request=request,
                    headers=request.headers,
                    user=decrypted.get('user_email', None) if decrypted is not None else None
                )
            elif endpoint.require_auth or request.headers.get('authorization', None) == shared_env.get('INTERNAL_COMMUNICATION_TOKEN', None):
                response = jsonify({'status': 'error', 'description': 'unauthorized', 'code': 401}), 401
        else:
            if decrypted is not None:
                user = decrypted.get('user_email', None)
            elif request.headers.get('authorization', None) == shared_env.get('INTERNAL_COMMUNICATION_TOKEN', None):
                user = shared_env.get('INTERNAL_COMMUNICATION_TOKEN', None)
            else:
                user = None
            response = make_request(
                service_mask=service.mask,
                service_id=endpoint.service,
                service_url=service.host,
                request=request,
                headers=request.headers,
                user=user
            )

        entity = Entity.query.get(endpoint.entity) if endpoint.entity is not None else None


        if request.method == 'PUT' and entity is not None and endpoint.versioning and response[1] < 300:
            data = request.json if request.json is not None else dict()
        return response[0], response[1]
    else:
        return jsonify({'status': 'error', 'description': 'not_found', 'code': 404}), 404
