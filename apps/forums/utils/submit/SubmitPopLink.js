import axios from "axios";
import Host from "../shared/Host";
import Cookies from "universal-cookie/lib";
import PropTypes from 'prop-types'

const cookies = new Cookies()
export default async function submitPopLink(props) {
    let response = false

    let data = {}
    data = Object.assign(data, props.child)
    data = data.parents
    console.log({
        child: props.child.id,
        parent: props.parent.id,
        parents: [...data, ...[props.link]],
    })
    await axios({
        method: 'put',
        url:  Host() + 'pop/' + props.child.id,
        headers: cookies.get('jwt') !== undefined ? {'authorization': cookies.get('jwt')} : null,
        data: {
            id: props.child.id,
            parents: [...data, ...[{
                child: props.child.id,
                parent: props.parent.id,
                strong: props.link.type,
                description: props.link.description
            }]]
        }
    }).then(res => {
        response = true
    }).catch(error => console.log(error))
    return response
}

submitPopLink.propTypes = {
    child: PropTypes.object,
    parent: PropTypes.object,
    link:  PropTypes.object
}