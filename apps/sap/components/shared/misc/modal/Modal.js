import PropTypes from "prop-types";
import React, {useEffect, useRef} from "react";
import ReactDOM from 'react-dom'
import styles from "./styles/Modal.module.css";

export default function Modal(props) {
    const contentRef = useRef()

    useEffect(() => {
        const newElement = document.createElement('div')
        document.body.appendChild(newElement)

        if (props.open) {
            newElement.style.position = 'fixed'
            newElement.style.zIndex = 999
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
                newElement
            )
        }

        return () => {
            ReactDOM.unmountComponentAtNode(newElement);
        }
    }, [props.open])

    return null
}

Modal.propTypes = {
    noBlur: PropTypes.bool,
    componentStyle: PropTypes.object,
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    children: PropTypes.node
}
