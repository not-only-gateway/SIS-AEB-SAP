from app import app
from app import db
from service.endpoint.models import Endpoint, Access
from flask import jsonify
from flask import request
from access.manager.models import Manager
from utils import Utils
import json
from access.privilege.models import Privilege
from service.entity.models import Entity
from service.service.models import Service

from backend_utils.templates.api import ApiView
api = ApiView(class_instance=Endpoint, identifier_attr='url',
              relationships=[{'key': 'entity', 'instance': Entity}, {'key': 'service', 'instance': Service}])


@app.route('/gateway/endpoint', methods=['POST', 'GET', 'PUT', 'DELETE'])
def endpoint():
    allowed = Utils.authenticate(request.headers.get('authorization', None), method=request.method, path=request.path)
    if allowed:
        if request.method == 'GET':
            return api.get(identifier_value=request.args.get('identifier', None))
        elif request.method == 'POST':
            return api.post(request)
        elif request.method == 'PUT':
            return api.put(request, identifier_value=request.json.get('identifier', None))
        elif request.method == 'DELETE':
            return api.delete(db=db, identifier_value=request.json.get('identifier', None))
        else:
            return jsonify({'status': 'error', 'description': 'method_not_allowed', 'code': 405}), 405
    else:
        return jsonify({'status': 'error', 'description': 'unauthorized', 'code': 401}), 401


@app.route('/gateway/list/endpoint', methods=['GET'])
def list_endpoint():
    allowed = Utils.authenticate(request.headers.get('authorization', None), method=request.method, path=request.path)
    if allowed:
        return api.list(request, db)
    else:
        return jsonify({'status': 'error', 'description': 'unauthorized', 'code': 401}), 401