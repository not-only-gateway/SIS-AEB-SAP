import PropTypes from 'prop-types'
import {useEffect, useRef, useState} from "react";
import styles from "../styles/List.module.css";
import ReactDOM from 'react-dom'

export default function ContextMenu(props) {
    let entity= null
    const [e, setE] = useState({})

    const remove = () => {
        props.mountingPoint.classList.add(styles.exitAnimation)

        ReactDOM.unmountComponentAtNode(props.mountingPoint)
    }
    const preventContext = (event) => {
        event.preventDefault()
    }
    const handleMouseUp = (event) => {
        event.preventDefault()
        if (event.button === 2 && event.target.id.includes('*-') && event.target.id.replace('*-', '') !== 'undefined') {
            setE(event)
            const data = props.data[parseInt(event.target.id.replace('*-', ''))]
            console.log(data)
            console.log(props.data)
            const context = (
                <div className={styles.context}>
                    {props.options.map((button, i) => (
                        <button
                            onClick={() => {
                                button.onClick(data)
                                remove()
                            }} key={i + '-button'} id={i + '-button'}
                            disabled={button.disabled}
                            className={styles.contextButton}
                        >
                            {button.icon}
                            {button.label}
                        </button>
                    ))}
                </div>
            )
            ReactDOM.render(context,props.mountingPoint)
            props.mountingPoint.style.position = 'fixed'
            props.mountingPoint.style.zIndex = 999
            props.mountingPoint.style.top = (event.clientY - props.options.length * 40) + 'px'
            props.mountingPoint.style.left = (event.clientX ) + 'px'
        }

    }
    const handleExit = (event) => {
        console.log(event.target)
        if (event && (event.button === 2 && entity !== null)) {
            // setEntity(null)
            remove()
        }
    }

    useEffect(() => {
        document.body.addEventListener('contextmenu', preventContext)
        document.addEventListener('mouseup', handleMouseUp)
        document.addEventListener('mousedown', handleExit)
        return () => {
            document.body.removeEventListener('contextmenu', preventContext)
            document.removeEventListener('mousedown', handleExit)
            document.removeEventListener('mouseup', handleMouseUp)
        }
    })

    return null
}

ContextMenu.propTypes = {
    mountingPoint: PropTypes.object,
    options: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        icon: PropTypes.object,
        onClick: PropTypes.func,
        disabled: PropTypes.bool
    })),
    data: PropTypes.arrayOf(PropTypes.object)
}
