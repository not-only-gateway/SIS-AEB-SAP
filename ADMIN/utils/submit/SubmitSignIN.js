import axios from "axios";
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
            url: 'http://localhost:8000/api/authentication',
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
            cookies.set('jwt', res.data)
            response = true
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