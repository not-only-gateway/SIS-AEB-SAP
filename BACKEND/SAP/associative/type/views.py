from flask import jsonify
from flask import request
from sqlalchemy.exc import SQLAlchemyError
from app import app
import relations
from app import db
from sqlalchemy import and_
from associative.type.models import ClassificationType



from backend_utils.templates.api import ApiView

api = ApiView(class_instance=ClassificationType, identifier_attr='id',
              relationships=relations.relations)


@app.route('/api/type', methods=['POST', 'GET', 'PUT', 'DELETE'])
def type():
    if request.method == 'GET':
        return api.get(identifier_value=request.args.get('identifier', None))
    elif request.method == 'POST':
        return api.post(request)
    elif request.method == 'PUT':
        return api.put(request, identifier_value=request.json.get('identifier', None))
    elif request.method == 'DELETE':
        return api.delete(db=db, identifier_value=request.json.get('identifier', None))


@app.route('/api/list/type', methods=['GET'])
def list_type():
    return api.list(request, db)
