import axios from "axios";
import Host from "../shared/Host";
import Cookies from "universal-cookie/lib";
import PropTypes from "prop-types";

const cookies = new Cookies()

const listProps = {
    data: PropTypes.array,
    setData: PropTypes.func,

    searchInput: PropTypes.string,
    maxID: PropTypes.number,
    setMaxID: PropTypes.func
}


export default class OrganizationalRequests {
    static async fetchContractualLinkages(listProps) {

        await axios({
            method: 'get',
            url: Host() + 'list/linkage/contractual',
            headers: cookies.get('jwt') !== undefined ? {'authorization': cookies.get('jwt')} : null,
            params: {
                authorization_token: cookies.get('authorization_token'),
                max_id: listProps.maxID,
                searchInput: listProps.searchInput && listProps.searchInput.length > 0 ? listProps.searchInput : null
            }
        }).then(res => {
            if (listProps.maxID === null)
                listProps.setData(res.data)
            else
                listProps.setData([...listProps.data, ...res.data])

            if (res.data.length > 0)
                listProps.setMaxID(res.data[res.data.length - 1].id)

        }).catch(error => {
            console.log(error)
        })
    }

    static async fetchCommissionedLinkages(listProps) {

        await axios({
            method: 'get',
            url: Host() + 'list/linkage/commissioned',
            headers: cookies.get('jwt') !== undefined ? {'authorization': cookies.get('jwt')} : null,
            params: {
                authorization_token: cookies.get('authorization_token'),
                max_id: listProps.maxID,
                searchInput: listProps.searchInput && listProps.searchInput.length > 0 ? listProps.searchInput : null
            }
        }).then(res => {
            if (listProps.maxID === null)
                listProps.setData(res.data)
            else
                listProps.setData([...listProps.data, ...res.data])

            if (res.data.length > 0)
                listProps.setMaxID(res.data[res.data.length - 1].id)

        }).catch(error => {
            console.log(error)
        })
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

    //
    // static async fetchAccessProfiles() {
    //     let response = []
    //     await axios({
    //         method: 'get',
    //         url: Host() + 'list/access',
    //         headers: (new Cookies()).get('jwt') !== undefined ? {'authorization': (new Cookies()).get('jwt')} : null,
    //     }).then(res => {
    //         response = res.data
    //     }).catch(error => {
    //         console.log(error)
    //     })
    //     return response
    // }


}


