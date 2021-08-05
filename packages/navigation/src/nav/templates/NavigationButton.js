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
                    justifyContent: props.extended ? 'space-between' : 'center',
                    backgroundColor: props.highlight ? '#E8F0FE' : undefined,
                    padding: props.extended ? '8px 16px' : undefined
                }}>


                {props.icon}

                <div className={styles.buttonLabel}
                    style={{
                        display: props.extended ? undefined : 'none',
                    }}>{props.label}</div>

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
