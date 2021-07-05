import PropTypes from 'prop-types'
import FormLayout from "./FormLayout";
import styles from './styles/EntityLayout.module.css'
import EntityLayoutPT from "./locales/EntityLayoutPT";
import {ArrowBackRounded, EditRounded, HistoryRounded, InfoRounded, ListRounded} from "@material-ui/icons";
import React, {useState} from "react";
import Overview from "./Overview";
import Description from "./Description";
import History from "./History";

export default function EntityLayout(props) {
    const lang = EntityLayoutPT
    const [openForm, setOpenForm] = useState(false)
    const [openHistory, setOpenHistory] = useState(false)
    const [overviewModal, setOverviewModal] = useState(false)
    const [infoModal, setInfoModal] = useState(false)


    return (
        <>
            {!props.onlyEdit && Array.isArray(props.information) ?
                <Description handleClose={() => setInfoModal(false)} open={infoModal} information={props.information}
                             rootElementID={props.rootElementID}/>
                :
                null
            }

            {props.create || openForm || props.onlyEdit ?

                <FormLayout
                    {...props}
                    openFormInfo={() => setInfoModal(true)}
                    hasInfo={props.information !== null && props.information !== undefined}
                    handleClose={() => {
                        if (props.create)
                            props.handleClose()
                        else
                            setOpenForm(false)
                    }}/>
                :
                openHistory ?
                    props.fetchUrl !== undefined ?
                        <History {...props} handleClose={() => setOpenHistory(false)}/> : null
                    :
                    <>
                        <Overview
                            fields={props.fields} entity={props.entity} open={overviewModal}
                            rootElementID={props.rootElementID}
                            handleClose={() => setOverviewModal(false)}
                        />
                        <div className={styles.container}>
                            <div className={styles.headerContainer}>
                                <button className={[styles.returnButton, styles.buttonContainer].join(' ')} style={{display: props.returnButton ? undefined : 'none'}}
                                        onClick={() => props.handleClose()}>
                                    <ArrowBackRounded/>
                                </button>
                                {props.label}
                                {props.information !== null && props.information !== undefined ?
                                    <button className={styles.buttonContainer} onClick={() => setInfoModal(true)}
                                            style={{border: 'none', borderRadius: '8px', padding: '8px'}}>
                                        <InfoRounded style={{color: '#555555'}}/>
                                    </button>
                                    : null
                                }
                            </div>
                            {props.create || props.onlyEdit ? null :
                                <>
                                    <button className={styles.buttonContainer} onClick={() => setOverviewModal(true)}>
                                        {lang.overview}
                                        <ListRounded/>
                                    </button>
                                    <button className={styles.buttonContainer} style={{borderRadius: 0}}
                                            onClick={() => setOpenHistory(true)}>
                                        {lang.history}
                                        <HistoryRounded/>
                                    </button>
                                    <button className={styles.buttonContainer} style={{borderRadius: 0}}
                                            onClick={() => setOpenForm(true)}>
                                        {lang.edit}
                                        <EditRounded/>
                                    </button>
                                </>
                            }
                        </div>
                    </>
            }
        </>
    )
}
EntityLayout.propTypes = {
    returnButton: PropTypes.bool,
    onlyEdit: PropTypes.bool,
    label: PropTypes.string,
    information: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string,
            description: PropTypes.shape
        })
    ),
    rootElementID: PropTypes.any,
    entity: PropTypes.object,

    // OVERVIEW
    fields: PropTypes.arrayOf(
        PropTypes.shape({
            field: PropTypes.string,
            label: PropTypes.string,
            type: PropTypes.oneOf(['bool', 'image', 'string', 'object', 'date']),
            renderObjectField: PropTypes.func
        })
    ),
    // OVERVIEW

    // HISTORY

    exists: PropTypes.bool,
    entityKey: PropTypes.any,
    fetchUrl: PropTypes.string,
    fetchSize: PropTypes.string,
    fetchToken: PropTypes.string,
    setVersion: PropTypes.func,
    entityID: PropTypes.number,
    // HISTORY

    // FORM LAYOUT
    create: PropTypes.bool,
    forms: PropTypes.arrayOf(
        PropTypes.shape({
            child: PropTypes.object,
            title: PropTypes.string
        })
    ),
    handleSubmit: PropTypes.func,
    dependencies: PropTypes.shape({
        fields: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string,
            type: PropTypes.oneOf(['string', 'number', 'object', 'bool', 'date'])
        })),
        changed: PropTypes.bool
    }),
    handleClose: PropTypes.func
    // FORM LAYOUT
}
