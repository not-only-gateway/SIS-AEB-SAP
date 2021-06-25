import PropTypes from "prop-types";
import React, {useEffect, useState} from "react";
import ReactDOM from 'react-dom'
import styles from "./styles/Modal.module.css";

export default function Modal(props) {
    const [isInRender, setIsInRender] = useState(false)
    const [style, setStyle] = useState('')

    useEffect(() => {
        const element = document.getElementById('modal-frame')

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
                if (!event.target.contains(event.relatedTarget))
                    props.handleClose(false)
            })
    })

    let element =  isInRender ? (
        <div id={'modal-frame'}
             className={style}
             style={{
                 ...(props.componentStyle !== null && props.componentStyle !== undefined ? props.componentStyle : {}),
                 ...{
                     overflow: 'hidden',
                     width: '100%',
                     position: 'fixed',
                     background: 'rgba(0, 0, 0, .4)',
                     height: '100%',
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
            root.style.display = "initial";
            const elementRendered = ReactDOM.render(
                element,
                root
            );
            console.log(elementRendered)
        }
    }
    else{
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
