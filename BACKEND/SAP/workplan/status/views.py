from flask import jsonify
from flask import request
from sqlalchemy.exc import SQLAlchemyError
from workplan.status.models import WorkPlanStatus
from app import app
import relations
from app import db
from sqlalchemy import and_


from backend_utils.templates.api import ApiView
from workplan.workplan.models import WorkPlan
api = ApiView(class_instance=WorkPlanStatus, identifier_attr='id',
              relationships=relations.relations)


@app.route('/api/status', methods=['POST', 'GET', 'PUT', 'DELETE'])
def status():
    if request.method == 'GET':
        return api.get(identifier_value=request.args.get('identifier', None))
    elif request.method == 'POST':
        return api.post(request)
    elif request.method == 'PUT':
        return api.put(request, identifier_value=request.json.get('identifier', None))
    elif request.method == 'DELETE':
        return api.delete(db=db, identifier_value=request.json.get('identifier', None))


@app.route('/api/list/status', methods=['GET'])
def list_status():
    return api.list(request, db)