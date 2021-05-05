import axios from "axios";
import Host from "../shared/Host";
import Cookies from "universal-cookie/lib";
import PropTypes from 'prop-types'
const cookies = new Cookies()
export default async function submitAddress(props){
    let response = false
    props.data.authorization_token =  cookies.get('authorization_token')

    await axios({
        method: 'put',
        url: Host() + 'address/'+props.personID,
        headers: cookies.get('jwt') !== undefined ? {'authorization': cookies.get('jwt')} : null,
        data: props.data
    }).then(() => {
        response = true
    }).catch(error => {
        console.log(error)
    })
    return response
}

submitAddress.propTypes={
    personID: PropTypes.number,
    data: PropTypes.object
}