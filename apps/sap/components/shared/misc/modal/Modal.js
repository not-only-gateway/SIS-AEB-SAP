import PropTypes from "prop-types";
import React, {useEffect, useRef, useState} from "react";
import ReactDOM from 'react-dom'
import styles from "./styles/Modal.module.css";

export default function Modal(props) {
    const [isInRender, setIsInRender] = useState(false)
    const mountingPoint = useRef()
    const contentRef = useRef()
    const [mounted, setMounted] = useState(false)

    const modal = (
        <div id={'modal-frame'}
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
            <div className={styles.modalContainer} ref={contentRef}>
                {props.children}
            </div>
        </div>
    )


    useEffect(() => {
        if (!mounted) {
            const newElement = document.createElement('div')
            mountingPoint.current = newElement
            document.body.appendChild(newElement)

            setMounted(true)
        }

        if (isInRender && !props.open) {
            mountingPoint.current.classList.remove(styles.fadeIn)
            mountingPoint.current.classList.add(styles.fadeOutAnimation)
            mountingPoint.current.addEventListener('animationend', () => {
                setIsInRender(false)
                try {
                    ReactDOM.unmountComponentAtNode(mountingPoint.current);
                    // document.body.removeChild(mountingPoint.current)
                } catch (e) {
                    console.log(e)
                }
            }, {once: true})
        } else if (!isInRender && props.open) {
            mountingPoint.current.classList.remove(styles.fadeOutAnimation)
            setIsInRender(true)
            mountingPoint.current.style.position = 'fixed'
            mountingPoint.current.style.zIndex = 999
            ReactDOM.render(
                modal,
                mountingPoint.current
            )
            mountingPoint.current.classList.add(styles.fadeIn)
        }


        const mouseDown = (event) => {
            if (contentRef.current !== null && event.target !== contentRef.current && !contentRef.current?.contains(event.target))
                props.handleClose(false)
        }
        if (props.open)
            mountingPoint.current.addEventListener('mousedown', mouseDown)

        return () => {
            mountingPoint.current.removeEventListener('mousedown', mouseDown)
            // ReactDOM.unmountComponentAtNode(mountingPoint);
            // document.body.removeChild(mountingPoint)
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
