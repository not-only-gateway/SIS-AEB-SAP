// import React from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'
import styles from '../styles/Navigation.module.css'
import animations from '../styles/Animations.module.css'
import React, {useEffect, useState} from 'react'
export default function NavigationButton(props) {
    const [hovered, setHovered] = useState(false)

    return (
        <Link href={{
            pathname: props.linkPath,
            query: props.linkQuery !== undefined ? props.linkQuery : null
        }}>

            <button
                id={'content-' + props.buttonKey + ':button'}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                className={styles.buttonContainer}
                style={{
                    width: props.extended ? '100%' : undefined,
                    justifyContent: props.extended ? 'space-between' : undefined,
                    border:  props.highlight ? '#ecedf2 1px solid' : 'transparent 1px solid',
                    backgroundColor:  props.highlight ? '#f4f5fa' : undefined,
                    color: props.highlight ? '#555555' : undefined,
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
