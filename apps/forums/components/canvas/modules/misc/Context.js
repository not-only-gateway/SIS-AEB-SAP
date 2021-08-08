import PropTypes from 'prop-types'
import styles from './styles/Styles.module.css'
import {useEffect, useRef, useState} from "react";
import ReactDOM from 'react-dom'

export default function Context(props) {

    const element = (
        <div
            className={styles.context} id={'context-menu'}
        >
            {props.buttons.map(button => (
                <button onClick={() => button.onClick()} disabled={button.disabled} className={styles.contextButton}>
                    {button.icon}
                    <div style={{color: '#393C44'}}>
                        {button.label}
                    </div>
                </button>
            ))}
        </div>


    )
    const unmount = () => {
        const el = document.getElementById('context-menu')
        el?.classList.remove(styles.exitAnimation)

        try {
            ReactDOM.unmountComponentAtNode(props.contextMenuRef)
        } catch (e) {
        }
        document.removeEventListener('mousedown', listener)
        props.handleClose()
    }
    const listener = (event) => {
        const el = document.getElementById('context-menu')
        if (typeof event.target.className !== 'string' || !event.target.className.includes('Styles_contextButton')) {
            el?.classList.add(styles.exitAnimation)
            el?.addEventListener('animationend', unmount, {once: true})
        } else
            el?.classList.remove(styles.exitAnimation)
    }
    useEffect(() => {
        try {
            ReactDOM.unmountComponentAtNode(props.contextMenuRef)
        } catch (e) {
        }
        if (props.render) {
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
        disabled: PropTypes.bool,
        icon: PropTypes.object
    })),
    render: PropTypes.bool,
    contextMenuRef: PropTypes.object,
    placement: PropTypes.shape({
        clientX: PropTypes.number,
        clientY: PropTypes.number
    }),
    handleClose: PropTypes.func

}
