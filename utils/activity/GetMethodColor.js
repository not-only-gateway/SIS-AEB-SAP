export default function getMethodColor(method) {
    let response = null

    switch (method) {
        case 'GET': {
            response = '#249a44'
            break
        }
        case 'POST': {
            response = '#f2ac04'
            break
        }
        case 'PUT': {
            response = '#0c74da'
            break
        }
        case 'DELETE': {
            response = '#e62214'
            break
        }
        default:
            break
    }

    return response
}