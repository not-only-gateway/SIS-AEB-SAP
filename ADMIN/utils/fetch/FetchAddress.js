import axios from "axios";
import Host from "../shared/Host";
import Cookies from "universal-cookie/lib";
import PropTypes from "prop-types";

const cookies = new Cookies()
export default async function fetchAddress(props){
    let response = null
    await axios({
        method: 'get',
        url: Host() + 'person/address/'+props.personID,
        headers: cookies.get('jwt') !== undefined ? {'authorization': cookies.get('jwt')} : null,
    }).then(res => {
        response = res.data
    }).catch(error => {
        if(props.setStatus !== undefined)
            props.setStatus({
                error: true,
                message: error.message
            })

    })
    return response
}
fetchAddress.propTypes ={
    personID: PropTypes.number,
    setStatus: PropTypes.func
}