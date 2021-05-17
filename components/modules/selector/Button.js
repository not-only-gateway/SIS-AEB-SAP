import PropTypes from 'prop-types'
import React from "react";

export default function Button(props) {
    return (
        <button style={{
            width:props.width,
            backgroundColor: props.highlight ? props.highlightType === 'white' ? 'white' : '#0095ff' : "transparent",
            color: !props.disabled ?  '#262626' : '#555555',
            borderRadius: props.rounded ? '32px' : '5px',
            boxShadow: props.highlight ? 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px' : 'unset',
            outline: 'none',
            border: 'none',
            fontSize: '.9rem',
            padding: props.paddingType === 'default' ? '8px' : '8px 32px 8px 32px',
            transition: '200ms ease-in-out',
            fontWeight: 550
        }} disabled={props.disabled} onClick={() => props.handleClick()}>
            {props.content}
        </button>
    )
}

Button.propTypes = {
    handleClick: PropTypes.func,
    disabled: PropTypes.bool,
    content: PropTypes.any,
    highlightType: PropTypes.oneOf([
        'white',
        'default'
    ]),
    rounded: PropTypes.bool,
    highlight: PropTypes.bool,
    width: PropTypes.string,
    paddingType: PropTypes.oneOf([
        'long',
        'default'
    ]),
}