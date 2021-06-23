import PropTypes from 'prop-types'
import axios from "axios";
import Host from "../shared/Host";
import Cookies from "universal-cookie/lib";

const collaborationProps =  {
    setLoading: PropTypes.func,
    collaborationID: PropTypes.number
}
const seniorsProps =  {
    memberID: PropTypes.number,
    unitID: PropTypes.number

}

const cookies = new Cookies()

export default class CollaborationRequests{
    static async fetchDependentCollaborators(pk) {
        let response = []
        await axios({
            method: 'get',
            url: Host() + 'unit/collaborator/' + pk,
            headers: cookies.get('jwt') !== undefined ? {'authorization': cookies.get('jwt')} : null,
        }).then(res => {
            response = res.data
        }).catch(error => {
            console.log(error)
        })
        return response
    }

    static async fetchCollaborationList(){
        let response = []
        await axios({
            method: 'get',
            url: Host() + 'list/collaboration/'+memberID,
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

    static async fetchSeniors(seniorsProps) {
        let response = []

        await axios({
            method: 'get',
            url: Host() + 'list/senior',
            headers: cookies.get('jwt') !== undefined ? {'authorization': cookies.get('jwt')} : null,
            params: {
                authorization_token: cookies.get('authorization_token'),
                member_id: seniorsProps.memberID,
                unit_id: seniorsProps.unitID
            }
        }).then(res => {
            response = res.data
        }).catch(error => {
            console.log(error)
        })
        return response
    }

    static async  fetchTopCollaborators() {
        let response = []
        await axios({
            method: 'get',
            url: Host() + 'top/collaborator',
            headers: cookies.get('jwt') !== undefined ? {'authorization': cookies.get('jwt')} : null,
        }).then(res => {
            console.log(res)
            response = res.data
        }).catch(error => {
            console.log(error)
        })
        return response
    }

}


