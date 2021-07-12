import PropTypes from 'prop-types'
import FormLayout from "./FormLayout";
import styles from './styles/EntityLayout.module.css'
import EntityLayoutPT from "./locales/EntityLayoutPT";
import {
    ArrowBackRounded,
    EditRounded,
    HistoryRounded,
    InfoRounded,
    ListRounded,
    MoreRounded,
    MoreVertRounded
} from "@material-ui/icons";
import React, {useEffect, useState} from "react";
import Overview from "./Overview";
import Description from "./Description";
import History from "./History";

export default function EntityLayout(props) {
    const lang = EntityLayoutPT

    const [openHistory, setOpenHistory] = useState(false)
    const [infoModal, setInfoModal] = useState(false)
    const [openOptions, setOpenOptions] = useState(false)
    useEffect(() => {
        document.addEventListener('mousedown', event => {
            const target = event.target.className
            if(target !== 'EntityLayout_optionsContainer__1uQvl' && target !== 'EntityLayout_buttonContainer__NhngH')
                setOpenOptions(false)
        })
        return () => {
            document.removeEventListener('mousedown', () => null)
        }
    })
    return (
        <>
            {!props.onlyEdit && Array.isArray(props.information) ?
                <Description handleClose={() => setInfoModal(false)} open={infoModal} information={props.information}
                             rootElementID={props.rootElementID}/>
                :
                null
            }

            <div className={styles.container}>
                <div className={styles.headerContainer}>
                    <div style={{display: 'flex', gap: '24px', alignItems: 'center', fontSize: '1.5rem'}}>
                        <button className={[styles.returnButton, styles.buttonContainer].join(' ')}
                                style={{display: props.returnButton ? undefined : 'none'}}
                                onClick={() => props.handleClose()}>
                            <ArrowBackRounded/>
                        </button>
                        {props.label}

                    </div>

                    <button className={styles.buttonContainer} onClick={() => setOpenOptions(!openOptions)}
                            style={{border: 'none', borderRadius: '8px', padding: '8px'}}>
                        <MoreVertRounded/>
                    </button>
                    {openOptions ?
                        <div className={styles.optionsContainer} >

                            <button className={styles.buttonContainer}
                                    onClick={() => setOpenHistory(true)} disabled={true}>
                                <HistoryRounded/>
                                {lang.history}

                            </button>
                            <button className={styles.buttonContainer} disabled={true}>
                                <InfoRounded/>
                                {lang.info}
                            </button>
                        </div>
                        :
                        null
                    }
                </div>
                {openHistory && props.fetchUrl !== undefined ?
                    <History {...props} handleClose={() => setOpenHistory(false)}/>
                    :
                    <FormLayout
                        {...props}
                        hasInfo={props.information !== null && props.information !== undefined}
                        handleClose={() => props.handleClose()}
                    />
                }
            </div>
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
