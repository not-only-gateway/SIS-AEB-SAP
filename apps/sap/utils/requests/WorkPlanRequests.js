import Host from "../shared/Host";
import Cookies from "universal-cookie/lib";
import PropTypes from "prop-types";
import Requester from "../../components/shared/core/requester/Requester";

const jwt = (new Cookies()).get('jwt')
const submitProps = PropTypes.shape({
    pk: PropTypes.number,
    data: PropTypes.object,
    setStatus: PropTypes.func,
    create: PropTypes.bool
})
export default class WorkPlanRequests {
    static async deleteWorkPlan(submitProps) {
        let response = false

        await Requester({
            package: submitProps.data,
            method: 'delete',
            url: Host() + 'work_plan/' + submitProps.pk,
            showSuccessAlert: true,
            token: jwt
        }).then(res => {
            submitProps.setRefreshed(false)
            response = true
        }).catch(e => {
            console.log(e)
        })


        return response
    }
    static async deleteGoal(submitProps) {
        let response = false

        await Requester({
            package: submitProps.data,
            method: 'delete',
            url: Host() + 'work_plan_goal/' + submitProps.pk,
            showSuccessAlert: true,
            token: jwt
        }).then(res => {
            submitProps.setRefreshed(false)
            response = true
        }).catch(e => {
            console.log(e)
        })


        return response
    }

    static async fetchWorkPlan(pk) {
        let response = null
        await Requester({
            method: 'get',
            url: Host() + 'work_plan/' + pk,
            token: jwt
        }).then(res => {
            response = res.data
        }).catch(e => {
            console.log(e)
        })
        return response
    }

    static async fetchStage(pk) {
        let response = null
        await Requester({
            method: 'get',
            url: Host() + 'activity/' + pk,
            token: jwt
        }).then(res => {
            response = res.data
        }).catch(e => {
            console.log(e)
        })

        return response
    }

    static async deleteStage(submitProps) {
        let response = false
        await Requester({
            package: submitProps.data,
            method: 'delete',
            url: Host() + 'activity/' + submitProps.pk,
            showSuccessAlert: true,
            token: jwt
        }).then(res => {
            submitProps.setRefreshed(false)
            response = true
        }).catch(e => {
            console.log(e)
        })

        return response
    }

    static async fetchGoal(pk) {
        let response = null
        await Requester({
            method: 'get',
            url: Host() + 'work_plan_goal/' + pk,
            token: jwt
        }).then(res => {
            response = res.data
        }).catch(e => {
            console.log(e)
        })

        return response
    }

    static async submitWorkPlan(submitProps) {
        let response = null
        let data = {}
        data = Object.assign(data, submitProps.data)

        if (data !== undefined && data.budget_plan !== undefined && data.infrastructure !== undefined ) {
            data.budget_plan = data.budget_plan.id
            data.infrastructure = data.infrastructure.id
        }
        await Requester({
            package: data,
            method: submitProps.create ? 'post' : 'put',
            url: submitProps.create ? Host() + 'work_plan' : Host() + 'work_plan/' + submitProps.pk,
            showSuccessAlert: true,
            token: jwt
        }).then(res => {
            submitProps.setRefreshed(false)
            response = res.data.id
        }).catch(e => {
            console.log(e)
        })


        return response
    }

    static async submitInfrastructure(submitProps) {
        let response = false
        let data = {}
        data = Object.assign(data, submitProps.data)
        if (data !== undefined)
        data.address = submitProps.data.latitude + ', ' + submitProps.data.longitude

        await Requester({
            package: data,
            method: submitProps.create ? 'post' : 'put',
            url: submitProps.create ? Host() + 'infrastructure' : Host() + 'infrastructure/' + submitProps.pk,
            showSuccessAlert: true,
            token: jwt
        }).then(res => {
            response = true
        }).catch(e => {
            console.log(e)
        })
        return response
    }

    static async deleteInfrastructure(submitProps) {
        let response = false
        await Requester({
            package: submitProps.data,
            method: 'delete',
            url: Host() + 'infrastructure/' + submitProps.pk,
            showSuccessAlert: true,
            token: jwt
        }).then(res => {
            submitProps.setRefreshed(false)
            response = true
        }).catch(e => {
            console.log(e)
        })

        return response
    }

    static async deleteFinancial(submitProps) {
        let response = false
        await Requester({
            package: submitProps.data,
            method: 'delete',
            url: Host() + 'financial_disbursement/' + submitProps.pk,
            showSuccessAlert: true,
            token: jwt
        }).then(res => {
            submitProps.setRefreshed(false)
            response = true
        }).catch(e => {
            console.log(e)
        })

        return response
    }

    static async submitFinancial(submitProps) {
        let response = false

        await Requester({
            package: submitProps.data,
            method: submitProps.create ? 'post' : 'put',
            url: submitProps.create ? Host() + 'financial_disbursement' : Host() + 'financial_disbursement/' + submitProps.pk,
            showSuccessAlert: true,
            token: jwt
        }).then(res => {
            response = true
        }).catch(e => {
            console.log(e)
        })

        return response
    }

    static async submitStatus(submitProps) {
        let response = false
        let data = {}
        data = Object.assign(data, submitProps.data)
        if (data !== undefined && submitProps.create)
            data.update_date = new Date()

        await Requester({
            package: data,
            method: submitProps.create ? 'post' : 'put',
            url: submitProps.create ? Host() + 'work_plan_status' : Host() + 'work_plan_status/' + submitProps.pk,
            showSuccessAlert: true,
            token: jwt
        }).then(res => {
            response = true
        }).catch(e => {
            console.log(e)
        })
        return response
    }

    static async deleteStatus(submitProps) {
        let response = false
        await Requester({
            package: submitProps.data,
            method: 'delete',
            url: Host() + 'work_plan_status/' + submitProps.pk,
            showSuccessAlert: true,
            token: jwt
        }).then(res => {
            submitProps.setRefreshed(false)
            response = true
        }).catch(e => {
            console.log(e)
        })

        return response
    }

    static async submitGoal(submitProps) {

        let response = submitProps.create ? null : false

        await Requester({
            package: submitProps.data,
            method: submitProps.create ? 'post' : 'put',
            url: submitProps.create ? Host() + 'work_plan_goal' : Host() + 'work_plan_goal/' + submitProps.pk,
            showSuccessAlert: true,
            token: jwt
        }).then(res => {
            response = submitProps.create ? res.data.id : true
        }).catch(e => {
            console.log(e)
        })

        return response
    }


    static async submitComponent(submitProps) {
        let response = false
        let data = {}
        data = Object.assign(data, submitProps.data)
        if (data !== undefined && data.classification !== undefined)
            data.classification = data.classification.id

        await Requester({
            package: data,
            method: submitProps.create ? 'post' : 'put',
            url: submitProps.create ? Host() + 'component' : Host() + 'component/' + submitProps.pk,
            showSuccessAlert: true,
            token: jwt
        }).then(res => {
            response = true
        }).catch(e => {
            console.log(e)
        })

        return response
    }

    static async deleteComponent(submitProps) {
        let response = false
        await Requester({
            package: submitProps.data,
            method: 'delete',
            url: Host() + 'component/' + submitProps.pk,
            showSuccessAlert: true,
            token: jwt
        }).then(res => {
            submitProps.setRefreshed(false)
            response = true
        }).catch(e => {
            console.log(e)
        })

        return response
    }

    static async submitStage(submitProps) {
        let response = submitProps.create ? null : false

        await Requester({
            package: submitProps.data,
            method: submitProps.create ? 'post' : 'put',
            url: submitProps.create ? Host() + 'activity' : Host() + 'activity/' + submitProps.pk,
            showSuccessAlert: true,
            token: jwt
        }).then(res => {
            response = submitProps.create ? res.data.id : true
        }).catch(e => {
            console.log(e)
        })

        return response
    }

}


