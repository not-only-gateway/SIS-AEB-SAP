import PropTypes from 'prop-types'

export function getPrimaryColor(props) {
    return {
        color: props.dark ? 'white' : 'black',
        textTransform: 'none'
    }
}

export function getSecondaryColor(props) {
    return {
        color: props.dark ? '#fefefe' : '#333333',
        textTransform: 'none'
    }
}

export function getTertiaryColor(props) {
    return {
        color: props.dark ? '#e2e2e2' : '#555555',
        textTransform: 'none'
    }
}

export function getPrimaryBackground(props) {
    return {
        backgroundColor: props.dark ? '#262d37' : '#f4f8fb'
    }
}

export function getSecondaryBackground(props) {
    return {
        backgroundColor: props.dark ? '#303741' : 'white'
    }
}

export function getTertiaryBackground(props) {
    return {
        backgroundColor: props.dark ? '#3b424c' : null
    }
}
export function getQuaternaryBackground(props) {
    return {
        backgroundColor: props.dark ? '#484c55' : null
    }
}

export function getBorder(props) {
    return {
        border: props.hovered === true ? '#39adf6 1px solid' : !props.dark ? '#e2e2e2 1px solid' : 'transparent 1px solid'
    }
}

export function getBoxShadow(props) {
    return {boxShadow: props.dark ? 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px' : props.hovered === true ? 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' : null}
}

export function getIconStyle(props) {
    return {
        marginRight: '10px',
        marginLeft: '10px',
        fontSize: '1.6rem',
        color: props.highlight ? '#39adf6' : !props.dark ? '#777777' : '#ededed'
    }
}

const props = {
    dark: PropTypes.bool
}
getPrimaryColor.propTypes = props
getSecondaryColor.propTypes = props
getTertiaryColor.propTypes = props
getQuaternaryBackground.propTypes = props
getIconStyle.propTypes = {dark: PropTypes.bool, highlight: PropTypes.bool}
getBorder.propTypes = {dark: PropTypes.bool, hovered: PropTypes.bool}
getBoxShadow.propTypes = {dark: PropTypes.bool, hovered: PropTypes.bool}
getPrimaryBackground.propTypes = props
getSecondaryBackground.propTypes = props
getTertiaryBackground.propTypes = props

