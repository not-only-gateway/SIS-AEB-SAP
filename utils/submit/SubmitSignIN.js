import axios from "axios";
import Host from "../shared/Host";
import {setAccessProfile, setCollaboration, setProfile, startDatabase} from "../shared/IndexedDB";
import PropTypes from 'prop-types'
import Cookies from "universal-cookie/lib";
import publicIp from "public-ip";

const cookies = new Cookies()
export default async function submitSignIN(props) {
    let ip = await publicIp.v4()
    let response = false
    try {
        await axios({
            method: 'post',
            url: Host() + 'authentication',
            data: {
                corporate_email: props.email,
                password: props.password,
                ip: ip,
                platform: navigator.platform,
                browser_version: navigator.appVersion,
                browser_engine: navigator.product,
                user_agent: navigator.userAgent
            }
        }).then(async function (res) {
            startDatabase().catch(error => console.log(error))
            cookies.set('jwt', res.data.jwt, {expires: new Date(res.data.exp)})
            cookies.set('exp', res.data.exp, {expires: new Date(res.data.exp)})
            response = true

            if (res.data.collaboration !== undefined && res.data.collaboration !== null) {
                await setCollaboration({
                    id: res.data.collaboration.id,
                    unitAcronym: res.data.collaboration.unit_acronym,
                    roleInformation: res.data.collaboration.role_information
                }).catch(error => console.log(error))
                await setAccessProfile({
                    id: res.data.access_profile.id,
                    denomination: res.data.access_profile.denomination,
                    canCreatePerson: res.data.access_profile.can_create_person,
                    canUpdatePerson: res.data.access_profile.can_update_person,
                    canDeletePerson: res.data.access_profile.can_delete_person,

                    canManageStructure: res.data.access_profile.can_manage_structure,
                    canManageMembership: res.data.access_profile.can_manage_membership,

                }).catch(error => console.log(error))
            }

        }).catch(error => {
            props.setError({
                error: true,
                message: error.message
            })
        })

    } catch (error) {
        props.setError({
            error: true,
            message: error.message
        })
    }
    return response
}
submitSignIN.propTypes = {
    email: PropTypes.string,
    password: PropTypes.string,
    locale: PropTypes.string,
    setError: PropTypes.func
}