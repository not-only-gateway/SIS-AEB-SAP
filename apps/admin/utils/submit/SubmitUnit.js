import axios from "axios";
import Host from "../shared/Host";
import Cookies from "universal-cookie/lib";
import PropTypes from 'prop-types'

const cookies = new Cookies()
export default async function submitUnit(props) {
    let response = false
    let data = {}
    data = Object.assign(data, props.data)
    console.log(props.data)

    data.parent_entity = props.data.parent_entity.id
    data.parent_unit = props.data.parent_unit !== undefined && props.data.parent_unit !== null ? props.data.parent_unit.id : null
    await axios({
        method: props.create ? 'post' : 'put',
        url: props.create ? Host() + 'unit' : Host() + 'unit/' + props.pk,
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

submitUnit.propTypes = {
    pk: PropTypes.number,
    data: PropTypes.object,
    setStatus: PropTypes.func,
    create: PropTypes.bool
}