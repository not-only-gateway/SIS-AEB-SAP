from flask import jsonify
from flask import request
from project.risk.models import Risks
from sqlalchemy.exc import SQLAlchemyError
from app import app
import relations
from app import db
from project.project.models import ActivityProject

from backend_utils.templates.api import ApiView
api = ApiView(class_instance=Risks, identifier_attr='id',
              relationships=relations.relations)


@app.route('/api/risk', methods=['POST', 'GET', 'PUT', 'DELETE'])
def risks():
    if request.method == 'GET':
        return api.get(identifier_value=request.args.get('identifier', None))
    elif request.method == 'POST':
        return api.post(request)
    elif request.method == 'PUT':
        return api.put(request, identifier_value=request.json.get('identifier', None))
    elif request.method == 'DELETE':
        return api.delete(db=db, identifier_value=request.json.get('identifier', None))


@app.route('/api/list/risk', methods=['GET'])
def list_risks():
    return api.list(request, db)
