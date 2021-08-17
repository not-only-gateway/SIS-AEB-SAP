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
export default class OperationRequests {

    static async submitOperation(submitProps) {
        let response = submitProps.create ? null : false
        let data = {}
        data = Object.assign(data, submitProps.data)
        console.log(data)
        if (typeof data.activity_stage === 'object')
            data.activity_stage = data.activity_stage.id

        await axios({
            method: submitProps.create ? 'post' : 'put',
            url: submitProps.create ? Host() + 'operation_phase' : Host() + 'operation_phase/' + submitProps.pk,
            headers: {'authorization': jwt},
            data: data
        }).then(res => {
            submitProps.setStatus({
                type: 'success',
                message: res.status + ' - ' + res.statusText,
            })
            response = submitProps.create ? res.data : true
        }).catch(error => {
            submitProps.setStatus({
                type: 'error',
                message: error.message
            })
            console.log(error.request)
        })
        return response
    }

    static async submitNote(submitProps) {
        let response = false
        console.log(submitProps.data)
        await axios({
            method: submitProps.create ? 'post' : 'put',
            url: submitProps.create ? Host() + 'note' : Host() + 'note/' + submitProps.pk,
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
        })
        return response
    }

    static async submitFollowUpGoal(submitProps) {
        console.log(submitProps)
        let response = false
        await axios({
            method: submitProps.create ? 'post' : 'put',
            url: submitProps.create ? Host() + 'follow_up_goal' : Host() + 'follow_up_goal/' + submitProps.pk,
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
            console.log(error.requests)
        })
        return response
    }
    static async deleteOperation(submitProps) {
        let response = false

        await axios({
            method: 'delete',
            url:  Host() + 'operation_phase/'+submitProps.pk,
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
    static async deleteAction(submitProps) {
        let response = false

        await axios({
            method: 'delete',
            url:  Host() + 'action/'+submitProps.pk,
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
    static async deleteFollowUpGoal(submitProps) {
        let response = false

        await axios({
            method: 'delete',
            url:  Host() + 'follow_up_goal/'+submitProps.pk,
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
    static async submitExecution(submitProps) {
        let response = false
        await axios({
            method: submitProps.create ? 'post' : 'put',
            url: submitProps.create ? Host() + 'execution' : Host() + 'execution/' + submitProps.pk,
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
    static async deleteExecution(submitProps) {
        let response = false

        await axios({
            method: 'delete',
            url:  Host() + 'execution/'+submitProps.pk,
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
    static async deleteNote(submitProps) {
        let response = false

        await axios({
            method: 'delete',
            url:  Host() + 'note/'+submitProps.pk,
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


