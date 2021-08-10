import PropTypes from "prop-types";
import React, {useEffect, useState} from "react";
import ReactDOM from 'react-dom'
import styles from "./styles/Modal.module.css";

export default function Modal(props) {
    const [isInRender, setIsInRender] = useState(false)
    const [style, setStyle] = useState('')

    const modal = (
        <div id={'modal-frame'}
             key={'modal-frame'}
             className={style}
             style={{
                 ...props.componentStyle,
                 ...{
                     overflow: 'hidden',
                     width: '100vw',
                     position: 'fixed',
                     background: `rgba(0, 0, 0, ${props.noBlur ? .2 : .4})`,
                     height: '100vh',
                     zIndex: 300,
                     bottom: 0,

                 }
             }}>
            <div className={styles.modalContainer} id={'modal-content'}>
                {props.children}
            </div>
        </div>
    )

    const mountingPoint = document.createElement('div')

    useEffect(() => {
        const element = document.getElementById('modal-frame')
        const content = document.getElementById('modal-content')

        if (isInRender && !props.open) {
            setStyle(styles.fadeOutAnimation)
        } else if (!isInRender && props.open) {
            setIsInRender(true)
            ReactDOM.render(
                modal,
                mountingPoint
            )
            setStyle(styles.fadeIn)
        }

        element?.addEventListener('animationend', () => {
            if (!props.open && isInRender) {
                setIsInRender(false)

                ReactDOM.unmountComponentAtNode(mountingPoint);
                setStyle(styles.fadeIn)
            }
        }, {once: true})

        const mouseDown = (event) => {
            if (content !== null && event.target !== content && !content.contains(event.target))
                props.handleClose(false)
        }
        if (props.open)
            element?.addEventListener('mousedown', mouseDown)

        return () => {
            element?.removeEventListener('mousedown', mouseDown)
            ReactDOM.unmountComponentAtNode(
                mountingPoint
            )
        }
    })

    return null
}

Modal.propTypes = {
    noBlur: PropTypes.bool,
    componentStyle: PropTypes.object,
    open: PropTypes.bool,
    handleClose: PropTypes.func
}
