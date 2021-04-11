import PropTypes from 'prop-types'
import {setThemeCookie} from "./Theme";

export default function changeTheme(props){
    props.setTheme(!props.currentTheme)
    setThemeCookie()
}
changeTheme.propTypes={
    currentTheme: PropTypes.bool,
    setTheme: PropTypes.func
}