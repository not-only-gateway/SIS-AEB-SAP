import PropTypes from 'prop-types'
import React from "react";
import styles from '../../../styles/Input.module.css'

export default function Button(props) {
    return (
        <button style={{
            width: props.width,
            backgroundColor: props.highlight ? (props.highlightColor ? props.highlightColor : 'white') : "transparent",
            color: !props.disabled ? (props.fontHighlightColor && props.highlight ? props.fontHighlightColor : '#262626') : '#555555',
            borderRadius: props.variant && props.variant !== 'default' ? (props.variant === 'rounded' ? '32px' : '50%') : '5px',
            boxShadow: props.highlight ? 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px' : 'unset',
            padding: !props.paddingType ? 'unset' : (props.paddingType === 'default' ? '8px' : '8px 32px 8px 32px'),
            height: 'auto',

            outline: 'none',
            border: 'none',
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
    highlightColor: PropTypes.any,
    fontHighlightColor: PropTypes.any,
    variant: PropTypes.oneOf([
        'rounded',
        'default',
        'circle'
    ]),
    highlight: PropTypes.bool,
    width: PropTypes.string,
    paddingType: PropTypes.oneOf([
        'long',
        'default',
        'none'
    ]),
}