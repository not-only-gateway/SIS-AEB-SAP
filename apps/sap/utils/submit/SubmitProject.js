import Host from "../../../admin/utils/shared/Host";
import axios from "axios";
import Cookies from "universal-cookie/lib";
import PropTypes from 'prop-types'

const jwt = (new Cookies()).get('jwt')

export default async function submitProject(props) {
    let response = false

    console.log(props.data)
    await axios({
        method: props.create ? 'post' : 'put',
        url: props.create ? Host() + 'project' : Host() + 'project/' + props.pk,
        headers: {'authorization': jwt},
        data: props.data
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

submitProject.propTypes = {
    pk: PropTypes.number,
    data: PropTypes.object,
    setStatus: PropTypes.func,
    create: PropTypes.bool
}