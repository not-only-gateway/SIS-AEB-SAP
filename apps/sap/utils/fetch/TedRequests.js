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
export default class TedRequests {
    static async fetchTed(pk) {
        let response = null
        await axios({
            method: 'get',
            url: Host() + 'ted/' + pk,
            headers: {'authorization': jwt}
        }).then(res => {
            response = res.data
        }).catch(error => {
            console.log(error.request)
        })
        return response
    }

    static async submitTed(submitProps) {
        let response = submitProps.create ? null : false

        await axios({
            method: submitProps.create ? 'post' : 'put',
            url: submitProps.create ? Host() + 'ted' : Host() + 'ted/' + submitProps.pk,
            headers: {'authorization': jwt},
            data: submitProps.data
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
        })
        return response
    }

    static async submitAddendum(submitProps) {
        let response = false
        console.log(submitProps.data)
        await axios({
            method: submitProps.create ? 'post' : 'put',
            url: submitProps.create ? Host() + 'addendum' : Host() + 'addendum/' + submitProps.pk,
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


