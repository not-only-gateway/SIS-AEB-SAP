import axios from "axios";
import Host from "../shared/Host";
import Cookies from "universal-cookie/lib";
import PropTypes from 'prop-types'

const recordProps = {
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


const cookies = new Cookies()


export default class RecordRequests {
    static async fetchRecords(recordProps) {

        await axios({
            method: 'get',
            url: Host() + 'key/' + recordProps.entityType,
        }).then(async function (res) {
            await axios({
                method: 'get',
                url: Host() + 'list/object/' + recordProps.id,
                headers: cookies.get('jwt') !== undefined ? {'authorization': cookies.get('jwt')} : null,
                params: {
                    max_id: recordProps.maxID,
                    entity_key: res.data
                }
            }).then(res => {
                if (recordProps.maxID === null)
                    recordProps.setData(res.data)
                else
                    recordProps.setData([...recordProps.data, ...res.data])

                if (res.data.length > 0)
                    recordProps.setMaxID(res.data[res.data.length - 1].id)

            }).catch(error => {
                console.log(error)
            })
        }).catch(error => {
            console.log(error)
        })
    }
}