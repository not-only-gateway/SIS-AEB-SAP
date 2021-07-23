import Host from "../../../admin/utils/shared/Host";
import axios from "axios";
import Cookies from "universal-cookie/lib";
import PropTypes from 'prop-types'

const jwt = (new Cookies()).get('jwt')

export default async function submitWorkPlan(props) {
    let response = props.create ? null : false
    let data = {}
    data = Object.assign(data, props.data)

    data.ted = props.data.ted.id

    await axios({
        method: props.create ? 'post' : 'put',
        url: props.create ? Host() + 'work_plan' : Host() + 'work_plan/' + props.pk,
        headers: {'authorization': jwt},
        data: data
    }).then(res => {
        props.setStatus({
            type: 'success',
            message: res.status + ' - ' + res.statusText,
        })
        response = props.create ? res.data : true
    }).catch(error => {
        props.setStatus({
            type: 'error',
            message: error.message
        })
    })
    return response
}

submitWorkPlan.propTypes = {
    pk: PropTypes.number,
    data: PropTypes.object,
    setStatus: PropTypes.func,
    create: PropTypes.bool
}