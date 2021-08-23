import styles from '../styles/Selector.module.css'
import {CloseRounded, RemoveRounded} from "@material-ui/icons";
import React, {useEffect, useState} from "react";
import SelectorsPT from "../locales/SelectorsPT";
import Modal from "../../modal/Modal";
import List from "../../list/List";
import PropTypes from "prop-types";
import SelectorPropsTemplate from "../templates/SelectorPropsTemplate";
import RenderListField from "../../shared/RenderListField";


export default function SelectorModal(props) {
    const lang = SelectorsPT

    const list = (
        <div className={styles.modalContainer}>
            <button
                onClick={() => {
                    props.setModal(false)
                }}
                className={styles.closeButton}
            >
                <CloseRounded/>
            </button>
            <div style={{height: '100%'}}>
                {props.selected !== undefined && props.selected !== null ?
                    <div style={{width: '100%', height: '100px', marginBottom: '16px'}}>
                        {lang.selected}
                        <div style={{width: '100%', display: 'grid', alignContent: 'flex-start', gap: '4px'}}>
                            <div style={{display: 'flex', alignItems: 'center', width: '100%'}}>
                                {props.labels.map(l => (
                                    <div className={styles.overflow} style={{
                                        width: (100 / props.labels.length) + '%',
                                        textAlign: 'center',
                                        textTransform: 'capitalize',
                                        fontSize: '.75rem',
                                        fontWeight: 'bold'
                                    }}>
                                        {l}
                                    </div>
                                ))}
                            </div>
                            <div className={styles.selectedEntityContainer}>

                                {props.fields.map((field, i) => (
                                    <React.Fragment key={i + '-field'}>
                                        {i > 0 ? <div className={styles.divider}/> : null}

                                        <div className={styles.overflow} style={{
                                            width: (100 / props.fields.length) + '%',
                                            color: typeof field.getColor === 'function' ? field.getColor(props.entity[field.name]) : undefined,
                                            textTransform: field.capitalize ? 'capitalize' : undefined,
                                            textAlign: 'center'
                                        }}>

                                            {RenderListField(field, props.selected)}
                                        </div>
                                    </React.Fragment>
                                ))}

                                <button className={styles.removeButton}
                                        style={{display: props.required ? 'none' : undefined}}
                                        onClick={() => {
                                            if (props.setChanged)
                                                props.setChanged(true)
                                            props.handleChange(undefined)
                                            props.setModal(false)
                                        }}>
                                    <RemoveRounded/>
                                </button>

                            </div>
                        </div>
                    </div>
                    :
                    null
                }
                <List
                    noShadow={true}
                    searchFieldName={props.searchFieldName}
                    clickEvent={() => null} fields={props.fields}
                    labels={props.labels} asModal={true}
                    createOption={props.createOption}
                    fetchParams={props.fetchParams}
                    fetchToken={props.fetchToken} title={props.label}
                    fetchUrl={props.fetchUrl}
                    setEntity={entity => {
                        if (entity !== undefined && entity !== null) {
                            props.handleChange(entity)
                            if (props.setChanged)
                                props.setChanged(true)
                            props.setModal(false)
                        } else if (props.createOption)
                            props.handleCreate()
                    }}
                />
            </div>

        </div>
    )
    return (
        <Modal open={props.modal} handleClose={() => props.setModal(false)}
               componentStyle={{display: 'grid', placeItems: 'center'}}>
            <div style={{
                height: '100vh',
                width: '100vw',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                {list}
            </div>
        </Modal>
    )


}
SelectorModal.propTypes = {...SelectorPropsTemplate, ...{modal: PropTypes.bool, setModal: PropTypes.func}}