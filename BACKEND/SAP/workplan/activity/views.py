
from flask import jsonify
from flask import request
from sqlalchemy.exc import SQLAlchemyError
from workplan.activity.models import ActivityStage
from app import app
import relations
from app import db
from sqlalchemy import and_


from workplan.goal.models import Goal

from workplan.operation.models import OperationPhase
from backend_utils.templates.api import ApiView

api = ApiView(class_instance=ActivityStage, identifier_attr='id',
              relationships=relations.relations)


@app.route('/api/activity_stage', methods=['POST', 'GET', 'PUT', 'DELETE'])
def activity_stage():
    if request.method == 'GET':
        return api.get(identifier_value=request.args.get('identifier', None))
    elif request.method == 'POST':
        return api.post(request)
    elif request.method == 'PUT':
        return api.put(request, identifier_value=request.json.get('identifier', None))
    elif request.method == 'DELETE':
        return api.delete(db=db, identifier_value=request.json.get('identifier', None))


@app.route('/api/list/activity_stage', methods=['GET'])
def list_activity_stage():
    return api.list(request, db)
