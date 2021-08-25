import Host from "../shared/Host";
import Cookies from "universal-cookie/lib";
import PropTypes from "prop-types";
import Requester from "../../components/shared/misc/requester/Requester";

const jwt = (new Cookies()).get('jwt')
const submitProps = PropTypes.shape({
    pk: PropTypes.number,
    data: PropTypes.object,
    setStatus: PropTypes.func,
    create: PropTypes.bool
})
export default class ProjectRequests {
    static async deleteProject(submitProps) {
        let response = false
        await Requester({
            method: 'delete',
            url:  Host() + 'project/'+submitProps.pk,
            showSuccessAlert: true,
            token: jwt,
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

            token: jwt
        }).then(res => {
            response = res.data
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
            token: jwt
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

        data.action = data.action.id
        await Requester({
            package: data,
            method: submitProps.create ? 'post' : 'put',
            url: submitProps.create ? Host() + 'budget_plan' : Host() + 'budget_plan/' + submitProps.pk,
            showSuccessAlert: true,
            token: jwt
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
            token: jwt
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
            token: jwt
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
            url:  Host() + 'project_ted/'+submitProps.pk,
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
    static async submitProjectTed(submitProps) {
        let response = false
        await Requester({
            package: submitProps.data,
            method: 'post',
            url:  Host() + 'project_ted',
            showSuccessAlert: true,
            token: jwt
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
            token: jwt
        }).then(res => {
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
            url:  Host() + 'goal_project/'+submitProps.pk,
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
    static async deleteRisk(submitProps) {
        let response = false
        await Requester({
            package: submitProps.data,
            method: 'delete',
            url:  Host() + 'risk/'+submitProps.pk,
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

}


