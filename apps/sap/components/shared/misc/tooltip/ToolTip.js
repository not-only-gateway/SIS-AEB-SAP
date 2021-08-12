import PropTypes, {func} from 'prop-types'
import ReactDOM from 'react-dom'
import styles from './styles/Styles.module.css'
import {useEffect, useRef} from "react";

export default function ToolTip(props) {
    const toolTip = (
        <div className={styles.container}>
            {props.content}
        </div>
    )
    const ref = useRef()
    const mountingPoint = document.createElement("div");
    document.body.appendChild(mountingPoint)

    const hover = () => {
        ReactDOM.unmountComponentAtNode(
            mountingPoint
        )
        ReactDOM.render(
            toolTip,
            mountingPoint
        )
        const rect = ref.current?.parentNode.getBoundingClientRect()
        if (rect !== undefined) {
            mountingPoint.style.position = 'fixed'
            mountingPoint.style.zIndex = '999'
            mountingPoint.style.top = (rect.top + rect.height + 16) + 'px'
            mountingPoint.style.left = (rect.left + rect.width / 2) + 'px'
        }

    }
    const hoverEnd = () => {
        ReactDOM.unmountComponentAtNode(
            mountingPoint
        )
    }
    useEffect(() => {

        ref.current?.parentNode.addEventListener('mouseenter', hover)
        ref.current?.parentNode.addEventListener('mouseleave', hoverEnd)

        return () => {
            ref.current?.parentNode.removeEventListener('mouseenter', hover)
            ref.current?.parentNode.removeEventListener('mouseleave', hoverEnd)
            ReactDOM.unmountComponentAtNode(
                mountingPoint
            )
            document.body.removeChild(mountingPoint)
        }
    })

    return <div ref={ref}/>
}

ToolTip.propTypes = {
    content: PropTypes.string,
}