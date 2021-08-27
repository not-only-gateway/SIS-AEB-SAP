var CryptoJS = require("crypto-js");

export default async function HandleUpload(file) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader()
        fileReader.onload = event => {
            let response = CryptoJS.AES.decrypt(event.target.result, 'sdaoi213@*#78&*&*Edsah&(821j3kbkdas*((')
            response = response.toString(CryptoJS.enc.Utf8)
            resolve(JSON.parse(response));
        }
        fileReader.onerror = error => reject(error)
        fileReader.readAsText(file)
    })
}