import React from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'
import styles from './Navigation.module.css'

export default function NavigationButton(props) {

    return (
        <Link href={{
            pathname: props.linkPath,
            query: props.linkQuery !== undefined ? props.linkQuery : null
        }}>

            <button
                className={styles.buttonContainer}
                style={{
                    backgroundColor: props.highlight ? '#0095ff' : null,
                    color: props.highlight ? 'white' : null,
                }}>


                {props.icon}

                <div style={{
                    marginLeft: '8px',
                    fontSize: '.9rem',
                    display: !props.label ? 'none' : undefined
                }}> {props.label}</div>

            </button>


        </Link>
    )
}

NavigationButton.propTypes = {
    highlight: PropTypes.bool,
    linkPath: PropTypes.string,
    linkQuery: PropTypes.object,
    icon: PropTypes.element,

    label: PropTypes.any,
    initialValue: PropTypes.bool,
}
