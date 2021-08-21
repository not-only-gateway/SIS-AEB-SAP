import React, {useEffect, useState} from "react";
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import styles from '../shared/styles/Styles.module.css'
export default function SelectBox(props) {
    let newElement

    const handleClose = (event) => {
        if(!document.elementsFromPoint(event.clientX, event.clientY).includes(newElement)) {
            newElement.classList.add(styles.fadeOut)
            newElement.addEventListener('animationend', () => {
                ReactDOM.unmountComponentAtNode(
                    newElement
                )
                props.setOpen(false)
            }, {once: true})
        }
    }

    useEffect(() => {
        newElement = document.createElement('div')
        document.body.appendChild(newElement)
        document.addEventListener('mousedown', handleClose)

        if (props.open) {
            ReactDOM.unmountComponentAtNode(
                newElement
            )
            ReactDOM.render(
                props.children,
                newElement
            )
            newElement.classList.add(styles.fadeIn)
            newElement.style.width = '400px'
            newElement.style.height = 'auto'
            newElement.style.position = 'fixed'
            newElement.style.zIndex = '999'
            newElement.style.left = `${props.reference.getBoundingClientRect().left + props.reference.getBoundingClientRect().width/2}px`
            newElement.style.top = `${props.reference.getBoundingClientRect().top}px`
            newElement.style.transform = `translateX(-50%)`
        }

        return () => {
            document.removeEventListener('mousedown', handleClose)
            document.body.removeChild(newElement)
        }
    }, [props.open])

    return null
}

SelectBox.propTypes = {
    open: PropTypes.bool,
    setOpen: PropTypes.bool,
    children: PropTypes.node,
    reference: PropTypes.object
}