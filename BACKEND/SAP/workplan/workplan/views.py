from flask import jsonify
from flask import request
from sqlalchemy.exc import SQLAlchemyError
import json
from workplan.operation.models import OperationPhase
from workplan.resource.models import ResourceApplication
from workplan.followup.models import FollowupGoal
from workplan.goods.models import PermanentGoods
from workplan.financial.models import FinancialDisbursement
from workplan.execution.models import Execution
from workplan.note.models import CommitmentNotes
from workplan.status.models import WorkPlanStatus
from workplan.action.models import ActionItem
from workplan.workplan.models import WorkPlan
from workplan.goal.models import Goal
from workplan.activity.models import ActivityStage
from project_ted.models import Teds
from project.project.models import ActivityProject
from associative.budget_plan.models import BudgetPlan
from associative.infrastructure.models import Infrastructure

from app import app, db
import relations
from ted.models import Ted
from sqlalchemy import and_

from structural.models import Unit
from copy_entry_structure import copy_wp

from backend_utils.templates.api import ApiView

api = ApiView(class_instance=WorkPlan, identifier_attr='id',
              relationships=relations.relations)
to_parse = ApiView(class_instance=WorkPlan, identifier_attr='id',
                   relationships=[])




@app.route('/api/apostille', methods=['POST'])
def create_apostille():
    res = copy_wp(request.json)

    return jsonify(res[0]), res[1]


@app.route('/api/work_plan', methods=['POST', 'GET', 'PUT', 'DELETE'])
def work_plan():
    if request.method == 'GET':
        return api.get(identifier_value=request.args.get('identifier', None))
    elif request.method == 'POST':
        Unit.retrieve(request.json.get('responsible', None))
        # teds = Teds.query.filter(Teds.activity_project == request.json.get('activity_project', None),
        #                          Teds.ted == request.json.get('ted', None)).first()


        # if teds is None:
        #     Teds({
        #         'activity_project': request.json.get('activity_project', None),
        #         'ted': request.json.get('ted', None)
        #     })

        return api.post(request)
    elif request.method == 'PUT':
        teds = Teds.query.filter(Teds.activity_project == request.json.get('activity_project', None),
                                 Teds.ted == request.json.get('ted', None)).first()

        if teds is None:
            Teds({
                'activity_project': request.json.get('activity_project', None),
                'ted': request.json.get('ted', None)
            })
        return api.put(request, identifier_value=request.json.get('identifier', None))
    elif request.method == 'DELETE':
        return api.delete(db=db, identifier_value=request.json.get('identifier', None))


@app.route('/api/list/work_plan', methods=['GET'])
def list_work_plan():
    return api.list(request, db)
