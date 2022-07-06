
from flask import jsonify
from flask import request
from sqlalchemy.exc import SQLAlchemyError
from workplan.followup.models import FollowupGoal
from sqlalchemy import and_
from app import app
import relations
from app import db


from backend_utils.templates.api import ApiView
from workplan.operation.models import OperationPhase
api = ApiView(class_instance=FollowupGoal, identifier_attr='id',
              relationships=relations.relations)


@app.route('/api/follow_up_goal', methods=['POST', 'GET', 'PUT', 'DELETE'])
def followup_goal():
    if request.method == 'GET':
        return api.get(identifier_value=request.args.get('identifier', None))
    elif request.method == 'POST':
        return api.post(request)
    elif request.method == 'PUT':
        return api.put(request, identifier_value=request.json.get('identifier', None))
    elif request.method == 'DELETE':
        return api.delete(db=db, identifier_value=request.json.get('identifier', None))


@app.route('/api/list/follow_up_goal', methods=['GET'])
def list_followup_goal():
    return api.list(request, db)