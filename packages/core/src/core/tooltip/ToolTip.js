import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import styles from './styles/Styles.module.css'
import React, {useEffect, useRef} from "react";

export default function ToolTip(props) {
    const toolTip = (
        <div className={styles.container}>
            {/*<div className={styles.arrow}*/}
            {/*     style={{borderBottom: props.color !== undefined ? props.color + ' 10px solid' : undefined}}/>*/}
            <div className={styles.content} style={{display: props.content === undefined ? 'none' : undefined}}>
                {props.content}
            </div>
            {props.children}
        </div>
    )
    const ref = useRef()
    const mountingPoint = useRef();
    let timeout

    const hover = (event) => {
        timeout = setTimeout(() => {
            mountingPoint.current.classList.remove(styles.exitAnim)
            ReactDOM.unmountComponentAtNode(
                mountingPoint.current
            )
            ReactDOM.render(
                toolTip,
                mountingPoint.current
            )
            const rect = ref.current?.parentNode.getBoundingClientRect()
            if (rect !== undefined) {
                mountingPoint.current.style.position = 'fixed'
                mountingPoint.current.style.transform = `translate(-50%, 50%)`
                mountingPoint.current.style.zIndex = '999'
                mountingPoint.current.style.top = (rect.top + rect.height - 16) + 'px'
                mountingPoint.current.style.left = (event.clientX) + 'px'

            }
        }, 500)
    }
    const hoverEnd = (event) => {
        if(timeout !== undefined)
            clearTimeout(timeout)
        if (!document.elementsFromPoint(event.clientX, event.clientY).includes(mountingPoint.current)) {

            mountingPoint.current.classList.add(styles.exitAnim)
            mountingPoint.current.addEventListener('animationend', () => {

                if (mountingPoint.current.classList.length === 1)
                    ReactDOM.unmountComponentAtNode(
                        mountingPoint.current
                    )
            }, {once: true})
        }
    }
    useEffect(() => {
        const newElement = document.createElement("div")
        mountingPoint.current = newElement
        document.body.appendChild(newElement)

        ref.current?.parentNode.addEventListener('mouseenter', hover)
        ref.current?.parentNode.addEventListener('mouseleave', hoverEnd)
        mountingPoint.current?.addEventListener('mouseleave', hoverEnd)

        return () => {
            if(timeout !== undefined)
                clearTimeout(timeout)
            ref.current?.parentNode.removeEventListener('mouseenter', hover)
            ref.current?.parentNode.removeEventListener('mouseleave', hoverEnd)
            mountingPoint.current?.removeEventListener('mouseleave', hoverEnd)
            ReactDOM.unmountComponentAtNode(
                mountingPoint.current
            )
            document.body.removeChild(newElement)
        }
    })

    return <div ref={ref}/>
}

ToolTip.propTypes = {
    content: PropTypes.string,
    children: PropTypes.node,
    color: PropTypes.string
}