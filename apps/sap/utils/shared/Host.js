export default function Host(asUpload) {
    if(asUpload)
        return 'http://localhost:1025/api/'
    else
        return 'http://192.168.0.211:80/api/'
}
