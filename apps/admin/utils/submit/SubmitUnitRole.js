import axios from "axios";
import Host from "../shared/Host";
import PropTypes from "prop-types";
import Cookies from "universal-cookie/lib";

export default async function submitUnitRole(props) {
    let response = false
    let data = {}
    data = Object.assign(data, props.data)

    data.unit = props.data.unit.id
    data.role = props.data.role.id
    await axios({
        method: props.create ? 'post' : 'put',
        url: props.create ? Host() + 'vacancy' : Host() + 'vacancy/' + props.pk,
        headers: {'authorization': (new Cookies()).get('jwt')},
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

submitUnitRole.propTypes = {
    pk: PropTypes.number,
    data: PropTypes.object,
    setStatus: PropTypes.func,
    create: PropTypes.bool
}