import PropTypes from 'prop-types'
import Cookies from "universal-cookie/lib";
import Host from "../components/apps/sap/utils/shared/Host";
import Requester from "../components/core/misc/requester/Requester";
// import {Requester} from "sis-aeb-core";
const cookies = new Cookies()
export default async function submitAuthentication(props) {
    let res = false

    await new Requester({
        package: {
            corporate_email: props.email,
            password: props.password,
            platform: navigator.platform,
            browser_version: navigator.appVersion,
            browser_engine: navigator.product,
            user_agent: navigator.userAgent
        },
        url: Host() + 'authentication',
        method: 'post',
        showSuccessAlert: true
    }).then(response => {
        cookies.set('jwt', response.data.token, {expires: new Date(response.data.exp)})
        res = true
    }).catch(e => {
        res = false
    })


    return res
}
submitAuthentication.propTypes = {
    email: PropTypes.string,
    password: PropTypes.string,
    locale: PropTypes.string,
}
