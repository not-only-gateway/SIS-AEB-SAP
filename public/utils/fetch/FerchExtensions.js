import PropTypes from 'prop-types'
import axios from "axios";
import Host from "../shared/Host";
import Cookies from "universal-cookie/lib";

export default async function fetchExtensions(props) {

    await axios({
        method: 'get',
        url: Host() + props.path,
        headers: (new Cookies()).get('jwt') !== undefined ? {'authorization': (new Cookies()).get('jwt')} : null,
        params: props.params
    }).then(res => {

        switch (props.type){
            case 0: {
                props.setResponse([...props.data, ...res.data])
                if (res.data.length > 0)
                    props.setMaxID(res.data[res.data.length - 1].member.id)
                props.setLastFetchedSize(res.data.length)
                break
            }
            case 1: {
                props.setResponse(res.data)
                if (res.data.length > 0)
                    props.setMaxID(res.data[res.data.length - 1].member.id)
                props.setLastFetchedSize(res.data.length)
                break
            }
            default:
                break
        }
    }).catch(error => {
        console.log(error)
    })

}
fetchExtensions.propTypes = {
    setResponse: PropTypes.func,
    data: PropTypes.array,
    params: PropTypes.object,
    path: PropTypes.string,
    setLastFetchedSize: PropTypes.func,
    setMaxID: PropTypes.func,
    type: PropTypes.number
}