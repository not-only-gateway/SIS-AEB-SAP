import json

from app import app
from app import db
from service.endpoint.models import Endpoint
from flask import jsonify
from flask import request
from service.service.models import Service
from utils import Utils

from backend_utils.templates.api import ApiView

api = ApiView(class_instance=Service, identifier_attr='id',
              relationships=[])


@app.route('/gateway/service', methods=['POST', 'GET', 'PUT', 'DELETE'])
def service():
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


@app.route('/gateway/list/service', methods=['GET'])
def list_service():
    allowed = Utils.authenticate(request.headers.get('authorization', None), method=request.method, path=request.path)
    if allowed:
        return api.list(request, db)
    else:
        return jsonify({'status': 'error', 'description': 'unauthorized', 'code': 401}), 401