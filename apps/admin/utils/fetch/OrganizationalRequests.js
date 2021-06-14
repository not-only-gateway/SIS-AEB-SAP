import PropTypes from 'prop-types'
import axios from "axios";
import Host from "../shared/Host";
import Cookies from "universal-cookie/lib";

const cookies = new Cookies()

export default class OrganizationalRequests {
    static async fetchLinkages() {
        let response = []

        await axios({
            method: 'get',
            url: Host() + 'list/linkage',
            headers: (new Cookies()).get('jwt') !== undefined ? {'authorization': (new Cookies()).get('jwt')} : null,
        }).then(res => {
            response = res.data
        }).catch(error => {
            console.log(error)
        })
        return response
    }

    static async fetchEffectiveRoles() {
        let response = []

        await axios({
            method: 'get',
            url: Host() + 'list/effective_role',
            headers: (new Cookies()).get('jwt') !== undefined ? {'authorization': (new Cookies()).get('jwt')} : null,
        }).then(res => {
            response = res.data
        }).catch(error => {
            console.log(error)
        })
        return response
    }

    static async fetchCommissionedRoles() {
        let response = []
        await axios({
            method: 'get',
            url: Host() + 'list/commissioned_role',
            headers: (new Cookies()).get('jwt') !== undefined ? {'authorization': (new Cookies()).get('jwt')} : null,
        }).then(res => {
            response = res.data
        }).catch(error => {
            console.log(error)
        })
        return response
    }

    static async fetchAccessProfile(pk) {
        let response = {}
        await axios({
            method: 'get',
            url: Host() + 'access/' + pk,
            headers: (new Cookies()).get('jwt') !== undefined ? {'authorization': (new Cookies()).get('jwt')} : null,
            params: {
                authorization_token: (new Cookies()).get('authorization_token')
            }
        }).then(res => {
            response = res.data
        }).catch(error => {
            console.log(error)
        })
        return response
    }

    static async fetchAccessProfiles() {
        let response = []
        await axios({
            method: 'get',
            url: Host() + 'list/access',
            headers: (new Cookies()).get('jwt') !== undefined ? {'authorization': (new Cookies()).get('jwt')} : null,
        }).then(res => {
            response = res.data
        }).catch(error => {
            console.log(error)
        })
        return response
    }


}


