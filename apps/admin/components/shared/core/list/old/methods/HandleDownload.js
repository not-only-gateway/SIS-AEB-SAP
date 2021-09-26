import React from 'react'
export default function HandleDownload(data, name){
    let dataStr
    let downloadAnchorNode = document.createElement('a');

    dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data))

    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `${name}.json`);
    document.body.appendChild(downloadAnchorNode)
    downloadAnchorNode.click()
    downloadAnchorNode.remove()


}
