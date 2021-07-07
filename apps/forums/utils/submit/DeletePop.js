import axios from "axios";
import Host from "../shared/Host";
import Cookies from "universal-cookie/lib";
import PropTypes from 'prop-types'

const cookies = new Cookies()
export default async function deletePop(props) {
    let response = false
    await axios({
        method: 'delete',
        url:  Host() + 'pop/' + props.id,
        headers: cookies.get('jwt') !== undefined ? {'authorization': cookies.get('jwt')} : null
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

deletePop.propTypes = {
    id: PropTypes.number,
    setStatus: PropTypes.func,

}