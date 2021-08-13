import PropTypes from 'prop-types'
import {useEffect, useRef, useState} from "react";
import styles from "../styles/List.module.css";
import ReactDOM from 'react-dom'

export default function ContextMenu(props) {
    let entity = null
    const remove = () => {
        props.mountingPoint.classList.add(styles.exitAnimation)

        ReactDOM.unmountComponentAtNode(props.mountingPoint)
    }
    const preventContext = (event) => {
        event.preventDefault()
    }
    const handleMouseUp = (event) => {
        event.preventDefault()
        const parsedIndex = event.target.id.replace('*-', '').replace('-row', '').replace('-field', '')
        if (event.button === 2 && event.target.id.includes('*-') && parsedIndex !== 'undefined') {
            const data = props.data[parseInt(parsedIndex)]

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
            ReactDOM.render(context, props.mountingPoint)
            props.mountingPoint.style.position = 'fixed'
            props.mountingPoint.style.zIndex = 999
            props.mountingPoint.style.top = (event.clientY - props.options.length * 40) + 'px'
            props.mountingPoint.style.left = (event.clientX) + 'px'
        }

    }
    const handleExit = (event) => {
        console.log(event.target.className)
        console.log(entity)
        if (event && event.button === 2 && typeof event.target.className === "object" || (typeof event.target.className === "string" && !event.target.className.includes('List_contextButton')))  {
            remove()
            console.log('HERE')
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
