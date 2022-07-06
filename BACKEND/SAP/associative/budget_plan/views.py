from flask import jsonify
from flask import request
from sqlalchemy.exc import SQLAlchemyError
from associative.budget_plan.models import BudgetPlan
from associative.action.models import Action
from app import app
import relations
from app import db
from sqlalchemy import and_

from backend_utils.templates.api import ApiView

api = ApiView(class_instance=BudgetPlan, identifier_attr='id',
              relationships=relations.relations)


@app.route('/api/budget_plan', methods=['POST', 'GET', 'PUT', 'DELETE'])
def budget():
    if request.method == 'GET':
        return api.get(identifier_value=request.args.get('identifier', None))
    elif request.method == 'POST':
        return api.post(request)
    elif request.method == 'PUT':
        return api.put(request, identifier_value=request.json.get('identifier', None))
    elif request.method == 'DELETE':
        return api.delete(db=db, identifier_value=request.json.get('identifier', None))


@app.route('/api/list/budget_plan', methods=['GET'])
def list_budget():
    return api.list(request, db)
