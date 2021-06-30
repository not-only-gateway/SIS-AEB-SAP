import PropTypes from 'prop-types'
import FormLayout from "./templates/FormLayout";
import styles from './styles/EntityLayout.module.css'
import EntityLayoutPT from "./locales/EntityLayoutPT";
import {ArrowBackRounded, EditRounded, HistoryRounded, InfoRounded, ListRounded} from "@material-ui/icons";
import React, {useState} from "react";
import Modal from "./Modal";

export default function EntityLayout(props) {
    const lang = EntityLayoutPT
    const [open, setOpen] = useState(false)
    const [modal, setModal] = useState(false)

    const renderOverview = () => {
        return (
            <Modal handleClose={() => setModal(false)} open={modal} rootElementID={props.rootElementID}>

            </Modal>
        )
    }

    if (props.create || open)
        return (
            <FormLayout {...props} handleClose={() => {
                if(props.create)
                    props.handleClose()
                else
                    setOpen(false)
            }}/>
        )
    else
        return (
            <div className={styles.container}>
                <div className={styles.headerContainer}>
                    <button className={[styles.returnButton, styles.buttonContainer].join(' ')}
                            onClick={() => props.handleClose()}>
                        <ArrowBackRounded/>
                    </button>
                    {props.label}
                    <button className={[styles.infoButton, styles.buttonContainer].join(' ')}
                            style={{border: 'none', borderRadius: '8px', padding: '8px'}}>
                        <InfoRounded/>
                    </button>
                </div>
                {props.create ? null :
                    <>
                        <button className={styles.buttonContainer}>
                            {lang.overview}
                            <ListRounded/>
                        </button>
                        <button className={styles.buttonContainer} style={{borderRadius: 0}}>
                            {lang.history}
                            <HistoryRounded/>
                        </button>
                        <button className={styles.buttonContainer} style={{borderRadius: 0}}
                                onClick={() => setOpen(true)}>
                            {lang.edit}
                            <EditRounded/>
                        </button>
                    </>
                }

            </div>
        )
}
EntityLayout.propTypes = {
    label: PropTypes.string,
    information: PropTypes.string,
    rootElementID: PropTypes.any,

    // OVERVIEW
    data: PropTypes.object,
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
    history: PropTypes.shape({
        exists: PropTypes.bool,
        fetchUrl: PropTypes.string,
        fetchToken: PropTypes.string,
        setVersion: PropTypes.func
    }),
    // HISTORY

    // FORM LAYOUT
    create: PropTypes.bool,
    returnButton: PropTypes.bool,
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
        entity: PropTypes.object,
        changed: PropTypes.bool
    }),
    handleClose: PropTypes.func
    // FORM LAYOUT
}