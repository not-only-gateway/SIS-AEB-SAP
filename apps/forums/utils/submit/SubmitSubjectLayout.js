import axios from "axios";
import Host from "../shared/Host";
import Cookies from "universal-cookie/lib";
import PropTypes from 'prop-types'

const cookies = new Cookies()
export default async function submitSubjectLayout(props) {
    let response = false
    let data = []

    props.data.map(pop => data = [...data, ...[{x: pop.x,y: pop.y,id: pop.id}]])
    console.log({
        subject: props.subject,
        pops: data
    })
    await axios({
        method:  'put',
        url: Host() + 'layout/subject',
        headers: {'authorization': cookies.get('jwt')},
        data: {
            subject: props.subject,
            pops: data
        }
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
    subject: PropTypes.any,
    data: PropTypes.array,
    setStatus: PropTypes.func
}