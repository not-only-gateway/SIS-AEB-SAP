import json

from app import app
from app import db
from service.endpoint.models import Endpoint, Access
from flask import jsonify
from flask import request
from access.manager.models import Manager
from utils import Utils

from service.record.models import Record
from service.entity.models import Entity

from backend_utils.templates.api import ApiView

api = ApiView(class_instance=Record, identifier_attr='id',
              relationships=[])


@app.route('/record/<path:path>', methods=['POST', 'GET'])
def record(path=None):
    allowed = Utils.authenticate(request.headers.get('authorization', None), method=request.method, path=request.path)
    if allowed:
        if request.method == 'GET':
            return api.get(identifier_value=request.args.get('identifier', None))
        elif request.method == 'POST':
            return api.post(request)
        else:
            return jsonify({'status': 'error', 'description': 'method_not_allowed', 'code': 405}), 405
    else:
        return jsonify({'status': 'error', 'description': 'unauthorized', 'code': 401}), 401


@app.route('/list_record/<path:path>', methods=['GET'])
def list_record(path=None):
    allowed = Utils.authenticate(request.headers.get('authorization', None), method=request.method, path=request.path)
    if allowed:
        return api.list(request, db)
    else:
        return jsonify({'status': 'error', 'description': 'unauthorized', 'code': 401}), 401
