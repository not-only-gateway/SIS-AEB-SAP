import axios from "axios";
import Host from "../shared/Host";
import localIpUrl from "local-ip-url";
import {setAccessProfile, setCollaboration, setProfile, startDatabase} from "../shared/IndexedDB";
import PropTypes from 'prop-types'
import Cookies from "universal-cookie/lib";

const cookies = new Cookies()
export default async function signIn(props) {
    try {
        await axios({
            method: 'post',
            url: Host() + 'auth',
            data: {
                email: props.email,
                password: props.password,
                ip: localIpUrl('public'),
                platform: navigator.platform,
                browser_version: navigator.appVersion,
                browser_engine: navigator.product,
                user_agent: navigator.userAgent
            }
        }).then(async function (res) {
            startDatabase().catch(error => console.log(error))
            cookies.set('jwt', res.data.jwt, {expires: new Date(res.data.exp)})
            cookies.set('id', res.data.id, {expires: new Date(res.data.exp)})

            console.log(res.data)

            setProfile({
                id: res.data.profile.id,
                corporateEmail: res.data.profile.corporate_email,
                name: res.data.profile.name,
                birth: res.data.profile.birth,
                pic: res.data.profile.pic
            }).then(async function () {
                if (res.data.collaboration !== undefined && res.data.collaboration !== null){
                    await setCollaboration({
                        id: res.data.collaboration.id,
                        unityAcronym: res.data.collaboration.unity.acronym,
                        unityID: res.data.collaboration.unity.id
                    }).catch(error => console.log(error))
                    await setAccessProfile({
                        id: res.data.access_profile.id,
                        denomination: res.data.access_profile.denomination,
                        canCreatePerson: res.data.access_profile.can_create_person,
                        canUpdatePerson: res.data.access_profile.can_update_person,
                        canDeletePerson: res.data.access_profile.can_delete_person,
                        canCreateRole: res.data.access_profile.can_create_role,
                        canUpdateRole: res.data.access_profile.can_update_role,
                        canViewRole: res.data.access_profile.can_view_role,
                        canDeleteRole: res.data.access_profile.can_delete_role,
                        canCreateAccessProfile: res.data.access_profile.can_create_access_profile,
                        canUpdateAccessProfile: res.data.access_profile.can_update_access_profile,
                        canDeleteAccessProfile: res.data.access_profile.can_delete_access_profile,
                        canViewAccessLog: res.data.access_profile.can_view_access_log,
                        canViewActivityLog: res.data.access_profile.can_view_activity_log,
                        canCreateUnit: res.data.access_profile.can_create_unit,
                        canUpdateUnit: res.data.access_profile.can_update_unit,
                        canDeleteUnit: res.data.access_profile.can_delete_unit,
                        canCreateCollaboration: res.data.access_profile.can_create_collaboration,
                        canUpdateCollaboration: res.data.access_profile.can_update_collaboration,
                        canViewCollaboration: res.data.access_profile.can_view_collaboration,
                        canDeleteCollaboration: res.data.access_profile.can_delete_collaboration,
                        canUpdateLocation: res.data.access_profile.can_update_location,
                        canViewLocation: res.data.access_profile.can_view_location,
                        canUpdateDocuments: res.data.access_profile.can_update_documents,
                        canViewDocuments: res.data.access_profile.can_view_documents,
                        canUpdateContact: res.data.access_profile.can_update_contact,
                        canViewContact: res.data.access_profile.can_view_contact
                    }).catch(error => console.log(error))
                }
                props.router.push('/', '/', {locale: props.locale}).catch(error => console.log(error))
            }).catch(error => console.log(error))
        }).catch(error => {
            console.log(error)
        })
    } catch (error) {
        console.log(error)
    }
}
signIn.propTypes = {
    email: PropTypes.string,
    password: PropTypes.string,
    router: PropTypes.func,
    locale: PropTypes.string
}