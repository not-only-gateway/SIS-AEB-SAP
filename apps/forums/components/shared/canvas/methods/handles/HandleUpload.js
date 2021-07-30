import PropTypes from "prop-types"
// import hmacSHA512  from 'crypto-js/hmac-sha512'

var CryptoJS = require("crypto-js");
export default function HandleUpload(props) {
    try {
        let reader = new FileReader()
        reader.onload = newData => {
            // const response = CryptoJS.AES.decrypt(newData.target.result, 'sdaoi213@*#78&*&*Edsah&(821j3kbkdas*((')
            // response.toString(CryptoJS.enc.Utf8)
            const data = JSON.parse(newData.target.result)

            props.setData(data)
        };
        reader.readAsText(props.file.target.files[0]);
    } catch (error) {
        console.log(error)
    }

}
HandleUpload.propTypes = {
    file: PropTypes.object,
    setData: PropTypes.func,
    renderNodes: PropTypes.func
}

