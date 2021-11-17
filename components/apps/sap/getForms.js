import dynamic from "next/dynamic";

export default function getForms() {
    return [
        {
            basePath: 'status',
            content: dynamic(() => import( "./components/forms/StatusForm"))
        },
        {
            basePath: 'action',
            content: dynamic(() => import( "./components/forms/ActionForm"))
        },
        {
            basePath: 'activity_stage',
            content: dynamic(() => import( "./components/forms/ActivityStageForm"))
        },
        {
            basePath: 'action_item',
            content: dynamic(() => import( "./components/forms/ActionItemForm"))
        },
        {
            basePath: 'budget_plan',
            content: dynamic(() => import( "./components/forms/BudgetPlanForm"))
        },
        {
            basePath: 'classification',
            content: dynamic(() => import( "./components/forms/ComponentDescriptionForm"))
        },
        {
            basePath: 'decentralized_unit',
            content: dynamic(() => import( "./components/forms/DecentralizedUnitForm"))
        },
        {
            basePath: 'execution',
            content: dynamic(() => import( "./components/forms/ExecutionForm"))
        },
        {
            basePath: 'financial_disbursement',
            content: dynamic(() => import( "./components/forms/FinancialDisbursementForm"))
        },
        {
            basePath: 'follow_up_goal',
            content: dynamic(() => import( "./components/forms/FollowUpForm"))
        },
        {
            basePath: 'work_plan_goal',
            content: dynamic(() => import( "./components/forms/WorkPlanForm"))
        },
        {
            basePath: 'component',
            content: dynamic(() => import( "./components/forms/InfrastructureComponentForm"))
        },
        {
            basePath: 'infrastructure',
            content: dynamic(() => import( "./components/forms/InfrastructureForm"))
        },

        {
            basePath: 'nature_of_expense',
            content: dynamic(() => import( "./components/forms/NatureExpenseForm"))
        },
        {
            basePath: 'commitment_note',
            content: dynamic(() => import( "./components/forms/NoteForm"))
        },
        {
            basePath: 'operation_phase',
            content: dynamic(() => import( "./components/forms/OperationForm"))
        },
        {
            basePath: 'permanent_goods',
            content: dynamic(() => import( "./components/forms/PermanentGoodsForm"))
        },
        {
            basePath: 'activity_project',
            content: dynamic(() => import( "./components/forms/ProjectForm"))
        },
        {
            basePath: 'goal_project',
            content: dynamic(() => import( "./components/forms/ProjectGoalForm"))
        },
        {
            basePath: 'resource_application',
            content: dynamic(() => import( "./components/forms/ResourceApplicationForm"))
        },
        {
            basePath: 'risk',
            content: dynamic(() => import( "./components/forms/RiskForm"))
        },
        {
            basePath: 'ted',
            content: dynamic(() => import( "./components/forms/TedForm"))
        },
        {
            basePath: 'unit',
            content: dynamic(() => import( "./components/forms/UnitForm"))
        },
        {
            basePath: 'work_plan',
            content: dynamic(() => import( "./components/forms/WorkPlanForm"))
        },
    ]
}
