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
            <div style={{display: 'grid', gap: '8px', height: '100%'}}>
                {props.selected !== undefined && props.selected !== null ?
                    <div className={styles.selectedEntityContainer}>
                        {props.fields.map((field, i) => (
                            <React.Fragment key={i + '-field-' + props.entity.id}>
                                {i > 0 ? <div className={styles.divider}/> : null}

                                <div className={styles.overflow} style={{
                                    width: (100 / props.fields.length) + '%',
                                    color: typeof field.getColor === 'function' ? field.getColor(props.entity[field.name]) : undefined,
                                    textTransform: field.capitalize ? 'capitalize' : undefined
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
                                }}>
                            <RemoveRounded/>
                        </button>

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
                    fetchToken={props.fetchToken} title={props.title}
                    fetchUrl={props.fetchUrl}
                    setEntity={entity => {
                        if (entity !== undefined && entity !== null) {
                            props.handleChange(entity)
                            if (props.setChanged)
                                props.setChanged(true)
                            props.setModal(false)
                        } else if (props.createOption)
                            props.setOnCreate(true)
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
                {props.onCreate ? props.createContent : list}
            </div>
        </Modal>
    )


}
SelectorModal.propTypes = {...SelectorPropsTemplate, ...{modal: PropTypes.bool, setModal: PropTypes.func}}