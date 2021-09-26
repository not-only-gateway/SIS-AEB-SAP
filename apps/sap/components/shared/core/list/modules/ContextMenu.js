import PropTypes from 'prop-types'
import React, {useEffect} from "react";
import styles from "../styles/List.module.css";
import ReactDOM from 'react-dom'

export default function ContextMenu(props) {
    let entity = null
    let target = null
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
            const data = props.data[0][parseInt(parsedIndex)]
            target = event.target.id.includes('-wrapper') ? event.target : event.target.id.includes('-row') ? event.target.parentNode : event.target.parentNode.parentNode
            target.style.background = '#E8F0FE'
            const context = (
                <div className={styles.context}>
                    {props.options.map((button, i) => (
                        <button
                            onClick={() => {
                                target.style.background = ''
                                button.onClick(data)
                                remove()
                            }} key={i + '-button'} id={i + '-button'}
                            disabled={button.disabled}
                            onMouseEnter={e => {
                                if (button.color !== undefined && button.color !== null)
                                    e.target.style.color = button.color
                                else
                                    e.target.style.color = '#0095ff'
                            }}
                            onMouseLeave={e => {
                                e.target.style.color = '#575757'
                            }}
                            className={styles.contextButton}
                        >
                            <div style={{width: '30px'}}>
                                {button.icon}
                            </div>
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
        if (event && event.button === 2 && typeof event.target.className === "object" || (typeof event.target.className === "string" && !event.target.className.includes('List_contextButton'))) {
            remove()
            if (target !== null)
                target.style.background = ''
            target = null
        }

    }

    useEffect(() => {
        if(props.options !== undefined && props.mountingPoint !== undefined){
            document.body.addEventListener('contextmenu', preventContext)
            document.addEventListener('mouseup', handleMouseUp)
            document.addEventListener('mousedown', handleExit)
        }
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
    data: PropTypes.array
}
