import json

from app import app
from app import db
from service.endpoint.models import Endpoint, Access
from flask import jsonify
from flask import request
from access.manager.models import Manager
from utils import Utils

from service.draft.models import Draft

from service.entity.models import Entity

from backend_utils.templates.api import ApiView
from access.user.models import User

api = ApiView(
    class_instance=Draft,
    identifier_attr='id',
    relationships=[
        {'key': 'user', 'instance': User},
        {'key': 'endpoint', 'instance': Endpoint}
    ]
)


@app.route('/draft/<path:path>', methods=['POST', 'PUT', 'DELETE'])
def draft(path=None):
    token = Utils.decrypt_jwt(request.headers.get('authorization', None))
    allowed = Utils.authenticate(request.headers.get('authorization', None), method=request.method, path=path)
    registered_endpoint = Endpoint.query.get(path)
    if allowed:
        if request.method == 'POST':
            if registered_endpoint is not None:
                return api.post(package={
                    'endpoint': path,
                    'data': request.json,
                    'user': token.get('user_email', None) if type(token) is dict else None
                })
            else:
                return jsonify({'status': 'error', 'description': 'not_found', 'code': 404}), 404
        elif request.method == 'PUT':
            return api.put(request, identifier_value=request.json.get('identifier', None))
        elif request.method == 'DELETE':
            return api.delete(db=db, identifier_value=request.json.get('identifier', None))
        else:
            return jsonify({'status': 'error', 'description': 'method_not_allowed', 'code': 405}), 405
    else:
        return jsonify({'status': 'error', 'description': 'unauthorized', 'code': 401}), 401


@app.route('/list_draft/<path:path>', methods=['GET'])
@app.route('/list_draft', methods=['GET'])
def list_draft(path=None):
    token = Utils.decrypt_jwt(request.headers.get('authorization', None))
    if token is not None:
        base_query = [{'key': 'user', 'value': token.get('user_email', None), "type": "object"}]
        if path is not None:
            base_query.append({'key': 'endpoint', 'value': path.replace('sap/', ''), "type": "object"})
        return api.list(request, db,
                        base_query=base_query)
    else:
        return jsonify({'status': 'error', 'description': 'unauthorized', 'code': 401}), 401
