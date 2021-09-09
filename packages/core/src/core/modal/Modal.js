import PropTypes from "prop-types";
import React, {useEffect, useRef, useState} from "react";
import ReactDOM from 'react-dom'
import styles from "./styles/Modal.module.css";

export default function Modal(props) {
    const contentRef = useRef()
    const element = useRef()
    const lastOpenState = useRef(props.open)
    const [mounted, setMounted] = useState(false)
    useEffect(() => {
        if (!mounted) {
            const newElement = document.createElement('div')
            document.body.appendChild(newElement)
            element.current = newElement

            setMounted(true)
        }
        if (props.open) {
            element.current.style.position = 'fixed'
            element.current.style.zIndex = 999

            if (lastOpenState.current !== props.open) {
                element.current.style.opacity = 0
                element.current.classList.add(styles.fadeIn)
            }

            ReactDOM.render(
                <div
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
                </div>,
                element.current
            )


            lastOpenState.current = true
        } else {
            element.current.classList.add(styles.fadeOutAnimation)

            element.current.addEventListener('animationend', () => {
                ReactDOM.unmountComponentAtNode(element.current);
                lastOpenState.current = false
                setMounted(false)
            }, {once: true})
        }

    }, [props.open, props.children])
    useEffect(() => () => {
        console.log('UNMOUNTING')
        element.current.classList.add(styles.fadeOutAnimation)

        element.current.addEventListener('animationend', () => {
            ReactDOM.unmountComponentAtNode(element.current);
        }, {once: true})
    }, []);

    return null
}

Modal.propTypes = {
    noBlur: PropTypes.bool,
    componentStyle: PropTypes.object,
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    children: PropTypes.node
}
