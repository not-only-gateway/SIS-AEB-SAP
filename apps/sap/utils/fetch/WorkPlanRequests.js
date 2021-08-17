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
export default class WorkPlanRequests {
    static async deleteWorkPlan(submitProps) {
        let response = false

        await axios({
            method: 'delete',
            url:  Host() + 'work_plan/'+submitProps.pk,
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
    static async fetchWorkPlan(pk) {
        let response = null
        await axios({
            method: 'get',
            url: Host() + 'work_plan/' + pk,
            headers: {'authorization': jwt}
        }).then(res => {
            response = res.data
        }).catch(error => {
            console.log(error)
        })
        return response
    }

    static async fetchStage(pk) {
        let response = null
        await axios({
            method: 'get',
            url: Host() + 'activity/' + pk,
            headers: {'authorization': jwt}
        }).then(res => {
            response = res.data
        }).catch(error => {
            console.log(error)
        })
        return response
    }
    static async deleteStage(submitProps) {
        let response = false

        await axios({
            method: 'delete',
            url:  Host() + 'activity/'+submitProps.pk,
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
    static async fetchGoal(pk) {
        let response = null
        await axios({
            method: 'get',
            url: Host() + 'work_plan_goal/' + pk,
            headers: {'authorization': jwt}
        }).then(res => {
            response = res.data
        }).catch(error => {
            console.log(error)
        })
        return response
    }

    static async submitInfrastructure(submitProps) {
        let response = false
        let data = {}
        data = Object.assign(data, submitProps.data)

        data.address = submitProps.data.latitude + ', ' + submitProps.data.longitude
        await axios({
            method: submitProps.create ? 'post' : 'put',
            url: submitProps.create ? Host() + 'infrastructure' : Host() + 'infrastructure/' + submitProps.pk,
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
        })
        return response
    }
    static async deleteInfrastructure(submitProps) {
        let response = false

        await axios({
            method: 'delete',
            url:  Host() + 'infrastructure/'+submitProps.pk,
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
    static async submitStatus(submitProps) {
        let response = false
        let data = {}
        data = Object.assign(data, submitProps.data)
        if (submitProps.create)
            data.update_date = new Date()
        await axios({
            method: submitProps.create ? 'post' : 'put',
            url: submitProps.create ? Host() + 'work_plan_status' : Host() + 'work_plan_status/' + submitProps.pk,
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
        })
        return response
    }
    static async deleteStatus(submitProps) {
        let response = false

        await axios({
            method: 'delete',
            url:  Host() + 'work_plan_status/'+submitProps.pk,
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
    static async submitGoal(submitProps) {

        let response = submitProps.create ? null : false


        await axios({
            method: submitProps.create ? 'post' : 'put',
            url: submitProps.create ? Host() + 'work_plan_goal' : Host() + 'work_plan_goal/' + submitProps.pk,
            headers: {'authorization': jwt},
            data: submitProps.data
        }).then(res => {
            submitProps.setStatus({
                type: 'success',
                message: res.status + ' - ' + res.statusText,
            })
            response = submitProps.create ? res.data.id : true
        }).catch(error => {
            submitProps.setStatus({
                type: 'error',
                message: error.message
            })
            console.log(error.response)
        })
        return response
    }


    static async submitComponent(submitProps) {
        let response = false

        await axios({
            method: submitProps.create ? 'post' : 'put',
            url: submitProps.create ? Host() + 'component' : Host() + 'component/' + submitProps.pk,
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
    static async deleteComponent(submitProps) {
        let response = false

        await axios({
            method: 'delete',
            url:  Host() + 'component/'+submitProps.pk,
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
    static async submitStage(submitProps) {

        let response = submitProps.create ? null : false


        await axios({
            method: submitProps.create ? 'post' : 'put',
            url: submitProps.create ? Host() + 'activity' : Host() + 'activity/' + submitProps.pk,
            headers: {'authorization': jwt},
            data: submitProps.data
        }).then(res => {
            submitProps.setStatus({
                type: 'success',
                message: res.status + ' - ' + res.statusText,
            })
            response = submitProps.create ? res.data.id : true
        }).catch(error => {
            submitProps.setStatus({
                type: 'error',
                message: error.message
            })
            console.log(error.response)
        })
        return response
    }

}


