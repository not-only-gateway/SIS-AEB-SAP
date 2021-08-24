import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types'
import styles from '../shared/styles/Styles.module.css'

export default function SelectBox(props) {
    const handleMouseDown = (event) => {
        if (event.target.closest('.' + styles.selectBox) === null && props.open)
            props.setOpen(false)
    }
    useEffect(() => {
        document.addEventListener('mousedown', handleMouseDown)

        return () => {
            document.removeEventListener('mousedown', handleMouseDown)
        }
    }, [props.open])

    return (
        <div style={{visibility: !props.open ? 'hidden' : 'visible', opacity: !props.open ? '0' : '1'}}
             className={styles.selectBox}>
            {props.children}
        </div>
    )
}

SelectBox.propTypes = {
    open: PropTypes.bool,
    setOpen: PropTypes.bool,
    children: PropTypes.node,
    reference: PropTypes.object
}