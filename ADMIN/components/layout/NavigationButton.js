import React from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'
import styles from '../../styles/Navigation.module.css'

export default function NavigationButton(props) {

    return (
        <div
            style={{
                borderRadius: '8px',
                width: (props.reduced ? '55px' : '220px'),
                height: 'fit-content'
            }}
        >
            <Link href={{
                pathname: props.linkPath,
                query: props.linkQuery !== undefined ? props.linkQuery : null
            }}>
                <button
                    className={styles.buttonContainer}
                    style={{
                        backgroundColor: props.highlight ? '#0095ff' : null,
                        color: props.highlight ? 'white' : null,
                        width: '100%',
                        height: '55px',
                        justifyContent: props.reduced ? 'center' : 'space-between'
                    }}>


                    {props.icon}


                    <div style={{
                        marginLeft: '8px',
                        fontSize: '.9rem',
                        display: props.reduced ? 'none' : undefined
                    }}> {props.label}</div>

                </button>
            </Link>
        </div>
    )
}

NavigationButton.propTypes = {
    highlight: PropTypes.bool,
    linkPath: PropTypes.string,
    linkQuery: PropTypes.object,
    icon: PropTypes.element,

    label: PropTypes.any,
    reduced: PropTypes.bool,
    initialValue: PropTypes.bool,
}
