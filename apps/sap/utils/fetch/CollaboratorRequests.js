import PropTypes from 'prop-types'
import axios from "axios";
import Host from "../shared/Host";
import Cookies from "universal-cookie/lib";

const memberProps = {
    id: PropTypes.number
}
const byPersonProps = {

    setStatus: PropTypes.func,
    personID: PropTypes.number
}
const cookies = new Cookies()

export default class CollaboratorRequests {
    static async fetchMemberByToken() {
        let response = null

        await axios({
            method: 'get',
            url: Host() + 'token/collaborator',
            headers: cookies.get('jwt') !== undefined ? {'authorization': cookies.get('jwt')} : null,
        }).then(res => {
            response = res.data
        }).catch(error => {
            console.log(error)
        })
        return response
    }

    static async fetchLinkage(collaboratorID) {
        let response = null
        await axios({
            method: 'get',
            url: Host() + 'linkage/' + collaboratorID,
            headers: cookies.get('jwt') !== undefined ? {'authorization': cookies.get('jwt')} : null
        }).then(res => {
            response = res.data
        }).catch(error => {
            console.log(error)
        })
        return response
    }

}


