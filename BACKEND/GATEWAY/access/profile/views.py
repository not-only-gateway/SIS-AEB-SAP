import json

from access.profile.models import AccessProfile
from app import app
from app import db
from service.endpoint.models import Endpoint
from flask import jsonify
from flask import request

from sqlalchemy.exc import SQLAlchemyError
from utils import Utils


from access.profile.models import AccessPrivilege
from access.privilege.models import Privilege

from backend_utils.templates.api import ApiView

api = ApiView(class_instance=AccessProfile, identifier_attr='id', relationships=[])
access_api = ApiView(class_instance=AccessPrivilege, identifier_attr='',
                     relationships=[{'key': 'access', 'instance': AccessProfile},
                                    {'key': 'privilege', 'instance': Privilege}])


@app.route('/auth/access_profile', methods=['POST', 'GET', 'PUT', 'DELETE'])
def access():
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
        return jsonify({'status': 'error', 'description': 'unauthorized', 'code': 401}), 401


@app.route('/auth/list/access_profile', methods=['GET'])
def list_access():
    allowed = Utils.authenticate(request.headers.get('authorization', None), method=request.method, path=request.path)
    if allowed:
        return api.list(request, db)
    else:
        return jsonify({'status': 'error', 'description': 'unauthorized', 'code': 401}), 401



@app.route('/auth/access_profile/privilege', methods=['POST'])
def create_access_privilege():
    data = request.json
    allowed = Utils.authenticate(request.headers.get('authorization', None), method=request.method, path=request.path)
    if allowed:
        AccessPrivilege({
            'access': data.get('identifier', None),
            'privilege': data.get('foreign_identifier', None)
        })
        return jsonify({'status': 'success', 'description': 'created', 'code': 201}), 201
    else:
        return jsonify({'status': 'error', 'description': 'unauthorized', 'code': 401}), 401


@app.route('/auth/access_profile/privilege', methods=['DELETE'])
def delete_access_privilege():
    data = request.json
    allowed = Utils.authenticate(request.headers.get('authorization', None), method=request.method, path=request.path)
    if allowed:
        access = AccessPrivilege.query.filter(AccessPrivilege.access == data.get('identifier', None),
                                              AccessPrivilege.privilege == data.get('foreign_identifier', None)).first()
        if access is not None:
            db.session.delete(access)
            db.session.commit()
        return jsonify({'status': 'success', 'description': 'created', 'code': 201}), 201
    else:
        return jsonify({'status': 'error', 'description': 'unauthorized', 'code': 401}), 401


@app.route('/auth/list/access_profile/privilege', methods=['GET'])
def list_access_privilege():
    allowed = Utils.authenticate(request.headers.get('authorization', None), method=request.method, path=request.path)
    if allowed:
        return api.list(request, db)
    else:
        return jsonify({'status': 'error', 'description': 'unauthorized', 'code': 401}), 401

