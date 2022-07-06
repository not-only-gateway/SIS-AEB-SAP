from flask import jsonify
from flask import request
from sqlalchemy.exc import SQLAlchemyError
from workplan.operation.models import OperationPhase
from workplan.activity.models import ActivityStage
from workplan.goal.models import Goal
from workplan.workplan.models import WorkPlan
from workplan.execution.models import Execution
from ted.models import Ted
from app import app
import relations
from app import db
from project.project.models import ActivityProject
from sqlalchemy import and_

from backend_utils.templates.api import ApiView

api = ApiView(class_instance=OperationPhase, identifier_attr='id',
              relationships=relations.relations)


@app.route('/api/operation_phase', methods=['POST', 'GET', 'PUT', 'DELETE'])
def operation_phase():
    if request.method == 'GET':
        return api.get(identifier_value=request.args.get('identifier', None))
    elif request.method == 'POST':
        return api.post(request)
    elif request.method == 'PUT':
        return api.put(request, identifier_value=request.json.get('identifier', None))
    elif request.method == 'DELETE':
        return api.delete(db=db, identifier_value=request.json.get('identifier', None))


@app.route('/api/list/operation_phase', methods=['GET'])
def list_operation_phase():
    return api.list(request, db)


@app.route('/api/dashboard_exec_sap', methods=['GET'])
def in_dashboard():
    operations = OperationPhase.query.all()
    executions = Execution.query.all()
    ops = []
    execs = []
    for i in executions:
        data = Execution.query.get(i.id).__dict__
        data.pop('_sa_instance_state', None)
        execs.append(data)
    for i in operations:
        stage = ActivityStage.query.get(i.activity_stage)
        goal = Goal.query.get(stage.goal)
        work_plan = WorkPlan.query.get(goal.work_plan)
        ted = Ted.query.get(work_plan.ted)
        project = ActivityProject.query.get(work_plan.activity_project)

        ops.append({
            'id': i.id,
            'detalhamento': i.detailing,
            'objeto': work_plan.object,
            'fase': i.phase,
            'numero_ted': ted.number,
            'numero_meta': goal.goal_number,
            'etapa/atividade': stage.stage,
            'indicador_planejado': i.indicator_planned,
            'ano': ted.year,
            'projeto': project.name
        })

    return jsonify({
        'execução': execs,
        'fase/operação': ops
    }), 200
