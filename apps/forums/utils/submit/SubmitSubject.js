import axios from "axios";
import Host from "../shared/Host";
import Cookies from "universal-cookie/lib";
import PropTypes from 'prop-types'

const cookies = new Cookies()
export default async function submitSubject(props) {
    let response ={
        id: props.pk,
        status: false
    }

    await axios({
        method: props.create ? 'post' : 'put',
        url: props.create ? Host() + 'subject' : Host() + 'subject/' + props.pk,
        headers: cookies.get('jwt') !== undefined ? {'authorization': cookies.get('jwt')} : null,
        data: props.data
    }).then(res => {
        response ={
            id: res.data.data,
            status: true
        }
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

submitSubject.propTypes = {
    pk: PropTypes.number,
    data: PropTypes.object,
    setStatus: PropTypes.func,
    create: PropTypes.bool
}