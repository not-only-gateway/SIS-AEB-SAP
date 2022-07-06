import json
from app import app
from app import db
from service.publish.models import Publish
from flask import jsonify
from flask import request
from utils import Utils
from backend_utils.templates.api import ApiView

api = ApiView(class_instance=Publish, identifier_attr='id',
              relationships=[])


@app.route('/gateway/publish', methods=['POST', 'DELETE'])
def publish():
    allowed = Utils.authenticate(request.headers.get('authorization', None), method=request.method, path=request.path)
    if allowed:
        if request.method == 'POST':
            return api.post(request)
        elif request.method == 'DELETE':
            return api.delete(db=db, identifier_value=request.json.get('identifier', None))
        else:
            return jsonify({'status': 'error', 'description': 'method_not_allowed', 'code': 405}), 405
    else:
        return jsonify({'status': 'error', 'description': 'unauthorized', 'code': 401}), 401


@app.route('/gateway/list/publish', methods=['GET'])
def list_publish():
    allowed = Utils.authenticate(request.headers.get('authorization', None), method=request.method, path=request.path)
    if allowed:
        return api.list(request, db)
    else:
        return jsonify({'status': 'error', 'description': 'unauthorized', 'code': 401}), 401
