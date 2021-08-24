import axios from "axios";
import Host from "../shared/Host";
import Cookies from "universal-cookie/lib";
import PropTypes from "prop-types";

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

        await axios({
            method: 'delete',
            url:  Host() + 'project/'+submitProps.pk,
            headers: {'authorization': jwt},
            data: submitProps.data
        }).then(res => {
            submitProps.setStatus({
                type: 'success',
                message: res.status + ' - ' + res.statusText,
            })
            submitProps.setRefreshed(false)
            response = true
        }).catch(error => {
            submitProps.setStatus({
                type: 'error',
                message: error.message
            })
            console.log(error.request)
        })
        return response
    }
    static async fetchProject(pk) {
        let response = null
        await axios({
            method: 'get',
            url: Host() + 'project/' + pk,
            headers: {'authorization': jwt}
        }).then(res => {
            response = res.data
        }).catch(error => {
            console.log(error)
        })
        return response
    }

    static async submitAction(submitProps) {
        let response = false
        await axios({
            method: submitProps.create ? 'post' : 'put',
            url: submitProps.create ? Host() + 'action' : Host() + 'action/' + submitProps.pk,
            headers: {'authorization': jwt},
            data: submitProps.data
        }).then(res => {
            submitProps.setStatus({
                type: 'success',
                message: res.status + ' - ' + res.statusText,
            })
            response = true
        }).catch(error => {
            submitProps.setStatus({
                type: 'error',
                message: error.message
            })
            console.log(error.request)
        })
        return response
    }
    static async submitBudgetPlan(submitProps) {
        let response = false
        let data = {}
        data = Object.assign(data, submitProps.data)

        data.action = data.action.id

        await axios({
            method: submitProps.create ? 'post' : 'put',
            url: submitProps.create ? Host() + 'budget_plan' : Host() + 'budget_plan/' + submitProps.pk,
            headers: {'authorization': jwt},
            data: data
        }).then(res => {
            submitProps.setStatus({
                type: 'success',
                message: res.status + ' - ' + res.statusText,
            })
            response = true
        }).catch(error => {
            submitProps.setStatus({
                type: 'error',
                message: error.message
            })
            console.log(error.request)
        })
        return response
    }
    static async submitNatureOfExpense(submitProps) {
        let response = false
        console.log(submitProps.data)
        await axios({
            method: submitProps.create ? 'post' : 'put',
            url: submitProps.create ? Host() + 'nature_of_expense' : Host() + 'nature_of_expense/' + submitProps.pk,
            headers: {'authorization': jwt},
            data: submitProps.data
        }).then(res => {
            submitProps.setStatus({
                type: 'success',
                message: res.status + ' - ' + res.statusText,
            })
            response = true
        }).catch(error => {
            submitProps.setStatus({
                type: 'error',
                message: error.message
            })
            console.log(error.request)
        })
        return response
    }
    static async submitObjective(submitProps) {
        let response = false

        await axios({
            method: submitProps.create ? 'post' : 'put',
            url: submitProps.create ? Host() + 'goal_project' : Host() + 'goal_project/' + submitProps.pk,
            headers: {'authorization': jwt},
            data: submitProps.data
        }).then(res => {
            submitProps.setStatus({
                type: 'success',
                message: res.status + ' - ' + res.statusText,
            })
            response = true
        }).catch(error => {
            submitProps.setStatus({
                type: 'error',
                message: error.message
            })
        })
        return response
    }
    static async deleteProjectTed(submitProps) {
        let response = false

        await axios({
            method: 'delete',
            url:  Host() + 'project_ted/'+submitProps.pk,
            headers: {'authorization': jwt},
            data: submitProps.data
        }).then(res => {
            submitProps.setStatus({
                type: 'success',
                message: res.status + ' - ' + res.statusText,
            })
            submitProps.setRefreshed(false)
            response = true
        }).catch(error => {
            submitProps.setStatus({
                type: 'error',
                message: error.message
            })
            console.log(error.request)
        })
        return response
    }
    static async submitProjectTed(submitProps) {
        let response = false

        await axios({
            method: 'post',
            url:  Host() + 'project_ted',
            headers: {'authorization': jwt},
            data: submitProps.data
        }).then(res => {
            submitProps.setStatus({
                type: 'success',
                message: res.status + ' - ' + res.statusText,
            })
            response = true
        }).catch(error => {
            submitProps.setStatus({
                type: 'error',
                message: error.message
            })
            console.log(error.request)
        })
        return response
    }
    static async submitRisk(submitProps) {
        let response = false

        await axios({
            method: submitProps.create ? 'post' : 'put',
            url: submitProps.create ? Host() + 'risk' : Host() + 'risk/' + submitProps.pk,
            headers: {'authorization': jwt},
            data: submitProps.data
        }).then(res => {
            submitProps.setStatus({
                type: 'success',
                message: res.status + ' - ' + res.statusText,
            })
            response = true
        }).catch(error => {
            submitProps.setStatus({
                type: 'error',
                message: error.message
            })
        })
        return response
    }
    static async deleteObjective(submitProps) {
        let response = false

        await axios({
            method: 'delete',
            url:  Host() + 'goal_project/'+submitProps.pk,
            headers: {'authorization': jwt},
            data: submitProps.data
        }).then(res => {
            submitProps.setStatus({
                type: 'success',
                message: res.status + ' - ' + res.statusText,
            })
            submitProps.setRefreshed(false)
            response = true
        }).catch(error => {
            submitProps.setStatus({
                type: 'error',
                message: error.message
            })
            console.log(error.request)
        })
        return response
    }
    static async deleteRisk(submitProps) {
        let response = false

        await axios({
            method: 'delete',
            url:  Host() + 'risk/'+submitProps.pk,
            headers: {'authorization': jwt},
            data: submitProps.data
        }).then(res => {
            submitProps.setStatus({
                type: 'success',
                message: res.status + ' - ' + res.statusText,
            })
            submitProps.setRefreshed(false)
            response = true
        }).catch(error => {
            submitProps.setStatus({
                type: 'error',
                message: error.message
            })
            console.log(error.request)
        })
        return response
    }

}


