import PropTypes from 'prop-types'
import React, {useEffect, useMemo, useRef, useState} from "react";
import {Button, Modal, Tabs} from "@material-ui/core";
import styles from "../../styles/shared/Shared.module.css";
import animations from "../../styles/shared/Animations.module.css";
import mainStyles from "../../styles/shared/Main.module.css";
import {FilterListRounded} from "@material-ui/icons";
import Head from "next/head";
import TabsComponent from "./TabsComponent";

export default function HeaderLayout(props) {
    const [modal, setModal] = useState(false)


    function renderModal() {
        return (
            <Modal open={modal} onClose={() => setModal(false)}>
                <div className={[styles.listFilterModal, animations.slideInRightAnimation].join(' ')}>
                    {props.filterComponent}
                </div>

            </Modal>
        )
    }

    return (
        <>
            <Head>
                <title>{props.pageTitle}</title>
            </Head>

            <div style={{
                display: 'grid',
                justifyItems: 'center',
                alignContent: 'space-between',
                width: '100%',
                backgroundColor: '#f5f6f8',
                minHeight: '25%',
                paddingBottom: props.availableTabs !== undefined ? null : '10px',
                position: 'sticky',
                top: 0,
                zIndex: 1
            }}>

                <div className={mainStyles.displayInlineSpaced} style={{width: '75%'}}>
                    {typeof(props.title) === 'string' ?
                        <p className={mainStyles.primaryHeader}>
                            {props.title}
                        </p>
                    :
                        props.title
                    }
                    {props.filterComponent !== undefined ?
                        <Button onClick={() => setModal(true)}>
                            <FilterListRounded style={{color: '#777777'}}/>
                        </Button>
                        : null
                    }
                </div>
                {props.searchComponent !== undefined ?
                    <div style={{width: '75%'}}>
                        {props.searchComponent}
                    </div>
                    : null
                }
                {props.availableTabs !== undefined ?
                        <div style={{width: '75%'}}>
                            <TabsComponent buttons={props.availableTabs.tabs} setOpenTab={props.availableTabs.setOpenTab}
                                           openTab={props.availableTabs.openTab}/>
                        </div>
                    :
                    null
                }
            </div>
            {renderModal()}
        </>
    )
}
HeaderLayout.propTypes ={
    title: PropTypes.any,
    searchComponent: PropTypes.object,
    filterComponent: PropTypes.object,
    availableTabs: PropTypes.object,
    pageTitle: PropTypes.string
}