
from flask import jsonify
from flask import request
from sqlalchemy.exc import SQLAlchemyError
from workplan.action.models import ActionItem
from sqlalchemy import and_
from app import app
import relations
from app import db

from workplan.operation.models import OperationPhase
from backend_utils.templates.api import ApiView

api = ApiView(class_instance=ActionItem, identifier_attr='id',
              relationships=relations.relations)


@app.route('/api/action_item', methods=['POST', 'GET', 'PUT', 'DELETE'])
def action_item():
    if request.method == 'GET':
        return api.get(identifier_value=request.args.get('identifier', None))
    elif request.method == 'POST':
        return api.post(request)
    elif request.method == 'PUT':
        return api.put(request, identifier_value=request.json.get('identifier', None))
    elif request.method == 'DELETE':
        return api.delete(db=db, identifier_value=request.json.get('identifier', None))


@app.route('/api/list/action_item', methods=['GET'])
def list_action_item():
    return api.list(request, db)
