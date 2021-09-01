import Host from "../shared/Host";
import Cookies from "universal-cookie/lib";
import PropTypes from "prop-types";
import Requester from "../../components/shared/core/requester/Requester";

const submitProps = PropTypes.shape({
    pk: PropTypes.number,
    data: PropTypes.object,
    create: PropTypes.bool
})
export default class ProjectRequests {
    static async deleteUnit(submitProps) {
        let response = false
        await Requester({
            method: 'delete',
            url: Host() + 'unit/' + submitProps.pk,
            showSuccessAlert: true,
            token: (new Cookies()).get('jwt'),
            data: submitProps.data
        }).then(res => {
            submitProps.setRefreshed(false)
            response = true
        }).catch(e => {
            console.log(e)
        })
        return response
    }
    static async deleteType(submitProps) {
        let response = false
        await Requester({
            method: 'delete',
            url: Host() + 'type/' + submitProps.pk,
            showSuccessAlert: true,
            token: (new Cookies()).get('jwt'),
            data: submitProps.data
        }).then(res => {
            submitProps.setRefreshed(false)
            response = true
        }).catch(e => {
            console.log(e)
        })
        return response
    }
    static async deleteNatureOfExpense(submitProps) {
        let response = false
        await Requester({
            method: 'delete',
            url: Host() + 'nature_of_expense/' + submitProps.pk,
            showSuccessAlert: true,
            token: (new Cookies()).get('jwt'),
            data: submitProps.data
        }).then(res => {
            submitProps.setRefreshed(false)
            response = true
        }).catch(e => {
            console.log(e)
        })
        return response
    }
    static async submitType(submitProps) {
        let response = false
        await Requester({
            package: submitProps.data,
            url: submitProps.create ? Host() + 'type' : Host() + 'type/' + submitProps.pk,
            method: submitProps.create ? 'post' : 'put',
            showSuccessAlert: true,
            token: (new Cookies()).get('jwt')
        }).then(res => {
            response = true
        }).catch(e => {
            console.log(e)
        })
        return response
    }

    static async deleteAction(submitProps) {
        let response = false
        await Requester({
            method: 'delete',
            url: Host() + 'action/' + submitProps.pk,
            showSuccessAlert: true,
            token: (new Cookies()).get('jwt'),
            data: submitProps.data
        }).then(res => {
            submitProps.setRefreshed(false)
            response = true
        }).catch(e => {
            console.log(e)
        })
        return response
    }

    static async deleteBudgetPlan(submitProps) {
        let response = false
        await Requester({
            method: 'delete',
            url: Host() + 'budget_plan/' + submitProps.pk,
            showSuccessAlert: true,
            token: (new Cookies()).get('jwt'),
            data: submitProps.data
        }).then(res => {
            submitProps.setRefreshed(false)
            response = true
        }).catch(e => {
            console.log(e)
        })
        return response
    }


    static async submitUnit(submitProps) {
        let response = false
        let data = {}
        data = Object.assign(data, submitProps.data)

        if (data.parent_unit !== undefined && data.parent_unit !== null)
            data.parent_unit = data.parent_unit.id

        await Requester({
            package: data,
            url: submitProps.create ? Host() + 'unit' : Host() + 'unit/' + submitProps.pk,
            method: submitProps.create ? 'post' : 'put',
            showSuccessAlert: true,
            token: (new Cookies()).get('jwt')
        }).then(res => {
            response = true
        }).catch(e => {
            console.log(e)
        })

        return response
    }

    static async submitProject(submitProps) {
        let response = submitProps.create ? null : false

        let data = {}
        data = Object.assign(data, submitProps.data)
        if(data !== undefined && data.responsible !== undefined && data.responsible !== null)
        data.responsible = data.responsible.id

        await Requester({
            package: data,
            url: submitProps.create ? Host() + 'project' : Host() + 'project/' + submitProps.pk,
            method: submitProps.create ? 'post' : 'put',
            showSuccessAlert: true,
            token: (new Cookies()).get('jwt')
        }).then(res => {
            response = submitProps.create ? res.data.id : true
        }).catch(e => {
            console.log(e)
        })

        return response
    }

    static async deleteProject(submitProps) {
        let response = false
        await Requester({
            method: 'delete',
            url: Host() + 'project/' + submitProps.pk,
            showSuccessAlert: true,
            token: (new Cookies()).get('jwt'),
            data: submitProps.data
        }).then(res => {
            submitProps.setRefreshed(false)
            response = true
        }).catch(e => {
            console.log(e)
        })
        return response
    }

    static async fetchProject(pk) {
        let response = null
        await Requester({
            method: 'get',
            url: Host() + 'project/' + pk,

            token: (new Cookies()).get('jwt')
        }).then(res => {
            response = res.data
        }).catch(e => {
            console.log(e)
        })
        return response
    }

    static async submitDecentralizedUnit(submitProps) {
        let response = false

        await Requester({
            package: submitProps.data,
            method: submitProps.create ? 'post' : 'put',
            url: submitProps.create ? Host() + 'decentralized_unit' : Host() + 'decentralized_unit/' + submitProps.pk,
            showSuccessAlert: true,
            token: (new Cookies()).get('jwt')
        }).then(res => {
            response = true
        }).catch(e => {
            console.log(e)
        })
        return response
    }

    static async submitAction(submitProps) {
        let response = false

        await Requester({
            package: submitProps.data,
            method: submitProps.create ? 'post' : 'put',
            url: submitProps.create ? Host() + 'action' : Host() + 'action/' + submitProps.pk,
            showSuccessAlert: true,
            token: (new Cookies()).get('jwt')
        }).then(res => {
            response = true
        }).catch(e => {
            console.log(e)
        })
        return response
    }

    static async submitBudgetPlan(submitProps) {
        let response = false
        let data = {}
        data = Object.assign(data, submitProps.data)
        console.log(data)
        if(data !== undefined && data.action !== undefined)
            data.action = data.action.id
        await Requester({
            package: data,
            method: submitProps.create ? 'post' : 'put',
            url: submitProps.create ? Host() + 'budget_plan' : Host() + 'budget_plan/' + submitProps.pk,
            showSuccessAlert: true,
            token: (new Cookies()).get('jwt')
        }).then(res => {
            response = true
        }).catch(e => {
            console.log(e)
        })
        return response
    }

    static async submitNatureOfExpense(submitProps) {
        let response = false
        await Requester({
            package: submitProps.data,
            method: submitProps.create ? 'post' : 'put',
            url: submitProps.create ? Host() + 'nature_of_expense' : Host() + 'nature_of_expense/' + submitProps.pk,
            showSuccessAlert: true,
            token: (new Cookies()).get('jwt')
        }).then(res => {
            response = true
        }).catch(e => {
            console.log(e)
        })
        return response
    }

    static async submitObjective(submitProps) {
        let response = false
        await Requester({
            package: submitProps.data,
            method: submitProps.create ? 'post' : 'put',
            url: submitProps.create ? Host() + 'goal_project' : Host() + 'goal_project/' + submitProps.pk,
            showSuccessAlert: true,
            token: (new Cookies()).get('jwt')
        }).then(res => {
            response = true
        }).catch(e => {
            console.log(e)
        })
        return response
    }

    static async deleteProjectTed(submitProps) {
        let response = false
        await Requester({
            package: submitProps.data,
            method: 'delete',
            url: Host() + 'project_ted/' + submitProps.pk,
            showSuccessAlert: true,
            token: (new Cookies()).get('jwt')
        }).then(res => {
            submitProps.setRefreshed(false)
            response = true
        }).catch(e => {
            console.log(e)
        })
        return response
    }

    static async deleteDecentralizedUnit(submitProps) {
        let response = false
        await Requester({
            package: submitProps.data,
            method: 'delete',
            url: Host() + 'decentralized_unit/' + submitProps.pk,
            showSuccessAlert: true,
            token: (new Cookies()).get('jwt')
        }).then(res => {
            submitProps.setRefreshed(false)
            response = true
        }).catch(e => {
            console.log(e)
        })
        return response
    }

    static async submitProjectTed(submitProps) {
        let response = false
        await Requester({
            package: submitProps.data,
            method: 'post',
            url: Host() + 'project_ted',
            showSuccessAlert: true,
            token: (new Cookies()).get('jwt')
        }).then(res => {
            response = true
        }).catch(e => {
            console.log(e)
        })
        return response
    }

    static async submitRisk(submitProps) {
        let response = false

        await Requester({
            package: submitProps.data,
            method: submitProps.create ? 'post' : 'put',
            url: submitProps.create ? Host() + 'risk' : Host() + 'risk/' + submitProps.pk,
            showSuccessAlert: true,
            token: (new Cookies()).get('jwt')
        }).then(res => {
            response = true
        }).catch(e => {
            console.log(e)
        })
        return response
    }

    static async submitClassification(submitProps) {
        let response = false

        await Requester({
            package: submitProps.data,
            method: submitProps.create ? 'post' : 'put',
            url: submitProps.create ? Host() + 'classification' : Host() + 'classification/' + submitProps.pk,
            showSuccessAlert: true,
            token: (new Cookies()).get('jwt')
        }).then(res => {
            response = true
        }).catch(e => {
            console.log(e)
        })
        return response
    }

    static async deleteClassification(submitProps) {
        let response = false
        await Requester({
            package: submitProps.data,
            method: 'delete',
            url: Host() + 'classification/' + submitProps.pk,
            showSuccessAlert: true,
            token: (new Cookies()).get('jwt')
        }).then(res => {
            submitProps.setRefreshed(false)
            response = true
        }).catch(e => {
            console.log(e)
        })
        return response
    }

    static async deleteObjective(submitProps) {
        let response = false
        await Requester({
            package: submitProps.data,
            method: 'delete',
            url: Host() + 'goal_project/' + submitProps.pk,
            showSuccessAlert: true,
            token: (new Cookies()).get('jwt')
        }).then(res => {
            submitProps.setRefreshed(false)
            response = true
        }).catch(e => {
            console.log(e)
        })
        return response
    }

    static async deleteRisk(submitProps) {
        let response = false
        await Requester({
            package: submitProps.data,
            method: 'delete',
            url: Host() + 'risk/' + submitProps.pk,
            showSuccessAlert: true,
            token: (new Cookies()).get('jwt')
        }).then(res => {
            submitProps.setRefreshed(false)
            response = true
        }).catch(e => {
            console.log(e)
        })
        return response
    }

}


