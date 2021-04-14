import PropTypes from 'prop-types'

export function getPrimaryColor (props){
    return {
        color: props.dark ? 'white' : 'black',
        textTransform: 'none'
    }
}
export function getSecondaryColor (props){
    return {
        color: props.dark ? '#fefefe' : '#333333',
        textTransform: 'none'
    }
}
export function getTertiaryColor(props){
    return {
        color: props.dark ? '#e2e2e2' : '#555555',
        textTransform: 'none'
    }
}
export function getPrimaryBackground (props){
    return {
        backgroundColor: props.dark ? '#262d37' : '#f4f8fb'
    }
}
export function getSecondaryBackground (props){
    return {
        backgroundColor: props.dark ? '#303741' : 'white'
    }
}
export function getTertiaryBackground (props){
    return {
        backgroundColor: props.dark ? '#3b424c' : null
    }
}
export function getBorder(props){
    return {
        border: !props.dark ? '#e2e2e2 1px solid' : null
    }
}
const props ={
    dark:  PropTypes.bool
}
getPrimaryColor.propTypes=props
getSecondaryColor.propTypes=props
getTertiaryColor.propTypes=props

getPrimaryBackground.propTypes=props
getSecondaryBackground.propTypes=props
getTertiaryBackground.propTypes=props

