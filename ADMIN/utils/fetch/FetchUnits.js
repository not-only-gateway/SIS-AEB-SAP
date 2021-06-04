import axios from "axios";
import Host from "../shared/Host";
import Cookies from "universal-cookie/lib";
import PropTypes from 'prop-types'

const cookies = new Cookies()
export default async function fetchUnits(props) {

    await axios({
        method: 'get',
        url: Host() + 'list/unit',
        headers: cookies.get('jwt') !== undefined ? {'authorization': cookies.get('jwt')} : null,
        params: {
            authorization_token: cookies.get('authorization_token'),
            max_id: props.maxID,
            searchInput: props.searchInput && props.searchInput.length > 0 ? props.searchInput : null
        }
    }).then(res => {
        if (props.maxID === null)
            props.setData(res.data)
        else
            props.setData([...props.data, ...res.data])

        if (res.data.length > 0)
            props.setMaxID(res.data[res.data.length - 1].id)

        props.setLastFetchedSize(res.data.length)
    }).catch(error => {
        console.log(error)
    })

}

fetchUnits.propTypes = {
    data: PropTypes.array,
    setData: PropTypes.func,

    searchInput: PropTypes.string,
    maxID: PropTypes.number,
    setMaxID: PropTypes.func,
    setLastFetchedSize: PropTypes.func
}

