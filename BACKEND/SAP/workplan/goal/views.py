
from flask import jsonify
from flask import request
from sqlalchemy.exc import SQLAlchemyError
from workplan.goal.models import Goal
from app import app
import relations
from app import db
from sqlalchemy import and_


from backend_utils.templates.api import ApiView
from workplan.workplan.models import WorkPlan
api = ApiView(class_instance=Goal, identifier_attr='id',
              relationships=relations.relations)


@app.route('/api/work_plan_goal', methods=['POST', 'GET', 'PUT', 'DELETE'])
def work_plan_goal():
    if request.method == 'GET':
        return api.get(identifier_value=request.args.get('identifier', None))
    elif request.method == 'POST':
        return api.post(request)
    elif request.method == 'PUT':
        return api.put(request, identifier_value=request.json.get('identifier', None))
    elif request.method == 'DELETE':
        return api.delete(db=db, identifier_value=request.json.get('identifier', None))


@app.route('/api/list/work_plan_goal', methods=['GET'])
def list_work_plan_goal():
    return api.list(request, db)