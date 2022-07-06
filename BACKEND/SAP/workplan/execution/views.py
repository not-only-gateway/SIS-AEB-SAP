from flask import jsonify
from flask import request
from sqlalchemy.exc import SQLAlchemyError
from workplan.execution.models import Execution
from app import app
import relations
from app import db
from sqlalchemy import and_
from workplan.activity.models import ActivityStage
from workplan.goal.models import Goal
from workplan.operation.models import OperationPhase
from sqlalchemy import desc
from backend_utils.templates.api import ApiView

api = ApiView(class_instance=Execution, identifier_attr='id',
              relationships=relations.relations)


@app.route('/api/execution', methods=['POST', 'GET', 'PUT', 'DELETE'])
def execution():
    if request.method == 'GET':
        return api.get(identifier_value=request.args.get('identifier', None))
    elif request.method == 'POST':
        return api.post(request)
    elif request.method == 'PUT':
        return api.put(request, identifier_value=request.json.get('identifier', None))
    elif request.method == 'DELETE':
        return api.delete(db=db, identifier_value=request.json.get('identifier', None))


@app.route('/api/list/execution', methods=['GET'])
def list_execution():
    return api.list(request, db)
