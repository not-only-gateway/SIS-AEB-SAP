import PropTypes from 'prop-types'
import axios from "axios";
import Host from "../shared/Host";
import Cookies from "universal-cookie/lib";

const memberProps={
    personID: PropTypes.number,
    memberID: PropTypes.number,
    data: PropTypes.object,
    create: PropTypes.bool,
    setStatus: PropTypes.func
}
const cookies = new Cookies()

export default class MemberSubmitRequests{
    static async  submitMember(memberProps) {
        let response = {
            status: false
        }
        let data = {}
        data = Object.assign(data, memberProps.data)
        data.person = memberProps.personID
        data.entity = memberProps.data.entity.key

        await axios({
            method: memberProps.create ? 'post' : 'put',
            url: memberProps.create ? Host() + 'member' : Host() + 'member/' + memberProps.memberID,
            headers: cookies.get('jwt') !== undefined ? {'authorization': cookies.get('jwt')} : null,
            data: data
        }).then(res => {
            response = {
                status: true,
                id: res.data
            }
        }).catch(error => {
            memberProps.setStatus({
                error: true,
                message: error.message
            })
        })
        return response
    }

}


