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
}
const entityProps = {
    data: PropTypes.array,
    setData: PropTypes.func,

    searchInput: PropTypes.string,
    maxID: PropTypes.number,
    setMaxID: PropTypes.func,
}
const cookies = new Cookies()

export default class ForumRequests {

    static async listPops(pk) {
        let response = []
        await axios({
            method: 'get',
            url: Host() + 'list/pop/' + pk,
            headers: cookies.get('jwt') !== undefined ? {'authorization': cookies.get('jwt')} : null,
        }).then(res => {
            response = res.data
        }).catch(error => {
            console.log(error)
        })
        return response
    }

    static async fetchSubject(pk) {
        let response = null
        await axios({
            method: 'get',
            url: Host() + 'subject/' + pk,
            headers: cookies.get('jwt') !== undefined ? {'authorization': cookies.get('jwt')} : null,
        }).then(res => {
            response = res.data
        }).catch(error => {
            console.log(error)
        })
        return response
    }
    static async fetchImage(image) {
        let response = null
        await axios({
            method: 'get',
            url: Host() + 'pop/image',
            headers: cookies.get('jwt') !== undefined ? {'authorization': cookies.get('jwt')} : null,
            params: {
                image: image
            }
        }).then(res => {
            response = res.data.image
        }).catch(error => {
            console.log(error)
        })
        return response
    }

}


