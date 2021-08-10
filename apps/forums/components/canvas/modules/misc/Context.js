import PropTypes from 'prop-types'
import styles from './styles/Styles.module.css'
import {useEffect, useRef, useState} from "react";
import CanvasContext from "./packages/CanvasContext";
import NodeContext from "./packages/NodeContext";
import NodeTemplate from "../../templates/NodeTemplate";

export default function Context(props) {
    const ref = useRef()
    const [onRender, setOnRender] = useState(false)
    const [buttons, setButtons] = useState([])

    const handleExit = () => {
        ref.current.classList.add(styles.exitAnimation)
        ref.current.addEventListener('animationend', () => {
            if (ref.current.classList.length === 2) {
                setOnRender(false)
                ref.current.classList.remove(styles.exitAnimation)
                setButtons([])
            }
        }, {once: true})
    }

    useEffect(() => {
        let moved = false
        document.addEventListener('mouseup', event => {
            event.preventDefault()
            if (event.button === 2) {
                const el = document.elementFromPoint(event.clientX, event.clientY)
                let newButtons = []
                setOnRender(true)

                if (el !== null && el.id.includes('canvas'))
                    newButtons = CanvasContext
                else if (el.id.includes('node') || el.className.includes('Node'))
                    newButtons = NodeContext

                setButtons(newButtons)
                const marginTop = newButtons.length * 40
                if (event.clientY > marginTop)
                    ref.current.style.top = (event.clientY - marginTop) + 'px'
                else
                    ref.current.style.top = event.clientY + 'px'

                if ((document.documentElement.offsetWidth - event.clientX) > 250)
                    ref.current.style.left = event.clientX + 'px'
                else
                    ref.current.style.left = (event.clientX - 250) + 'px'
            }
        })
        document.addEventListener('mousedown', event => {
            console.log(event.button)
            if (event.button === 0 && !document.elementsFromPoint(event.clientX, event.clientY).includes(ref.current))
                handleExit()
        })

    }, [])
    return (
        <div ref={ref} style={{display: onRender ? undefined : 'none'}}
             className={onRender ? styles.context : undefined}>
            {buttons.map((button, i) => (
                <button
                    onClick={() => {
                        button.onClick(props)
                        handleExit()
                    }} key={i + '-button'} id={i + '-button'}
                    disabled={button.getDisabled !== undefined ? button.getDisabled(props) : false}
                    className={styles.contextButton}
                >
                    {button.icon}
                    {button.label}
                </button>
            ))}
        </div>
    )
}
Context.propTypes = {
    data: PropTypes.object,
    setData: PropTypes.object,

    scale: PropTypes.number,
    setScale: PropTypes.func,

    copiedNode: NodeTemplate,
    setCopiedNode: PropTypes.func
}
