import axios from "axios";
import Host from "../shared/Host";
import Cookies from "universal-cookie/lib";
import PropTypes from "prop-types";

const cookies = new Cookies()

export default async function submitAddress(props) {
    let response = false
    let data = {}
    data = Object.assign(data, props.data)
    if (props.type === 'person')
        data.person = props.pk

    await axios({
        method: 'put',
        url: Host() + 'address/' + props.type + '/' + props.pk,
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
submitAddress.propTypes = {
    pk: PropTypes.number,
    data: PropTypes.object,
    setStatus: PropTypes.func,
    type: PropTypes.oneOf(['person', 'unit'])
}