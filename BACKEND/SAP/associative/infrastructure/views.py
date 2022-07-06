from flask import jsonify
from flask import request
from associative.infrastructure.models import Infrastructure
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy import and_
from app import app
import relations
from app import db

from backend_utils.templates.api import ApiView

api = ApiView(class_instance=Infrastructure, identifier_attr='id',
              relationships=relations.relations)


@app.route('/api/infrastructure', methods=['POST', 'GET', 'PUT', 'DELETE'])
def infrastructure():
    if request.method == 'GET':
        return api.get(identifier_value=request.args.get('identifier', None))
    elif request.method == 'POST':
        return api.post(request)
    elif request.method == 'PUT':
        return api.put(request, identifier_value=request.json.get('identifier', None))
    elif request.method == 'DELETE':
        return api.delete(db=db, identifier_value=request.json.get('identifier', None))


@app.route('/api/list/infrastructure', methods=['GET'])
def list_infrastructure():
    return api.list(request, db)
