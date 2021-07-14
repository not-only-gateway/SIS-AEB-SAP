import PropTypes from "prop-types"
// import hmacSHA512  from 'crypto-js/hmac-sha512'

var CryptoJS = require("crypto-js");
export default function HandleDownload(props){
    let newData = {...props.data}
    let newNodes = []
    let newGroups = []
    newData.nodes.map(node => {
        const element = document.getElementById(node.id+'-node')
        let newNode = {...node}

        if(element !== null) {
            newNode.placement.x = element.offsetLeft
            newNode.placement.y = element.offsetTop
            newNodes.push(newNode)
        }
    })
    newData.groups.map((group, index) => {
        const element = document.getElementById('group-' + index)
        let newGroup = {...group}

        if(element !== null) {
            newGroup.placement.x = element.offsetLeft
            newGroup.placement.y = element.offsetTop
            newGroups.push(newGroup)
        }
    })

    newData.dimensions.width = props.root.offsetWidth
    newData.dimensions.height = props.root.offsetHeight

    newData.groups = newGroups
    newData.nodes = newNodes

    const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(newData), 'sdaoi213@*#78&*&*Edsah&(821j3kbkdas*((').toString();

    let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(ciphertext);
    let downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `${props.data.subject}.json`);
    document.body.appendChild(downloadAnchorNode)
    downloadAnchorNode.click()
    downloadAnchorNode.remove()

    props.handleDownload(ciphertext)

}
HandleDownload.propTypes={
    data: PropTypes.object,
    handleDownload: PropTypes.func,
    root: PropTypes.object
}

