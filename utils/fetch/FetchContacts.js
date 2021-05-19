import axios from "axios";
import Host from "../shared/Host";
import Cookies from "universal-cookie/lib";
import PropTypes from "prop-types";
import fetchDocuments from "./FetchDocuments";

const cookies = new Cookies()
export default async function fetchContacts(props){
    let response = null
    await axios({
        method: 'get',
        url: Host() + 'contact/'+props.personID,
        headers: cookies.get('jwt') !== undefined ? {'authorization': cookies.get('jwt')} : null,
        params:{
            authorization_token: cookies.get('authorization_token')
        }
    }).then(res => {
        response = res.data
    }).catch(error => {
        props.setStatus({
            error: true,
            message: error.message
        })
        console.log(error)
    })
    return response
}
fetchContacts.propTypes ={
    personID: PropTypes.number,
    setStatus: PropTypes.func
}