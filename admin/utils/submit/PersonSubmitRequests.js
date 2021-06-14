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

    static async  submitDocuments(personProps) {
        let response = false

        let data = {}
        data = Object.assign(data, personProps.data)
        data.authorization_token =  cookies.get('authorization_token')
        data.dispatch_date = new Date(personProps.data.dispatch_date).getTime()
        await axios({
            method: 'put',
            url: Host() + 'documents/' + personProps.personID,
            headers: cookies.get('jwt') !== undefined ? {'authorization': cookies.get('jwt')} : null,
            data: data
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

    static async submitPerson(personProps) {
        let data = {}
        data = Object.assign(data, personProps.data)

        const toBase64 = file => new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });

        let response = {
            status: false,
            id: undefined
        }

        if (typeof (data.image) !== 'string' && data.image !== null && data.image !== undefined) {
            data.image = await toBase64(data.image).catch(e => Error(e))
        } else
            data.removed_image = true

        await axios({
            method: data.id === undefined || data.id === null ? 'post' : 'put',
            url: data.id === undefined || data.id === null ? Host() + 'person' : Host() + 'person/' + personProps.personID,
            headers: {'authorization': (new Cookies()).get('jwt')},
            data: data
        }).then(res => {
            response = {
                status: true,
                id: res.data.id
            }
        }).catch(error => {
            personProps.setStatus({
                error: true,
                message: error.message
            })
            console.log(error)
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


