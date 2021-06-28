import axios from "axios";
import Host from "../shared/Host";
import Cookies from "universal-cookie/lib";
import PropTypes from 'prop-types'

const cookies = new Cookies()
export default async function submitContractualLinkage(props) {
    let response = false
    let data = {}
    data = Object.assign(data, props.data)

    data.entity = data.entity !== null && data.entity !== undefined ? data.entity.id : null
    data.effective_role = data.effective_role !== null && data.effective_role !== undefined ? data.effective_role.id : null
    data.contract = data.contract !== null && data.contract !== undefined ? data.contract.id : null
    data.unit = data.unit !== null && data.unit !== undefined ? data.unit.id : null

    if (typeof data.official_publication_date === 'string')
        data.official_publication_date = new Date(data.official_publication_date.replaceAll('/', '-').replace(/(\d{2})-(\d{2})-(\d{4})/, "$3-$2-$1")).getTime()
    if (typeof data.admission_date === 'string')
        data.admission_date = new Date(data.admission_date.replaceAll('/', '-').replace(/(\d{2})-(\d{2})-(\d{4})/, "$3-$2-$1")).getTime()

    await axios({
        method: props.create ? 'post' : 'put',
        url: props.create ? (Host() + 'linkage/contractual') : (Host() + 'linkage/contractual/' + props.pk),
        headers: cookies.get('jwt') !== undefined ? {'authorization': cookies.get('jwt')} : null,
        data: data
    }).then(async function (res) {
        props.setStatus({
            type: 'success',
            message: res.status + ' - ' + res.statusText,
        })
        response = true

    }).catch(error => {
        props.setStatus({
            type: 'error',
            message: error.message
        })
    })
    return response
}

submitContractualLinkage.propTypes = {
    pk: PropTypes.number,
    data: PropTypes.object,
    collaboratorData: PropTypes.object,
    create: PropTypes.bool,
    setStatus: PropTypes.func,
}