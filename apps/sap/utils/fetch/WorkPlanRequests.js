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
    static async submitInfrastructure(submitProps) {
        let response = false

        await axios({
            method: submitProps.create ? 'post' : 'put',
            url: submitProps.create ? Host() + 'infrastructure' : Host() + 'infrastructure/' + submitProps.pk,
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
    static async submitStatus(submitProps) {
        let response = false

        await axios({
            method: submitProps.create ? 'post' : 'put',
            url: submitProps.create ? Host() + 'status' : Host() + 'status/' + submitProps.pk,
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
    static async submitGoal(submitProps) {
        let response = false

        await axios({
            method: submitProps.create ? 'post' : 'put',
            url: submitProps.create ? Host() + 'goal' : Host() + 'goal/' + submitProps.pk,
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

}


