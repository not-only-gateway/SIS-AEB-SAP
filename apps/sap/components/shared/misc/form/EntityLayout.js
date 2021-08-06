import PropTypes from 'prop-types'
import FormLayout from "./FormLayout";
import styles from './styles/EntityLayout.module.css'
import EntityLayoutPT from "./locales/EntityLayoutPT";
import {ArrowBackRounded, HistoryRounded, InfoRounded, MoreVertRounded} from "@material-ui/icons";
import React, {useEffect, useRef, useState} from "react";
import History from "./History";

export default function EntityLayout(props) {
    const lang = EntityLayoutPT
    const ref = useRef()
    const [openHistory, setOpenHistory] = useState(false)
    const [infoModal, setInfoModal] = useState(false)
    const [openOptions, setOpenOptions] = useState(false)
    const [height, setHeight] = useState(undefined)

    useEffect(() => {
        const newHeight = document.documentElement.offsetHeight - ref.current.offsetTop - 32
        if (ref.current.offsetHeight > newHeight)
            setHeight(newHeight)
        document.addEventListener('mousedown', event => {
            const target = event.target.className
            if (target !== 'EntityLayout_optionsContainer__1uQvl' && target !== 'EntityLayout_buttonContainer__NhngH' && target !== 'EntityLayout-module_buttonContainer__DCckt' && typeof target !== 'object')
                setOpenOptions(false)
        })
        return () => {
            document.removeEventListener('mousedown', () => null)
        }
    }, [])

    return (
        // <div >
        //     {!props.onlyEdit && Array.isArray(props.information) ?
        //         <Description handleClose={() => setInfoModal(false)} open={infoModal} information={props.information}
        //                      rootElementID={props.rootElementID}/>
        //         :
        //         null
        //     }

        <div ref={ref} className={styles.container} style={{height: height !== undefined ? height + 'px' : 'auto', boxShadow: props.noShadow ? 'none' : undefined}}>
            <div className={styles.headerContainer} style={{display: props.noHeader ? 'none' : undefined}}>
                <div className={styles.header}>
                    <button className={styles.buttonContainer}
                            style={{display: props.returnButton ? undefined : 'none'}}
                            onClick={() => props.handleClose()}>
                        <ArrowBackRounded/>
                    </button>
                    {props.label}

                </div>

                <button className={styles.buttonContainer} onClick={() => setOpenOptions(!openOptions)}
                        style={{
                            border: 'none',
                            borderRadius: '8px',
                            padding: '8px',
                            color: openOptions ? '#0095ff' : undefined,
                            background: openOptions ? '#E8F0FE' : undefined
                        }}>
                    <MoreVertRounded/>
                </button>
                {openOptions ?
                    <div className={styles.optionsContainer}>

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
        // </div>
    )
}
EntityLayout.propTypes = {
    noHeader: PropTypes.bool,
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

    versionControl: PropTypes.shape({
        exists: PropTypes.bool,
        entityKey: PropTypes.any,
        fetchUrl: PropTypes.string,
        fetchSize: PropTypes.string,
        fetchToken: PropTypes.string,
        setVersion: PropTypes.func,
        entityID: PropTypes.number,
    }),
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
