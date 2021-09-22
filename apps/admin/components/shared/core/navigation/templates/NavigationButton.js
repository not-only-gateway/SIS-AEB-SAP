import Link from 'next/link'
import PropTypes from 'prop-types'
import styles from '../styles/Navigation.module.css'
import React from 'react'
import ToolTip from "../../tooltip/ToolTip";

export default function NavigationButton(props) {
    const content = (
        <div>
            <ToolTip content={props.label} align={'middle'} justify={'end'}/>


            <button
                className={styles.buttonContainer} disabled={props.disabled}
                style={{
                    width: props.extended ? '100%' : undefined,
                    display: props.extended ? undefined : 'grid',
                    gap: props.extended ? undefined : '2px',
                    justifyContent: props.extended ? 'space-between' : 'center',
                    justifyItems: props.extended ? undefined : 'center',
                    backgroundColor: props.highlight ? '#E8F0FE' : undefined,
                    padding: props.extended ? '8px' : undefined
                }}
            >
                <span style={{color: props.disabled ? '#999999' : props.highlight ? '#0095ff' : '#777777'}}>
                    {props.icon}
                </span>
                <button className={[styles.buttonLabel, styles.overflowEllipsis].join(' ')} disabled={props.disabled}
                        style={{
                            color: props.highlight ? '#0095ff' : undefined,
                            maxWidth: '100%',
                            fontSize: props.extended ? undefined : '.65rem',
                            textAlign: props.extended ? undefined : 'center',
                        }}>{props.label}</button>
            </button>
        </div>

    )
    return (
        props.disabled ?
            content
            :
            <Link href={{
                pathname: props.linkPath,
                query: props.linkQuery !== undefined ? props.linkQuery : null
            }}>
                {content}
            </Link>
    )
}

NavigationButton.propTypes = {
    extended: PropTypes.bool,
    highlight: PropTypes.bool,
    linkPath: PropTypes.string,
    linkQuery: PropTypes.object,
    icon: PropTypes.object,
    label: PropTypes.any
}
