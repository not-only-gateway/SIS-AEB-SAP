import axios from "axios";
import Host from "../shared/Host";
import PropTypes from "prop-types";
import Cookies from "universal-cookie/lib";

const cookies = new Cookies()
export default async function submitContract(props) {
    let response = false
    let data = {}
    data = Object.assign(data, props.data)

    data.entity = data.entity !== null && data.entity !== undefined ? data.entity.id : null
    data.beginning_validity = new Date(data.beginning_validity.replaceAll('/', '-').replace(/(\d{2})-(\d{2})-(\d{4})/, "$3-$2-$1")).getTime()
    data.end_validity = new Date(data.end_validity.replaceAll('/', '-').replace(/(\d{2})-(\d{2})-(\d{4})/, "$3-$2-$1")).getTime()

    await axios({
        method: props.create ? 'post' : 'put',
        url: props.create ? Host() + 'contract' : Host() + 'contract/' + props.pk,
        headers: cookies.get('jwt') !== undefined ? {'authorization': cookies.get('jwt')} : null,
        data: data
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

submitContract.propTypes = {
    pk: PropTypes.number,
    data: PropTypes.object,
    create: PropTypes.bool,
    setStatus: PropTypes.func
}