import axios from "axios";
import Host from "../shared/Host";
import Cookies from "universal-cookie/lib";
import PropTypes from 'prop-types'

const cookies = new Cookies()
export default async function FetchEntityHistory(props) {

    await axios({
        method: 'get',
        url: Host() + 'key/' + props.entityType,
    }).then(async function (res){
        await axios({
            method: 'get',
            url: Host() + 'list/object/' + props.id,
            headers: cookies.get('jwt') !== undefined ? {'authorization': cookies.get('jwt')} : null,
            params: {
                max_id: props.maxID,
                entity_key: res.data
            }
        }).then(res => {
            if (props.maxID === null)
                props.setData(res.data)
            else
                props.setData([...props.data, ...res.data])

            if (res.data.length > 0)
                props.setMaxID(res.data[res.data.length - 1].id)

        }).catch(error => {
            console.log(error)
        })
    }).catch(error => {
        console.log(error)
    })
}

FetchEntityHistory.propTypes = {
    data: PropTypes.array,
    setData: PropTypes.func,
    entityType: PropTypes.oneOf([
        'person',
        'contact',
        'document'
    ]),
    maxID: PropTypes.number,
    setMaxID: PropTypes.func,
    id: PropTypes.number
}

