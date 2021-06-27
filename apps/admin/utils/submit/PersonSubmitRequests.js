import PropTypes from 'prop-types'
import axios from "axios";
import Host from "../shared/Host";
import Cookies from "universal-cookie/lib";

const personProps={
    personID: PropTypes.number,
    data: PropTypes.object,
    setStatus: PropTypes.func
}
const cookies = new Cookies()

export default class PersonSubmitRequests{
    static async submitContacts(personProps){
        let response = false
        await axios({
            method: 'put',
            url: Host() + 'contact/'+personProps.personID,
            headers: cookies.get('jwt') !== undefined ? {'authorization': cookies.get('jwt')} : null,
            data: personProps.data
        }).then(() => {
            response = true
        }).catch(error => {
            personProps.setStatus({
                error: true,
                message: error.message
            })
        })
        return response
    }



    static async  submitAddress(personProps){
        let response = false

        await axios({
            method: 'put',
            url: Host() + 'person/address/'+personProps.subjectID,
            headers: cookies.get('jwt') !== undefined ? {'authorization': cookies.get('jwt')} : null,
            data: personProps.data
        }).then(() => {
            response = true
        }).catch(error => {
            if(personProps.setStatus !== null && personProps.setStatus !== undefined)
                personProps.setStatus({
                    error: true,
                    message: error.message
                })
        })
        return response
    }

}


