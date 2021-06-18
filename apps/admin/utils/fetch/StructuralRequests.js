import PropTypes from 'prop-types'
import axios from "axios";
import Host from "../shared/Host";
import Cookies from "universal-cookie/lib";


const unitProps = {
    data: PropTypes.array,
    setData: PropTypes.func,

    searchInput: PropTypes.string,
    maxID: PropTypes.number,
    setMaxID: PropTypes.func,
    setLastFetchedSize: PropTypes.func
}
const entityProps = {
    data: PropTypes.array,
    setData: PropTypes.func,

    searchInput: PropTypes.string,
    maxID: PropTypes.number,
    setMaxID: PropTypes.func,
    setLastFetchedSize: PropTypes.func
}
const cookies = new Cookies()

export default class StructuralRequests {
    static async fetchUnits(unitProps) {

        await axios({
            method: 'get',
            url: Host() + 'list/unit',
            headers: cookies.get('jwt') !== undefined ? {'authorization': cookies.get('jwt')} : null,
            params: {
                max_id: unitProps.maxID,
                search_input: unitProps.searchInput && unitProps.searchInput.length > 0 ? unitProps.searchInput : null
            }
        }).then(res => {
            if (unitProps.maxID === null)
                unitProps.setData(res.data)
            else
                unitProps.setData([...unitProps.data, ...res.data])

            if (res.data.length > 0)
                unitProps.setMaxID(res.data[res.data.length - 1].id)

            unitProps.setLastFetchedSize(res.data.length)
        }).catch(error => {
            console.log(error)
        })

    }

    static async fetchUnit(unitID) {
        let response = null
        await axios({
            method: 'get',
            url: Host() + 'unit/' + unitID,
            headers: cookies.get('jwt') !== undefined ? {'authorization': cookies.get('jwt')} : null,
        }).then(res => {
            response = res.data
            response.parent_entity = {key: response.parent_entity.id, value: response.parent_entity.name}
            if (response.parent_unit !== null)
                response.parent_unit = {key: response.parent_unit.id, value: response.parent_unit.name}
        }).catch(error => {
            console.log(error)
        })
        return response
    }

    static async fetchTopUnits() {
        let response = []
        await axios({
            method: 'get',
            url: Host() + 'top/unit',
            headers: cookies.get('jwt') !== undefined ? {'authorization': cookies.get('jwt')} : null,
        }).then(res => {
            response = res.data
        }).catch(error => {
            console.log(error)
        })

        return response
    }

     static async fetchEntities(entityProps) {

        await axios({
            method: 'get',
            url: Host() + 'list/entity',
            headers: cookies.get('jwt') !== undefined ? {'authorization': cookies.get('jwt')} : null,
            params: {
                authorization_token: cookies.get('authorization_token'),
                max_id: entityProps.maxID,
                searchInput: entityProps.searchInput && entityProps.searchInput.length > 0 ? entityProps.searchInput : null
            }
        }).then(res => {
            if (entityProps.maxID === null)
                entityProps.setData(res.data)
            else
                entityProps.setData([...entityProps.data, ...res.data])

            if (res.data.length > 0)
                entityProps.setMaxID(res.data[res.data.length - 1].id)

            entityProps.setLastFetchedSize(res.data.length)
        }).catch(error => {
            console.log(error)
        })

    }


}

