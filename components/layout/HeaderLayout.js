import PropTypes from 'prop-types'
import React, {useCallback, useState} from "react";
import {Button, Modal} from "@material-ui/core";

import animations from "../../styles/shared/Animations.module.css";
import mainStyles from "../../styles/shared/Main.module.css";
import {FilterListRounded} from "@material-ui/icons";
import Head from "next/head";
import TabsComponent from "../modules/navigation/TabsComponent";
import Stepper from "../modules/navigation/Stepper";
import styles from '../../styles/component/Component.module.css'

export default function HeaderLayout(props) {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleButtonClick = useCallback(() => {
        // Toggle the `isModalVisible` value:
        setIsModalVisible(prevIsModalVisible => !prevIsModalVisible);
    }, []);

    function RenderModalTest() {

        return (
            <Modal

                open={isModalVisible}
                onClose={handleButtonClick}
            >
                <div className={[styles.FilterModal, animations.slideInRightAnimation].join(' ')}>
                    {props.filterComponent}
                </div>
            </Modal>
        )
    }

    return (
        <>

            {RenderModalTest()}
            <Head>
                <title>{props.pageTitle}</title>
            </Head>

            <div className={styles.HeaderLayout} style={{
                borderBottom: 'hsla(210, 11%, 78%, 0.5)  .7px solid', width: props.width
            }}>

                <div className={mainStyles.displayInlineSpaced} style={{width: '100%'}}>
                    {typeof (props.title) === 'string' ?
                        <div style={{display: 'grid', gap: '.4rem'}}>
                            <div style={{
                                fontSize: '1.7rem',
                                fontWeight: 570,
                                paddingTop: !props.information ? '16px' : '8px',
                                paddingBottom: !props.information ? '16px' : 0
                            }}>
                                {props.title}
                            </div>
                            {props.information !== undefined ?
                                <div className={mainStyles.tertiaryParagraph}
                                     style={{color: '#555555', paddingBottom: '8px'}}>
                                    {props.information}
                                </div>
                                :
                                null
                            }

                        </div>
                        :
                        props.title
                    }
                    {props.filterComponent !== undefined ?
                        <Button onClick={handleButtonClick}>
                            <FilterListRounded style={{color: 'black'}}/>
                        </Button>
                        : null
                    }
                </div>
                {props.searchComponent !== undefined ?

                    props.searchComponent

                    : null
                }
                {props.activeFiltersComponent !== undefined ?

                    props.activeFiltersComponent

                    : null}
                {props.availableTabs !== undefined ?
                    <TabsComponent buttons={props.availableTabs.tabs} setOpenTab={props.availableTabs.setOpenTab}
                                   openTab={props.availableTabs.openTab}/>

                    :
                    null
                }
                {props.stepper !== undefined ?
                    <Stepper buttons={props.stepper.tabs} setOpenTab={props.stepper.setOpenTab}
                             openTab={props.stepper.openTab}/>

                    : null}
            </div>

        </>
    )
}
HeaderLayout.propTypes = {
    title: PropTypes.any,
    searchComponent: PropTypes.object,
    filterComponent: PropTypes.object,
    availableTabs: {
        tabs: PropTypes.array,
        openTab: PropTypes.number,
        setOpenTab: PropTypes.func
    },
    pageTitle: PropTypes.string,
    information: PropTypes.string,
    activeFiltersComponent: PropTypes.object,
    stepper: PropTypes.bool,
    width: PropTypes.string
}