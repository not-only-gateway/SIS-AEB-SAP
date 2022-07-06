
from flask import jsonify
from flask import request
from sqlalchemy.exc import SQLAlchemyError
from workplan.financial.models import FinancialDisbursement
from sqlalchemy import and_
from app import app
import relations
from app import db

from workplan.workplan.models import WorkPlan
from backend_utils.templates.api import ApiView

api = ApiView(class_instance=FinancialDisbursement, identifier_attr='id',
              relationships=relations.relations)


@app.route('/api/financial_disbursement', methods=['POST', 'GET', 'PUT', 'DELETE'])
def financial_disbursement():
    if request.method == 'GET':
        return api.get(identifier_value=request.args.get('identifier', None))
    elif request.method == 'POST':
        return api.post(request)
    elif request.method == 'PUT':
        return api.put(request, identifier_value=request.json.get('identifier', None))
    elif request.method == 'DELETE':
        return api.delete(db=db, identifier_value=request.json.get('identifier', None))


@app.route('/api/list/financial_disbursement', methods=['GET'])
def list_financial_disbursement():
    return api.list(request, db)