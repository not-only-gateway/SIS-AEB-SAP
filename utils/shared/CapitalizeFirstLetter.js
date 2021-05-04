export default function capitalizeFirstLetter(string) {
    let response = string
    if (response !== null && response[0] !== undefined)
        response = response.replace(/^./, response[0].toUpperCase());

    return response
}