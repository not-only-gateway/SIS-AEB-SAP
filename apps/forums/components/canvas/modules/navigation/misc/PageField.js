import styles from "../styles/Footer.module.css";
import {useRef, useState} from "react";
import PropTypes from "prop-types";
import {ArrowBackRounded} from "@material-ui/icons";

export default function PageField(props) {
    const ref = useRef()
    const [focused, setFocused] = useState(false)
    const [openContext, setOpenContext] = useState(false)
    return (
        <div style={{position: 'relative', display: 'flex'}}>


            <input
                className={[styles.pageButton, props.page.default ? styles.mainPage : ''].join(' ')}
                onContextMenu={event => {
                    event.preventDefault()
                    setOpenContext(true)
                }} value={props.page.title}
                style={{background: focused ? '#E8F0FE' : undefined, cursor: focused ? 'text' : 'pointer'}}
                onClick={() => {
                    if (!focused)
                        ref.current.blur()
                }}
                ref={ref} onChange={() => null}
                onDoubleClick={() => {
                    ref.current.focus()
                    setFocused(true)
                }} onBlur={() => setFocused(false)}
            />
        </div>
    )
}
PageField.propTypes = {
    page: PropTypes.object,
    contextMenuRef: PropTypes.object
}