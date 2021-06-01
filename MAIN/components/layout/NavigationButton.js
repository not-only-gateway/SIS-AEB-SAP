import React from 'react'
import styles from '../../styles/Navigation.module.css'
import Link from 'next/link'
import PropTypes from 'prop-types'
import mainStyles from '../../styles/shared/Main.module.css'

export default function NavigationButton(props) {
    const content = (
        <button
            className={styles.buttonContainer}
            onClick={() => {
                if (props.asButton)
                    props.handleClick()
            }}
            style={{
                backgroundColor: props.highlight ? '#0095ff' : props.lightTheme ? 'white' : null,
                color: props.highlight ? 'white' : props.lightTheme ? '#222228' : null,
                width: props.width ? props.width : undefined,
                justifyContent: props.icon === undefined || props.icon === null ? 'center' : undefined
            }}>
            {props.labelFirst || props.icon === undefined || props.icon === null ? null :
                <div className={mainStyles.displayInlineCenter}>
                    {props.icon}
                </div>
            }
            <div style={{
                marginLeft: props.labelFirst || props.icon === undefined || props.icon === null ? undefined : '8px',
                marginRight: !props.labelFirst || props.icon === undefined || props.icon === null ? undefined : '8px',
                fontSize: '.9rem',
            }}> {props.label}</div>
            {!props.labelFirst || props.icon === undefined || props.icon === null ? null :
                <div className={mainStyles.displayInlineCenter}>
                    {props.icon}
                </div>
            }
        </button>
    )
    return (
        <div>
            {props.asButton ?
                content
                :
                <Link href={{
                    pathname: props.linkPath,
                    locale: props.locale,
                    query: props.linkQuery !== undefined ? props.linkQuery : null
                }}>
                    {content}
                </Link>
            }
        </div>
    )
}

NavigationButton.propTypes = {
    handleClick: PropTypes.func,
    asButton: PropTypes.bool,
    highlight: PropTypes.bool,
    linkPath: PropTypes.string,
    linkQuery: PropTypes.object,
    icon: PropTypes.element,
    locale: PropTypes.string,
    label: PropTypes.any,
    labelFirst: PropTypes.bool,
    lightTheme: PropTypes.bool,
    width: PropTypes.string
}
