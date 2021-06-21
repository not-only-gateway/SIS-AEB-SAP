import Link from 'next/link'
import PropTypes from 'prop-types'
import styles from '../styles/Navigation.module.css'
import React from 'react'

export default function NavigationButton(props) {

    return (
        <Link href={{
            pathname: props.linkPath,
            query: props.linkQuery !== undefined ? props.linkQuery : null
        }}>

            <button
                id={'content-' + props.buttonKey + ':button'}
                className={styles.buttonContainer}
                style={{
                    width: props.extended ? '100%' : undefined,
                    justifyContent: props.extended ? 'space-between' : undefined,
                    backgroundColor: props.highlight ? '#E8F0FE' : undefined,
                    transition: '300ms'
                }}>


                {props.icon}

                <div
                    style={{
                        marginLeft: '8px',
                        fontSize: '.9rem',
                        overflow: "hidden",
                        fontWeight: 575
                    }}> {props.label}</div>

            </button>


        </Link>
    )
}

NavigationButton.propTypes = {
    extended: PropTypes.bool,
    highlight: PropTypes.bool,
    linkPath: PropTypes.string,
    linkQuery: PropTypes.object,
    icon: PropTypes.element,
    label: PropTypes.any,
    buttonKey: PropTypes.any,
    initialValue: PropTypes.bool,
}
