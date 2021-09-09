import FormLayout from "./FormLayout";
import styles from './styles/EntityLayout.module.css'
import EntityLayoutPT from "./locales/EntityLayoutPT";
import {ArrowBackRounded, HistoryRounded, InfoRounded, MoreVertRounded} from "@material-ui/icons";
import React, {useEffect, useRef, useState} from "react";
import History from "./History";
import isDisabled from "./methods/GetDisabled";
import fStyles from './styles/Form.module.css'
import LayoutPropsTemplate from "./templates/LayoutPropsTemplate";

export default function EntityLayout(props) {
    const lang = EntityLayoutPT
    const ref = useRef()
    const [openHistory, setOpenHistory] = useState(false)
    const [openOptions, setOpenOptions] = useState(false)

    useEffect(() => {
        if (!props.noAutoHeight) {
            const newHeight = document.documentElement.offsetHeight - ref.current.getBoundingClientRect().y - 16
            if (ref.current.offsetHeight > newHeight)
                ref.current.style.maxHeight = newHeight + 'px'
        }
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

        <div ref={ref} className={styles.container} style={{
            boxShadow: props.noShadow ? 'none' : undefined,
            alignContent: props.noAutoHeight ? 'space-between' : undefined
        }}>
            <span>
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
            </span>
            <div className={styles.headerContainer} style={{
                bottom: 0,
                borderRadius: '0 0 5px 5px',
                borderBottom: "none",
                borderTop: '#ecedf2 1px solid',
                padding: '8px ',
                zIndex: 50
            }}>
                <button
                    className={fStyles.saveButton}
                    onClick={() => props.handleSubmit()} disabled={isDisabled(props)}
                >
                    {props.create ? lang.create : lang.save}
                </button>
            </div>
        </div>
        // </div>
    )
}
EntityLayout.propTypes = LayoutPropsTemplate
