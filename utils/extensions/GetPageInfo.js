import PropTypes from 'prop-types'

export default function getPageInfo (props){
    let response = null
    switch (props.option) {
        case 'collaborators': {
            response = props.info1
            break
        }
        case 'units': {
            response = props.info2
            break
        }
        case 'people': {
            response = props.info3
            break
        }
        default:
            break
    }
    return response
}

getPageInfo.propTypes={
    info1: PropTypes.string,
    info2: PropTypes.string,
    info3: PropTypes.string,
    option: PropTypes.string
}
