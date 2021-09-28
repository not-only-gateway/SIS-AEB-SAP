export default function HandleDownload(file, name) {
    let dataStr
    let downloadAnchorNode = document.createElement('a');
    file.id = undefined
    dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(file))

    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `${name}.json`);
    document.body.appendChild(downloadAnchorNode)
    downloadAnchorNode.click()
    downloadAnchorNode.remove()
}