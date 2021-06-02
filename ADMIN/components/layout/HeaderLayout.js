import PropTypes from 'prop-types'
import React, {useEffect, useState} from "react";
import mainStyles from "../../styles/shared/Main.module.css";
import Head from "next/head";
import styles from '../../styles/component/Component.module.css'

export default function HeaderLayout(props) {
    const [height, setHeight] = useState('170px')
    //
    // useEffect(() => {
    //     if (!scrolledHeight) {
    //         document.getElementById('scrollableDiv').addEventListener('scroll', () => {
    //             console.log(document.getElementById('header').offsetTop)
    //             if (document.getElementById('header').offsetTop > 50) {
    //                 setScrolledHeight(true)
    //
    //             }
    //
    //             else if (document.getElementById('header').offsetTop === 0)
    //                 setScrolledHeight(false)
    //         })
    //         // if (document.getElementById('scrollableDiv') !== null)
    //         //     return () => {
    //         //         document.getElementById('scrollableDiv').removeEventListener('scroll', () => {
    //         //             if (document.getElementById('header').offsetTop === 0)
    //         //                 setScrolledHeight(false)
    //         //         })
    //         //     }
    //     }
    // })

    return (
        <div id={'header'} style={{
            position: 'sticky',
            top: 0,
            background: '#f4f5fa',
            transition: '300ms ease-in-out',
            zIndex: '50',
            height: height
        }}>
            <Head>
                <title>{props.pageTitle}</title>
                <link rel="icon" href={"/LOGO.png"} type="image/x-icon"/>
            </Head>

            <div className={styles.HeaderLayout} style={{
                width: props.width
            }}>

                <div className={mainStyles.displayInlineSpaced}
                     style={{width: '100%', marginTop: '15px', height: 'auto',}}>
                    <div className={mainStyles.displayInlineStart} style={{width: '100%', height: '100%'}}>
                        <div style={{
                            display: 'grid',
                            gap: '.4rem',
                            width: typeof (props.title) === 'string' ? 'initial' : '100%'
                        }}>
                            {typeof (props.title) === 'string' ?
                                <h2 style={{
                                    marginBottom: "unset",
                                    marginTop: "unset",
                                }}>
                                    {props.title}

                                </h2>
                                :
                                <div style={{width: '100%'}}>
                                    {props.title}
                                </div>
                            }
                            {props.information !== undefined ?
                                <div className={mainStyles.tertiaryParagraph}
                                     style={{color: '#555555', paddingBottom: '8px'}}>
                                    {props.information}
                                </div>
                                :
                                null
                            }
                        </div>

                    </div>
                    {props.searchComponent !== undefined ?
                        props.searchComponent
                        : null
                    }
                </div>

                {props.activeFiltersComponent !== undefined ?

                    props.activeFiltersComponent

                    : null}
                {props.tabs !== undefined ?
                    props.tabs

                    :
                    null
                }
            </div>

        </div>
    )
}
HeaderLayout.propTypes = {
    title: PropTypes.any,
    searchComponent: PropTypes.object,
    tabs: PropTypes.object,
    pageTitle: PropTypes.string,
    information: PropTypes.string,
    activeFiltersComponent: PropTypes.object,
    width: PropTypes.string
}