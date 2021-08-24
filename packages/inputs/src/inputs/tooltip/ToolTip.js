import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import styles from './styles/Styles.module.css'
import {useEffect, useRef} from "react";
import React from 'react'

export default function ToolTip(props) {
  const toolTip = (
    <div className={styles.container}>
      {props.content}
    </div>
  )
  const ref = useRef()
  const mountingPoint = useRef();


  const hover = () => {
    ReactDOM.unmountComponentAtNode(
      mountingPoint.current
    )
    ReactDOM.render(
      toolTip,
      mountingPoint.current
    )
    const rect = ref.current?.parentNode.getBoundingClientRect()
    if (rect !== undefined && mountingPoint.current !== undefined && mountingPoint.current !== null) {
      mountingPoint.current.style.position = 'fixed'
      mountingPoint.current.style.zIndex = '999'
      mountingPoint.current.style.top = (rect.top + rect.height + 16) + 'px'
      mountingPoint.current.style.left = (rect.left + rect.width / 2) + 'px'
    }

  }
  const hoverEnd = () => {
    ReactDOM.unmountComponentAtNode(
      mountingPoint.current
    )
  }
  useEffect(() => {
    const newElement = document.createElement("div")
    mountingPoint.current = newElement
    document.body.appendChild(newElement)

    ref.current?.parentNode.addEventListener('mouseenter', hover)
    ref.current?.parentNode.addEventListener('mouseleave', hoverEnd)

    return () => {
      ref.current?.parentNode.removeEventListener('mouseenter', hover)
      ref.current?.parentNode.removeEventListener('mouseleave', hoverEnd)
      ReactDOM.unmountComponentAtNode(
        mountingPoint.current
      )
    }
  })

  return <div ref={ref}/>
}

ToolTip.propTypes = {
  content: PropTypes.string,
}
