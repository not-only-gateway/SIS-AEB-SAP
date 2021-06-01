import axios from "axios";
import Host from "../shared/Host";
import Cookies from "universal-cookie/lib";
import PropTypes from 'prop-types'

const cookies = new Cookies()
export default async function submitDocuments(props) {
    let response = false

    let data = {}
    data = Object.assign(data, props.data)
    data.authorization_token =  cookies.get('authorization_token')
    data.dispatch_date = new Date(props.data.dispatch_date).getTime()
    await axios({
        method: 'put',
        url: Host() + 'documents/' + props.personID,
        headers: cookies.get('jwt') !== undefined ? {'authorization': cookies.get('jwt')} : null,
        data: data
    }).then(() => {
        response = true
    }).catch(error => {
        console.log(error)
    })
    return response
}

submitDocuments.propTypes = {
    personID: PropTypes.number,
    data: PropTypes.object
}