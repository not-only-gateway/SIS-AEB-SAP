import axios from "axios";
import Host from "../shared/Host";
import Cookies from "universal-cookie/lib";
import PropTypes from 'prop-types'

export default async function FetchExtensionsFilter(props){
    let units = []
    let effective = []
    let commissioned = []
    let seniors = []

    if(props.selectedUnit !== undefined)
        await axios({
            method: 'get',
            url: Host() + 'senior/'+props.selectedUnit,
            headers: (new Cookies()).get('jwt') !== undefined ? {'authorization': (new Cookies()).get('jwt')} : null,
        }).then(res => {
            seniors = res.data
        }).catch(error => {
            console.log(error)
        })

    await axios({
        method: 'get',
        url: Host() + 'roles/effective',
        headers: (new Cookies()).get('jwt') !== undefined ? {'authorization': (new Cookies()).get('jwt')} : null,

    }).then(res => {
        effective = res.data
    }).catch(error => {
        console.log(error)
    })
    await axios({
        method: 'get',
        url: Host() + 'roles/commissioned',
        headers: (new Cookies()).get('jwt') !== undefined ? {'authorization': (new Cookies()).get('jwt')} : null,

    }).then(res => {
        commissioned = res.data
    }).catch(error => {
        console.log(error)
    })
    await axios({
        method: 'get',
        url: Host() + 'units',
        headers: (new Cookies()).get('jwt') !== undefined ? {'authorization': (new Cookies()).get('jwt')} : null,

    }).then(res => {
        units = res.data
    }).catch(error => {
        console.log(error)
    })

    props.setResponse({
        units: units,
        effectiveRoles: effective,
        commissionedRoles: commissioned,
        seniors: seniors
    })

}
FetchExtensionsFilter.propTypes = {
    setResponse: PropTypes.func,
    setLoading: PropTypes.func,
    selectedUnit: PropTypes.number
}