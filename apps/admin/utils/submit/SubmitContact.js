import axios from "axios";
import Host from "../shared/Host";
import Cookies from "universal-cookie/lib";
import PropTypes from "prop-types";

const cookies = new Cookies()

export default async function submitContact(props) {
    let response = false
    let data = {}
    data = Object.assign(data, props.data)

    data.person = props.pk
    await axios({
        method: 'put',
        url: Host() + 'contact/person',
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
submitContact.propTypes = {
    pk: PropTypes.number,
    data: PropTypes.object,
    setStatus: PropTypes.func
}