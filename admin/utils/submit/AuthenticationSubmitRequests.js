import axios from "axios";
import PropTypes from 'prop-types'
import Cookies from "universal-cookie/lib";
import publicIp from "public-ip";
import Host from '../../utils/shared/Host'


const authProps = {
    email: PropTypes.string,
    password: PropTypes.string,
    locale: PropTypes.string,
    setError: PropTypes.func,
    setLoading: PropTypes.func
}

const cookies = new Cookies()
export default class AuthenticationSubmitRequests {
    static async authenticate(authProps) {
        authProps.setLoading(true)
        let ip = await publicIp.v4()
        let response = false

        await axios({
            method: 'post',
            url: Host() + 'authentication',
            data: {
                corporate_email: authProps.email,
                password: authProps.password,
                ip: ip,
                platform: navigator.platform,
                browser_version: navigator.appVersion,
                browser_engine: navigator.product,
                user_agent: navigator.userAgent
            }
        }).then(res => {
            cookies.set('jwt', res.data.token, {expires: new Date(res.data.exp)})
            response = true

        }).catch(error => {
            authProps.setError({
                error: true,
                message: error.message
            })

            authProps.setLoading(false)
        })

        return response
    }
}

