import axios from "axios";
import Host from "../shared/Host";
import Cookies from "universal-cookie/lib";
import PropTypes from 'prop-types'

const cookies = new Cookies()
export default async function submitLinkage(props) {
    let response = false
    let data = {}
    data = Object.assign(data, props.data)
    data.collaborator = props.collaboratorID
    if(props.data.contract !== null && props.data.contract !== undefined)
        data.contract = props.data.contract.id
    if(props.data.effective_role !== null && props.data.effective_role !== undefined)
        data.effective_role = props.data.effective_role.id
    if(props.data.vacancy !== null && props.data.vacancy !== undefined)
        data.vacancy = props.data.vacancy.id

    await axios({
        method: props.create ? 'post' : 'put',
        url: props.create ? Host() + 'linkage' : Host() + 'linkage/' + props.pk,
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

submitLinkage.propTypes = {
    pk: PropTypes.number,
    data: PropTypes.object,
    setStatus: PropTypes.func,
    create: PropTypes.bool,
    collaboratorID: PropTypes.number
}