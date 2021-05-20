import PropTypes from 'prop-types'
import React, {useState} from "react";
import {Button, Modal} from "@material-ui/core";

import animations from "../../styles/shared/Animations.module.css";
import mainStyles from "../../styles/shared/Main.module.css";
import {CloseRounded, FilterListRounded} from "@material-ui/icons";
import Head from "next/head";
import HorizontalTabs from "./navigation/HorizontalTabs";
import Stepper from "./navigation/Stepper";
import styles from '../../styles/component/Component.module.css'
import shared from "../../styles/shared/Shared.module.css";

export default function HeaderLayout(props) {


    return (
        <div style={{
            position: 'sticky',
            top: 0,
            background: 'white',
            transition: '300ms ease-in-out',
            zIndex: '50',
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
                {props.availableTabs !== undefined ?
                    <HorizontalTabs buttons={props.availableTabs.tabs} setOpenTab={props.availableTabs.setOpenTab}
                                    openTab={props.availableTabs.openTab}/>

                    :
                    null
                }
                {props.stepper !== undefined ?
                    <Stepper buttons={props.stepper.tabs} setOpenTab={props.stepper.setOpenTab}
                             openTab={props.stepper.openTab}/>

                    : null}
            </div>

        </div>
    )
}
HeaderLayout.propTypes = {
    title: PropTypes.any,
    searchComponent: PropTypes.object,
    availableTabs: PropTypes.shape({
        tabs: PropTypes.array,
        openTab: PropTypes.number,
        setOpenTab: PropTypes.func
    }),
    pageTitle: PropTypes.string,
    information: PropTypes.string,
    activeFiltersComponent: PropTypes.object,
    stepper: PropTypes.bool,
    width: PropTypes.string
}