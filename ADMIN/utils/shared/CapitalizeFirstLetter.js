export default function capitalizeFirstLetter(string) {
    let response = string
    if (response !== undefined && response !== null )
        response = response.replace(/^./, response[0].toUpperCase());

    return response
}