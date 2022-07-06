from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sys import path
from flask import request
from flask import jsonify
from flask import abort

import env

app = Flask(__name__)

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config[
    'SQLALCHEMY_DATABASE_URI'
] = 'postgresql://' + env.USER_DB + ':' + env.PASSWORD_DB + '@' + env.SERVER_DB + '/' + env.DB_NAME
db = SQLAlchemy(app)
CORS(app)

# MODELS
from user.models import User
from ted.models import Ted
from project_ted.models import Teds
from project.project.models import ActivityProject
from structural.models import Unit
from workplan.operation.models import OperationPhase
from workplan.resource.models import ResourceApplication
from workplan.followup.models import FollowupGoal
from workplan.financial.models import FinancialDisbursement
from workplan.execution.models import Execution
from workplan.note.models import CommitmentNotes
from workplan.status.models import WorkPlanStatus
from workplan.action.models import ActionItem
from workplan.workplan.models import WorkPlan
from workplan.activity.models import ActivityStage
from workplan.goods.models import PermanentGoods
from workplan.goal.models import Goal
from project.goal.models import ProjectGoals
from project.risk.models import Risks
from associative.action.models import Action
from associative.classification.models import Classification, ClassificationInfrastructure
from associative.type.models import ClassificationType
from associative.decentralized_unit.models import DecentralizedUnit
from associative.budget_plan.models import BudgetPlan
from associative.components.models import Component
from associative.nature_of_expense.models import NatureOfExpense
from associative.infrastructure.models import Infrastructure

# VIEWS
from project_ted import views
from workplan.operation import views
from workplan.resource import views
from workplan.followup import views
from workplan.goods import views
from workplan.financial import views
from workplan.execution import views
from workplan.note import views
from workplan.status import views
from workplan.action import views
from workplan.workplan import views
from workplan.goal import views
from workplan.activity import views
from ted import views
from project.project import views
from project.goal import views
from project.risk import views
from associative.type import views
from associative.classification import views
from associative.budget_plan import views
from associative.decentralized_unit import views
from associative.action import views
from associative.nature_of_expense import views
from associative.components import views
from associative.infrastructure import views

db.create_all()

if __name__ == '__main__':
    app.run()
