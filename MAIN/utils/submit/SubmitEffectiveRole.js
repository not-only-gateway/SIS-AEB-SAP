import axios from "axios";
import Host from "../shared/Host";
import PropTypes from "prop-types";
import Cookies from "universal-cookie/lib";

const cookies = new Cookies()
export default async function submitEffectiveRole(props) {
    let response = false
    props.data.authorization_token = cookies.get('authorization_token')

    await axios({
        method: props.create ? 'post' : 'put',
        url: props.create ? Host() + 'role/effective' : Host() + 'role/effective/' + props.pk,
        headers: cookies.get('jwt') !== undefined ? {'authorization': cookies.get('jwt')} : null,
        data: props.data
    }).then(res => {
        response = true
        props.setStatus({
            type: 'success',
            message: res.status + ' - ' + res.statusText,
        })
    }).catch(error => {
        props.setStatus({
            type: 'error',
            message: error.message,
        })
    })
    return response
}

submitEffectiveRole.propTypes = {
    pk: PropTypes.number,
    data: PropTypes.object,
    create: PropTypes.bool,
    setStatus: PropTypes.func
}