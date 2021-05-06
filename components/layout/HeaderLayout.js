import PropTypes from 'prop-types'
import React, {useCallback, useState} from "react";
import {Button, Modal} from "@material-ui/core";
import styles from "../../styles/shared/Shared.module.css";
import animations from "../../styles/shared/Animations.module.css";
import mainStyles from "../../styles/shared/Main.module.css";
import {FilterListRounded} from "@material-ui/icons";
import Head from "next/head";
import TabsComponent from "../modules/navigation/TabsComponent";
import Stepper from "../modules/navigation/Stepper";

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
                <div className={[styles.listFilterModal, animations.slideInRightAnimation].join(' ')}>
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

            <div style={{
                display: 'grid',
                justifyItems: 'center',
                alignContent: 'space-between',
                width: '100%',
                backgroundColor: '#f5f6f8',
                minHeight: '16.6%',
                height: 'auto',
                paddingBottom: props.availableTabs !== undefined ? null : '10px',
                position: 'sticky',
                top: 0,
                zIndex: 1,
                gap: props.availableTabs !== undefined ? '16px' : null
            }}>

                <div className={mainStyles.displayInlineSpaced} style={{width: props.width}}>
                    {typeof (props.title) === 'string' ?
                        <div>
                            <p className={mainStyles.primaryHeader}
                               style={{marginBottom: props.information !== undefined ? 0 : null}}>
                                {props.title}
                            </p>
                            {props.information !== undefined ?
                                <div className={mainStyles.tertiaryParagraph}
                                     style={{color: '#555555', marginBottom: '10px'}}>
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
                            <FilterListRounded style={{color: '#777777'}}/>
                        </Button>
                        : null
                    }
                </div>
                {props.searchComponent !== undefined ?
                    <div style={{width: props.width}}>
                        {props.searchComponent}
                    </div>
                    : null
                }
                {props.activeFiltersComponent !== undefined ?
                    <div style={{width: props.width}}>
                        {props.activeFiltersComponent}
                    </div>
                    : null}
                {props.availableTabs !== undefined ?
                    <div style={{width: props.width}} key={'header-tab-component'}>
                        <TabsComponent buttons={props.availableTabs.tabs} setOpenTab={props.availableTabs.setOpenTab}
                                       openTab={props.availableTabs.openTab}/>

                    </div>
                    :
                    null
                }
                {props.stepper !== undefined ?
                    <div style={{width: props.width}} key={'header-stepper-component'}>
                        <Stepper buttons={props.stepper.tabs} setOpenTab={props.stepper.setOpenTab}
                                 openTab={props.stepper.openTab}/>

                    </div> : null}
            </div>

        </>
    )
}
HeaderLayout.propTypes ={
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