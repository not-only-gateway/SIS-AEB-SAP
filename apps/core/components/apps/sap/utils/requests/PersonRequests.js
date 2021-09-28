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
            response = res.data
        }).catch(error => {
            console.log(error)
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


