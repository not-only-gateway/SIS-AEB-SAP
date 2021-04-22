import PropTypes from 'prop-types'
import axios from "axios";
import Host from "../shared/Host";
import Cookies from "universal-cookie/lib";

export default async function fetchIndexData(props) {
    props.setLoading(true)

    await axios({
        method: 'get',
        url: Host() + props.option,
        headers: (new Cookies()).get('jwt') !== undefined ? {'authorization': (new Cookies()).get('jwt')} : null,
        params: props.params
    }).then(res => {
        console.log(res)
        switch (props.type){


            case 0: {
                props.setResponse([...props.data, ...res.data])
                if (res.data.length > 0)
                    props.setMaxID(res.data[res.data.length - 1].profile.id)
                props.setLastFetchedSize(res.data.length)
                break
            }
            case 1: {
                props.setResponse(res.data)
                if (res.data.length > 0)
                    props.setMaxID(res.data[res.data.length - 1].profile.id)
                props.setLastFetchedSize(res.data.length)
                break
            }
            default:
                break
        }
    }).catch(error => {
        console.log(error)
    })

    props.setLoading(false)
}
fetchIndexData.propTypes = {
    setResponse: PropTypes.func,
    data: PropTypes.array,
    params: PropTypes.object,
    setLoading: PropTypes.func,
    option: PropTypes.string,
    setLastFetchedSize: PropTypes.func,
    setMaxID: PropTypes.func,
    type: PropTypes.number
}