import PropTypes from 'prop-types'
import styles from "./styles/Overview.module.css";
import OverviewPT from "./locales/OverviewPT";
import {Avatar} from "@material-ui/core";
import React from 'react'
import Modal from "../modal/Modal";
import {CheckRounded, CloseRounded} from "@material-ui/icons";

export default function Overview(props) {
    const lang = OverviewPT

    function getField(field) {
        let response = lang.unset
        if (props.entity[field.field] !== null && props.entity[field.field] !== undefined && (field.type === 'string' ? props.entity[field.field].length > 0 : true))
            switch (field.type) {
                case 'string': {
                    response = props.entity[field.field]
                    break
                }
                case 'bool': {
                    response = lang.getBool(props.entity[field.field])
                    break
                }
                case 'image': {
                    response = <Avatar src={props.entity[field.field]}/>
                    break
                }
                case 'object': {
                    response = field.renderObjectField(props.entity[field.field])
                    break
                }
                case 'date': {
                    response = (new Date(props.entity[field.field])).toLocaleDateString()
                    break
                }
                default:
                    break
            }
        return response
    }


    return (
        <Modal handleClose={() => props.handleClose()}
               open={props.open}
               rootElementID={props.rootElementID}>
            <div style={{
                height: '100vh',
                width: '100vw',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>

                <div className={styles.modalContainer}>
                    <div style={{
                        display: 'grid',
                        height: '100%',
                        width: '100%',
                        overflow: 'auto',
                        alignContent: 'flex-start',
                        position: 'relative'
                    }}>
                        {props.entity !== null && props.entity !== undefined && typeof props.entity === 'object' && props.fields !== undefined && props.fields !== null ?
                            <>
                                {props.fields.map((field, index) => (
                                    <div className={styles.overviewRow} key={index + '-overview-row-' + field.label}>
                                        <p style={{fontSize: '.9rem', color: '#555555'}}>{field.label}</p>
                                        <p style={{fontSize: '1rem'}}>
                                            {getField(field)}
                                        </p>
                                    </div>
                                ))}
                            </>
                            :
                            null
                        }
                    </div>


                    <button className={styles.applyButton} onClick={() => props.applyHistory()}
                            style={{display: props.applyHistoryButton ? undefined : 'none'}}>
                        <CheckRounded/>
                        {lang.apply}
                    </button>


                    <button className={styles.closeButton} onClick={() => props.handleClose()}>
                        <CloseRounded/>
                    </button>
                </div>

            </div>
        </Modal>
    )
}
Overview.propTypes = {
    applyHistoryButton: PropTypes.bool,
    applyHistory: PropTypes.func,
    rootElementID: PropTypes.any,
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    fields: PropTypes.arrayOf(
        PropTypes.shape({
            field: PropTypes.string,
            label: PropTypes.string,
            type: PropTypes.oneOf(['bool', 'image', 'string', 'object', 'date']),
            renderObjectField: PropTypes.func
        })
    ),
    entity: PropTypes.object
    // history: PropTypes.shape({
    //     exists: PropTypes.bool,
    //     fetchUrl: PropTypes.string,
    //     fetchToken: PropTypes.string,
    //     setVersion: PropTypes.func
    // }),
}
