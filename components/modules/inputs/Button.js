import PropTypes from 'prop-types'
import React, {useState} from "react";
import styles from '../../../styles/Input.module.css'

export default function Button(props) {
    const [hovered, setHovered] = useState(false)
    return (
        <button
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                width: props.width,
                backgroundColor: props.backgroundColor ? props.backgroundColor : 'unset',
                color: !props.disabled ?  props.fontColor : '#555555',
                borderRadius: props.variant && props.variant !== 'default' ? (props.variant === 'rounded' ? '32px' : '50%') : '5px',
                boxShadow: props.elevation ? 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px' : 'unset',
                padding: props.padding ? props.padding : '8px',
                height: 'auto',

                outline: 'none',
                border: props.border,
                fontSize: '.9rem',

                transition: '200ms ease-in-out',
                cursor: 'pointer'
            }} disabled={props.disabled} onClick={() => props.handleClick()}>
            {props.content}
        </button>
    )
}

Button.propTypes = {
    handleClick: PropTypes.func,
    disabled: PropTypes.bool,
    content: PropTypes.any,
    backgroundColor: PropTypes.any,
    fontColor: PropTypes.any,
    padding: PropTypes.string,
    variant: PropTypes.oneOf([
        'rounded',
        'default',
        'circle'
    ]),
    border: PropTypes.string,
    elevation: PropTypes.bool,
    width: PropTypes.string,
    hoverHighlight: PropTypes.bool
}