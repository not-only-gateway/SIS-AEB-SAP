import PropTypes from 'prop-types'
import React, {useState} from "react";
import styles from '../../../styles/Input.module.css'

export default function Button(props) {
    const [focused, setFocused] = useState(false)
    const [hovered, setHovered] = useState(false)
    return (
        <button
            onMouseDown={() => setFocused(true)}
            onMouseUp={() => setFocused(false)}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => {
                setFocused(false)
                setHovered(false)
            }}

            style={{
                width: props.width,
                backgroundColor: props.backgroundColor && !props.disabled ? props.backgroundColor : props.disabled? 'rgba(0,0,0,0.1)' : 'unset',
                color: !props.disabled ? (props.hoverHighlight && hovered ? '#0095ff' : props.fontColor) : '#555555',
                borderRadius: props.variant && props.variant !== 'default' ? (props.variant === 'rounded' ? '32px' : '50%') : '5px',
                boxShadow: props.elevation && !focused  && !props.disabled ? 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px' : 'unset',
                padding: props.padding ? props.padding : '8px',
                height: 'auto',

                outline: 'none',
                border: props.border,
                // fontSize: '.9rem',
                transition: '200ms ease-in-out',
                cursor: props.disabled ? 'initial' : 'pointer',
                display: 'flex',
                justifyContent: props.justification ? props.justification :  'center'
            }} disabled={props.disabled}
            onClick={() => {
                if (props.handleClick !== undefined)
                    props.handleClick()
            }}
        >
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
    hoverHighlight: PropTypes.bool,
    justification: PropTypes.string
}