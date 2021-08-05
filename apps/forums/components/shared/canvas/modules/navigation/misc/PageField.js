import styles from "../styles/Footer.module.css";
import {useRef, useState} from "react";
import PropTypes from "prop-types";
import Pages from "./Pages";

export default function PageField(props) {
    const ref = useRef()
    const [focused, setFocused] = useState(false)
    return (
        <input
            className={[styles.pageButton, props.page.default ? styles.mainPage : ''].join(' ')}
            onContextMenu={event => event.preventDefault()} value={props.page.title}
            style={{background: focused ? '#E8F0FE' : undefined, cursor: focused ? 'text' : 'pointer'}}
            onClick={() => {
                if (!focused)
                    ref.current.blur()
            }}
            ref={ref}
            onDoubleClick={() => {
                ref.current.focus()
                setFocused(true)
            }} onBlur={() => setFocused(false)}/>
    )
}
PageField.propTypes = {
    page: PropTypes.func
}