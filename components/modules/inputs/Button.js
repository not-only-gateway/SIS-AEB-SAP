import PropTypes from 'prop-types'
import React, {useState} from "react";

export default function Button(props) {
    const [focused, setFocused] = useState(false)
    const [hovered, setHovered] = useState(false)
    function getBorder(){
        let response = '5px'
        switch (props.variant){
            case 'rounded':{
                response = '32px'
                break
            }
            case'circular':{
                response = '50%'
                break
            }
            case 'custom':{
                response = props.borderRadius
                break
            }
            default:
                break
        }
        return response
    }

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
                backgroundColor: props.backgroundColor && !props.disabled ? props.backgroundColor : props.disabled ? 'rgba(0,0,0,0.1)' : 'unset',
                color: !props.disabled ? (props.hoverHighlight && hovered ? props.colorVariant === 'secondary' ? '#ff4940' : '#0095ff' : props.fontColor) : '#555555',
                borderRadius:  getBorder(),
                boxShadow: props.boxShadow,
                padding: props.padding ? props.padding : '8px',
                height: 'auto',
                fontFamily: '\'Roboto\' !important',
                outline: 'none',
                border: props.border,
                // fontSize: '.9rem',
                transition: '200ms ease-in-out',
                cursor: props.disabled ? 'initial' : 'pointer',
                display: 'flex',
                justifyContent: props.justification ? props.justification : 'center'
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
        'circle',
        'custom'
    ]),
    border: PropTypes.string,
    boxShadow: PropTypes.any,
    width: PropTypes.string,
    hoverHighlight: PropTypes.bool,
    justification: PropTypes.string,
    colorVariant: PropTypes.oneOf([
        'default',
        'secondary'
    ]),
    borderRadius: PropTypes.any
}