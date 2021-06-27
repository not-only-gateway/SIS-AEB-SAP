import axios from "axios";
import Host from "../shared/Host";
import Cookies from "universal-cookie/lib";
import PropTypes from "prop-types";

const cookies = new Cookies()

export default async function submitDocuments(props) {
    let response = false

    let data = {}
    data = Object.assign(data, props.data)

    if (typeof (data.dispatch_date) === 'string')
        data.dispatch_date = new Date(data.dispatch_date.replaceAll('/', '-').replace(/(\d{2})-(\d{2})-(\d{4})/, "$3-$2-$1")).getTime()
    data.person = props.pk
    await axios({
        method: 'put',
        url: Host() + 'documents/person',
        headers: cookies.get('jwt') !== undefined ? {'authorization': cookies.get('jwt')} : null,
        data: data
    }).then(res => {
        props.setStatus({
            type: 'success',
            message: res.status + ' - ' + res.statusText,
        })
        response = true

    }).catch(error => {
        props.setStatus({
            type: 'error',
            message: error.message
        })
    })
    return response
}
submitDocuments.propTypes = {
    pk: PropTypes.number,
    data: PropTypes.object,
    setStatus: PropTypes.func
}