import PropTypes from 'prop-types'
import axios from "axios";
import Host from "../shared/Host";
import Cookies from "universal-cookie/lib";

const memberProps = {
    memberID: PropTypes.number,
    setStatus: PropTypes.func,
}
const byPersonProps = {

    setStatus: PropTypes.func,
    personID: PropTypes.number
}
const cookies = new Cookies()

export default class MemberRequests {
    static async fetchMemberByToken() {
        let response = null

        await axios({
            method: 'get',
            url: Host() + 'profile/member',
            headers: cookies.get('jwt') !== undefined ? {'authorization': cookies.get('jwt')} : null,
        }).then(res => {
            response = res.data
        }).catch(error => {
            console.log(error)
        })
        return response
    }

    static async fetchMemberByPerson(byPersonProps) {
        let response = null
        await axios({
            method: 'get',
            url: Host() + 'person/member/' + props.personID,
            headers: cookies.get('jwt') !== undefined ? {'authorization': cookies.get('jwt')} : null,
        }).then(res => {
            response = res.data
        }).catch(error => {
            if (byPersonProps.setStatus !== undefined)
                byPersonProps.setStatus({
                    error: true,
                    message: error.message
                })
        })
        return response
    }

    static async fetchMember(memberProps) {
        let response = null
        await axios({
            method: 'get',
            url: Host() + 'member/' + memberProps.memberID,
            headers: cookies.get('jwt') !== undefined ? {'authorization': cookies.get('jwt')} : null,
        }).then(res => {
            response = res.data
        }).catch(error => {
            memberProps.setStatus({
                error: true,
                message: error.message
            })
        })
        return response
    }
}


