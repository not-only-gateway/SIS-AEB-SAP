import PropTypes from 'prop-types'
import styles from './styles/Styles.module.css'
import {useEffect, useRef, useState} from "react";
import ReactDOM from 'react-dom'

export default function Context(props) {
    const ref = useRef()

    const element = (
        <div
            className={styles.context} ref={ref}
        >
            {props.buttons.map(button => (
                <button onClick={() => button.onClick()} disabled={button.disabled} className={styles.contextButton}>
                    {button.label}
                </button>
            ))}
        </div>


    )
    const unmount = () => {
        try {
            ReactDOM.unmountComponentAtNode(props.contextMenuRef)

        } catch (e) {
        }
        document.removeEventListener('mousedown', listener)
        props.handleClose()
    }
    const listener = (event) => {
        if (typeof event.target.className !== 'string' || !event.target.className.includes('Styles_contextButton')) {
            ref.current.classList.add(styles.exitAnimation)
            ref.current.addEventListener('animationend', () => {
                console.log(ref.current.className)
                unmount()
            }, {
                once: true
            })
        }

    }
    useEffect(() => {
        if (props.render) {
            unmount()
            ReactDOM.render(
                element,
                props.contextMenuRef
            )

            props.contextMenuRef.style.display = 'block'
            props.contextMenuRef.style.top = (props.placement.clientY - props.buttons.length * 40) + 'px'
            props.contextMenuRef.style.left = props.placement.clientX + 'px'

            document.addEventListener('mousedown', listener)
        }
    }, [props.render])
    return null
}
Context.propTypes = {
    buttons: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.any,
        onClick: PropTypes.func,
        disabled: PropTypes.bool
    })),
    render: PropTypes.bool,
    contextMenuRef: PropTypes.object,
    placement: PropTypes.shape({
        clientX: PropTypes.number,
        clientY: PropTypes.number
    }),
    handleClose: PropTypes.func

}
