
from flask import jsonify
from flask import request
from associative.components.models import Component
from sqlalchemy.exc import SQLAlchemyError
from app import app
import relations
from app import db
from sqlalchemy import and_
from associative.classification.models import Classification
from associative.infrastructure.models import Infrastructure

from backend_utils.templates.api import ApiView

api = ApiView(class_instance=Component, identifier_attr='id',
              relationships=relations.relations)


@app.route('/api/component', methods=['POST', 'GET', 'PUT', 'DELETE'])
def components():
    if request.method == 'GET':
        return api.get(identifier_value=request.args.get('identifier', None))
    elif request.method == 'POST':
        return api.post(request)
    elif request.method == 'PUT':
        return api.put(request, identifier_value=request.json.get('identifier', None))
    elif request.method == 'DELETE':
        return api.delete(db=db, identifier_value=request.json.get('identifier', None))


@app.route('/api/list/component', methods=['GET'])
def list_components():
    return api.list(request, db)
