import PropTypes from "prop-types";
import React, {useEffect, useState} from "react";
import ReactDOM from 'react-dom'
import styles from "./styles/Modal.module.css";

export default function Modal(props) {
    const [isInRender, setIsInRender] = useState(false)
    const [style, setStyle] = useState('')

    useEffect(() => {
        const element = document.getElementById('modal-frame')
        const content = document.getElementById('modal-content')

        if (isInRender && !props.open) {
            setStyle(styles.fadeOutAnimation)
        } else if (!isInRender && props.open) {
            setIsInRender(true)
            setStyle(styles.fadeIn)
        }

        if (element !== null) {
            element.addEventListener('animationend', () => {
                if (!props.open && isInRender) {
                    setIsInRender(false)
                    setStyle(styles.fadeIn)
                }
                element.removeEventListener('animationend', null)
            });
        }


        if (element !== null && props.open)
            element.addEventListener('mousedown', event => {
                if (content !== null && event.target !== content && !content.contains(event.target))
                    props.handleClose(false)
            })
    })

    let element = isInRender ? (
        <div id={'modal-frame'}
             className={style}
             style={{
                 ...props.componentStyle,
                 ...{
                     overflow: 'hidden',
                     width: '100vw',
                     position: 'fixed',
                     background: 'rgba(0, 0, 0, .4)',
                     height: '100vh',
                     zIndex: 300,
                     bottom: 0,

                 }
             }}>
            <div className={styles.modalContainer} id={'modal-content'}>
                {props.children}
            </div>
        </div>
    ) : <></>

    if (typeof window !== 'undefined' && isInRender) {
        const root = document.getElementById(props.rootElementID)
        if (root !== null) {
            root.style.display = 'flex';
            ReactDOM.render(
                element,
                root
            );
        }
    } else {
        const root = document.getElementById(props.rootElementID)
        if (root !== null)
            root.style.display = "none";
    }
    return null
}

Modal.propTypes = {
    componentStyle: PropTypes.object,
    rootElementID: PropTypes.string,
    open: PropTypes.bool,
    handleClose: PropTypes.func
}
