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
                locale: props.locale,
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
                {/*<Button style={{*/}
                {/*    width: '100%',*/}
                {/*    height: 'auto',*/}
                {/*    textTransform: 'none',*/}
                {/*    borderRadius: '8px',*/}
                {/*    backgroundColor: props.highlight ? '#0095ff' :'transparent',*/}
                {/*    transition: '300ms ease-in-out',*/}
                {/*    padding: props.reduced ? '16px' : '10px',*/}


                {/*}}>*/}
                {/*    <div className={props.reduced ? mainStyles.displayInlineCenter : mainStyles.displayInlineStart}*/}
                {/*         style={{*/}
                {/*             width: '100%',*/}
                {/*             color: props.highlight ? 'white' : hovered ? '#0095ff' : '#a6a6a9',*/}
                {/*             transition: '300ms ease-in-out',*/}
                {/*         }}>*/}
                {/*        <div className={mainStyles.displayInlineCenter}>*/}
                {/*            {props.icon}*/}
                {/*        </div>*/}
                {/*        <div style={{*/}
                {/*            display: props.reduced ? 'none' : 'unset',*/}
                {/*            marginLeft: '8px',*/}
                {/*            fontSize: '.9rem',*/}
                {/*        }}> {props.label}</div>*/}
                {/*    </div>*/}
                {/*</Button>*/}
            </Link>
        </div>
    )
}

NavigationButton.propTypes = {
    highlight: PropTypes.bool,
    linkPath: PropTypes.string,
    linkQuery: PropTypes.object,
    icon: PropTypes.element,
    locale: PropTypes.string,
    label: PropTypes.any,
    reduced: PropTypes.bool,
    initialValue: PropTypes.bool,
}
