export default async function HandleUpload(file) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader()
        fileReader.onload = event => {
            resolve(JSON.parse(event.target.result));
        }
        fileReader.onerror = error => reject(error)
        fileReader.readAsText(file)
    })
}