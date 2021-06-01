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
        url: Host() + 'person/address/'+props.subjectID,
        headers: cookies.get('jwt') !== undefined ? {'authorization': cookies.get('jwt')} : null,
        data: props.data
    }).then(() => {
        response = true
    }).catch(error => {
        if(props.setStatus !== null)
            props.setStatus({
                error: true,
                message: error.message
            })
    })
    return response
}

submitAddress.propTypes={
    subjectID: PropTypes.number,
    data: PropTypes.object,
    setStatus: PropTypes.func

}