import React, {useEffect, useState} from "react";
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import styles from "../text/styles/Input.module.css";

export default function SelectBox(props) {
    let newElement

    const handleClose = () => {
        // ReactDOM.unmountComponentAtNode(
        //     newElement
        // )
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
            newElement.style.width = '300px'
            newElement.style.height = 'auto'
            newElement.style.position = 'fixed'
            newElement.style.display = 'block'
            newElement.style.zIndex = '999'
            newElement.style.left = `${props.reference.getBoundingClientRect().left}px`
            newElement.style.top = props.reference.getBoundingClientRect().top + 'px'

        } else
            handleClose()

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