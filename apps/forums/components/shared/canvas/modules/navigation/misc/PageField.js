import styles from "../styles/Footer.module.css";
import {useRef, useState} from "react";
import PropTypes from "prop-types";
import Pages from "./Pages";
import {ArrowBackRounded} from "@material-ui/icons";
import Context from "../../misc/Context";

export default function PageField(props) {
    const ref = useRef()
    const [focused, setFocused] = useState(false)
    const [openContext, setOpenContext] = useState(false)
    return (
        <div style={{position: 'relative', display: 'flex'}}>

            {openContext ?
                <Context buttons={[
                    {label: 'Renomear', onClick: () => ref.current.focus()},
                    {label: 'Duplicar', onClick: () => null},
                    {label: 'Excluir', onClick: () => null}
                ]}
                />
                :
                null}


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
                ref={ref}
                onDoubleClick={() => {
                    ref.current.focus()
                    setFocused(true)
                }} onBlur={() => setFocused(false)}/>
            <button onClick={() => setOpenContext(!openContext)}>
                <ArrowBackRounded/>
            </button>
        </div>
    )
}
PageField.propTypes = {
    page: PropTypes.func
}