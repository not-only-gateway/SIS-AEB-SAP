from app import app, db

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
from structural.models import Unit
from sqlalchemy.exc import SQLAlchemyError


def copy(attr, instance, to_replace, old_data):
    if old_data.get('_sa_instance_state', None) is not None:
        old_data.pop('_sa_instance_state', None)

    old_data[attr] = to_replace

    old_data.pop('id', None)

    new_data = instance(old_data)

    new_data = instance.query.get(new_data.id)

    new_data = new_data.__dict__
    return new_data.pop('_sa_instance_state', None)


def populate_op_relations(instance, data, new_operation):
    try:
        for entry in data:
            n = instance.query.get(entry.id)
            dict_data = n.__dict__
            dict_data['operation_phase'] = new_operation
            instance(dict_data)
    except SQLAlchemyError:
        pass


def copy_wp(data):
    http_status = 400

    try:
        Unit.retrieve(data.get('responsible', None))
        apostille = WorkPlan(data)
        http_status = 201
        status = WorkPlanStatus.query.filter(WorkPlanStatus.work_plan == data.get('apostille_work_plan', None))
        try:
            for stt in status:
                stt_data = stt.__dict__
                if stt_data.get('update_date', None) is not None and stt_data.get('difficulties',
                                                                                  None) is not None and stt_data.get(
                    'status', None) is not None:
                    copy(attr='work_plan', instance=WorkPlanStatus, to_replace=apostille.id, old_data=stt_data)
        except SQLAlchemyError:
            http_status = 207

        financial = FinancialDisbursement.query.filter(
            FinancialDisbursement.work_plan == data.get('apostille_work_plan', None)
        )

        try:
            for disbursement in financial:
                financial_data = disbursement.__dict__
                if financial_data.get('year', None) is not None and financial_data.get('value',
                                                                                       None) is not None and financial_data.get(
                    'month', None) is not None:
                    copy(attr='work_plan', instance=FinancialDisbursement, to_replace=apostille.id,
                         old_data=financial_data)
        except SQLAlchemyError:
            http_status = 207

        goal = Goal.query.filter(Goal.work_plan == data.get('apostille_work_plan', None))
        for old_goal in goal:
            try:
                dict_copy = Goal.query.get(old_goal.id).__dict__
                dict_copy['work_plan'] = apostille.id
                new_goal = Goal(dict_copy)

                old_stages = ActivityStage.query.filter(ActivityStage.goal == old_goal.id)

                for old_stage in old_stages:
                    dict_copy = ActivityStage.query.get(old_stage.id).__dict__
                    dict_copy['goal'] = new_goal.id
                    new_stage = ActivityStage(dict_copy)

                    old_operations = OperationPhase.query.filter(OperationPhase.activity_stage == old_stage.id)

                    for old_operation in old_operations:
                        dict_copy = OperationPhase.query.get(old_operation.id).__dict__
                        dict_copy['activity_stage'] = new_stage.id
                        new_operation = OperationPhase(dict_copy)

                        execution = Execution.query.filter(Execution.operation_phase == old_operation.id)
                        f_goal = FollowupGoal.query.filter(FollowupGoal.operation_phase == old_operation.id)
                        action = ActionItem.query.filter(ActionItem.operation_phase == old_operation.id)
                        goods = PermanentGoods.query.filter(PermanentGoods.operation_phase == old_operation.id)
                        note = CommitmentNotes.query.filter(CommitmentNotes.operation_phase == old_operation.id)
                        resource = ResourceApplication.query.filter(
                            ResourceApplication.operation_phase == old_operation.id)

                        populate_op_relations(instance=Execution, data=execution, new_operation=new_operation.id)
                        populate_op_relations(instance=FollowupGoal, data=f_goal, new_operation=new_operation.id)
                        populate_op_relations(instance=ActionItem, data=action, new_operation=new_operation.id)
                        populate_op_relations(instance=PermanentGoods, data=goods, new_operation=new_operation.id)
                        populate_op_relations(instance=CommitmentNotes, data=note, new_operation=new_operation.id)
                        populate_op_relations(instance=ResourceApplication, data=resource,
                                              new_operation=new_operation.id)

            except SQLAlchemyError:
                http_status = 207

        return [{'id': apostille.id}, http_status]
    except SQLAlchemyError as e:

        return [{'status': http_status, 'description': str(e)}, http_status]
