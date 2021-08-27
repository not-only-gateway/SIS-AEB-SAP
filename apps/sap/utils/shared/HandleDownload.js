var CryptoJS = require("crypto-js");

export default function HandleDownload(file, name) {
    let dataStr
    let downloadAnchorNode = document.createElement('a');

    const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(file), 'sdaoi213@*#78&*&*Edsah&(821j3kbkdas*((').toString();
    dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(ciphertext)

    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `${name}.sap`);
    document.body.appendChild(downloadAnchorNode)
    downloadAnchorNode.click()
    downloadAnchorNode.remove()
}