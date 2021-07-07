import axios from "axios";
import Host from "../shared/Host";
import Cookies from "universal-cookie/lib";
import PropTypes from 'prop-types'

const cookies = new Cookies()
export default async function submitSubjectLayout(props) {
    let response = false
    console.log(props.data)
    await axios({
        method:  'put',
        url: Host() + 'layout/subject/' + props.data.id,
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
            message: error.message
        })
    })
    return response
}

submitSubjectLayout.propTypes = {
    data: PropTypes.object,
    setStatus: PropTypes.func,
    create: PropTypes.bool
}