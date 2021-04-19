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

export function getSecondaryBackground(props) {
    return {
        backgroundColor: props.dark ? '#303741' : 'white',
        boxShadow: props.dark ? null : 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px'
            // 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px'
        // 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px'
        // 'rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px'
            // 'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px'

    }
}

export function getPrimaryBackground(props) {
    return {
        backgroundColor: props.dark ? '#262d37' : '#f5f6f8',
        boxShadow: props.dark ? null : 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px'
    }
}

export function getTertiaryBackground(props) {
    return {
        backgroundColor: props.dark ? '#3b424c' : '#f2f2f2',
        boxShadow: props.dark ? null : 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px'
    }
}
export function getQuaternaryBackground(props) {
    return {
        backgroundColor: props.dark ? '#484c55' : null
    }
}

export function getBorder(props) {
    return {
        borderLeft: props.highlight ? props.dark ?'#1ea1f1 2px solid' : '#46b2f3 2px solid' : 'transparent 2px solid'
    }
}

export function getBoxShadow(props) {
    return {boxShadow: props.dark ? 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px' : props.hovered === true ? 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' : null}
}

export function getIconStyle(props) {
    return {

        marginRight: '10px',
        fontSize: '1.5rem',
        color: props.highlight ? props.dark ?'#1ea1f1' : '#46b2f3' : !props.dark ? '#777777' : '#ededed'
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
getBorder.propTypes = {dark: PropTypes.bool, highlight: PropTypes.bool}
getBoxShadow.propTypes = {dark: PropTypes.bool, hovered: PropTypes.bool}
getSecondaryBackground.propTypes = props
getPrimaryBackground.propTypes = props
getTertiaryBackground.propTypes = props

