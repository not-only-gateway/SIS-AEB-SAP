import {getLanguage, setCookiesLanguage} from "./Language";
import PropTypes from 'prop-types'

export default function changeLanguage(props){
    const newLocale = props.event.target.value
    const newLang = getLanguage(newLocale, props.path)
    setCookiesLanguage(newLocale)
    props.router.push(props.path, props.path, {locale: newLocale}).catch(r => console.log(r))
    props.setLang(newLang)
}

changeLanguage.propTypes={
    setLang: PropTypes.func,
    path: PropTypes.string,
    router: PropTypes.func,
    event: PropTypes.object
}