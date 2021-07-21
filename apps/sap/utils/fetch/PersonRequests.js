import PropTypes from 'prop-types'
import axios from "axios";
import Host from "../shared/Host";
import Cookies from "universal-cookie/lib";

const peopleProps = {
    data: PropTypes.array,
    setData: PropTypes.func,

    searchInput: PropTypes.string,
    maxID: PropTypes.number,
    setMaxID: PropTypes.func,
    setLastFetchedSize: PropTypes.func
}
const personProps = {
    personID: PropTypes.number,
    setStatus: PropTypes.func
}
const cookies = new Cookies()

export default class PersonRequests {
    static async fetchPerson(personProps) {
        let response = null
        await axios({
            method: 'get',
            url: Host() + 'person/' + personProps.personID,
            headers: cookies.get('jwt') !== undefined ? {'authorization': cookies.get('jwt')} : null,
            params: {
                authorization_token: cookies.get('authorization_token')
            }
        }).then(res => {
            console.log(res.data)
            response = res.data
        }).catch(error => {
            personProps.setStatus({
                error: true,
                message: error.message
            })
            console.log(error)
        })
        return response
    }

    static async fetchPeople(peopleProps) {

        await axios({
            method: 'get',
            url: Host() + 'list/person',
            headers: cookies.get('jwt') !== undefined ? {'authorization': cookies.get('jwt')} : null,
            params: {
                authorization_token: cookies.get('authorization_token'),
                max_id: peopleProps.maxID,
                searchInput: peopleProps.searchInput && peopleProps.searchInput.length > 0 ? peopleProps.searchInput : null
            }
        }).then(res => {
            if (peopleProps.maxID === null)
                peopleProps.setData(res.data)
            else
                peopleProps.setData([...peopleProps.data, ...res.data])

            if (res.data.length > 0)
                peopleProps.setMaxID(res.data[res.data.length - 1].id)

            peopleProps.setLastFetchedSize(res.data.length)
        }).catch(error => {
            console.log(error)
        })

    }

    static async fetchDocuments(personProps) {
        let response = null
        await axios({
            method: 'get',
            url: Host() + 'documents/person/' + personProps.personID,
            headers: cookies.get('jwt') !== undefined ? {'authorization': cookies.get('jwt')} : null,
            params: {
                authorization_token: cookies.get('authorization_token')
            }
        }).then(res => {
            response = res.data
        }).catch(error => {
            if (personProps.setStatus !== undefined)
                personProps.setStatus({
                    error: true,
                    message: error.message
                })
        })
        return response
    }

    static async fetchContacts(personProps) {
        let response = null
        await axios({
            method: 'get',
            url: Host() + 'contact/person/' + personProps.personID,
            headers: cookies.get('jwt') !== undefined ? {'authorization': cookies.get('jwt')} : null,
            params: {
                authorization_token: cookies.get('authorization_token')
            }
        }).then(res => {
            response = res.data
        }).catch(error => {
            if (personProps.setStatus !== undefined)
                personProps.setStatus({
                    error: true,
                    message: error.message
                })
        })
        return response
    }

    static async fetchAddress(personProps){
        let response = null
        await axios({
            method: 'get',
            url: Host() + 'address/person/'+personProps.personID,
            headers: cookies.get('jwt') !== undefined ? {'authorization': cookies.get('jwt')} : null,
        }).then(res => {
            response = res.data
        }).catch(error => {
            if(personProps.setStatus !== undefined)
                personProps.setStatus({
                    error: true,
                    message: error.message
                })

        })
        return response
    }

    static async FetchImage(url){
        let response = null
        await axios({
            method: 'get',
            url: Host() + 'image/person',
            headers: cookies.get('jwt') !== undefined ? {'authorization': cookies.get('jwt')} : null,
            params: {
                url: url
            }
        }).then(res => {
            response = res.data

        }).catch(error => {
            console.log(error)
        })
        return response
    }
}


