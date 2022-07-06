from flask import jsonify
from flask import request
from sqlalchemy.exc import SQLAlchemyError
from project.project.models import ActivityProject

from ted.models import Ted
from app import app
import relations
from app import db
from sqlalchemy import and_

from structural.models import Unit

from backend_utils.templates.api import ApiView
api = ApiView(class_instance=ActivityProject, identifier_attr='id',
              relationships=relations.relations)


@app.route('/api/project', methods=['POST', 'GET', 'PUT', 'DELETE'])
def project():
    if request.method == 'GET':
        return api.get(identifier_value=request.args.get('identifier', None))
    elif request.method == 'POST':
        return api.post(request)
    elif request.method == 'PUT':
        return api.put(request, identifier_value=request.json.get('identifier', None))
    elif request.method == 'DELETE':
        return api.delete(db=db, identifier_value=request.json.get('identifier', None))


@app.route('/api/list/project', methods=['GET'])
def list_project():
    return api.list(request, db)
