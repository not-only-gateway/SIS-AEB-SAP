import styles from '../styles/Selector.module.css'
import {CloseRounded, RemoveRounded} from "@material-ui/icons";
import React, {useEffect, useRef, useState} from "react";
import SelectorsPT from "../locales/SelectorsPT";
import Modal from "../../modal/Modal";
import List from "../../list/List";
import PropTypes from "prop-types";
import RenderListField from "../../shared/RenderListField";
import ListPropsTemplate from "../../shared/ListPropsTemplate";
import Checkbox from "../../list/modules/Checkbox";
import shared from '../../../core/shared/styles/Input.module.css'

export default function SelectorModal(props) {
    const lang = SelectorsPT
    const [onCreate, setOnCreate] = useState(false)
    const list = (
        <>
            <div style={{height: '100%', overflow: 'hidden'}}>
                {props.selected !== undefined && props.selected !== null ?
                    <div style={{
                        width: '100%',
                        maxWidth: '100%',
                        overflow: 'hidden',
                        display: 'flex',
                        paddingBottom: '8px'
                    }}>


                        <div className={styles.selectedEntityContainer}
                             style={{maxWidth: '100%', overflow: 'hidden'}}>
                            <Checkbox checked={true} handleCheck={() => {
                                props.handleChange(undefined)
                                props.setModal(false)
                            }}/>
                            <div className={styles.divider}/>
                            {props.fields.map((field, i) => (
                                <React.Fragment key={i + '-field'}>
                                    {i > 0 ? <div className={styles.divider}/> : null}
                                    <div style={{
                                        width: (100 / props.fields.length) + '%',
                                        textAlign: 'center'
                                    }}>

                                        <div className={styles.overflow}>
                                            {RenderListField(field, props.selected)}
                                        </div>

                                        <div className={[styles.overflow, shared.labelContainer].join(' ')}>
                                            {props.labels[i]}
                                        </div>
                                    </div>
                                </React.Fragment>
                            ))}

                        </div>

                    </div>
                    :
                    null
                }
                <List
                    noShadow={true} noSelect={true}
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
                            props.setModal(false)
                        } else if (props.createOption)
                            setOnCreate(true)
                    }}
                />
            </div>
        </>
    )
    useEffect(() => {
        if (props.returnToList) {
            props.setReturnToList()
            setOnCreate(false)
        }
    }, [props.returnToList])

    return (
        <Modal
            open={props.modal}
            handleClose={() => {
                props.setModal(false)
                setOnCreate(false)
            }}>
            <div className={shared.modalContainer}>
                <div className={shared.modalContent}>
                    <span
                        style={{
                            display: onCreate ? 'none' : undefined,
                            transition: '150ms linear'
                        }}
                    >
                        {list}
                    </span>
                    <span
                        style={{
                            display: !onCreate ? 'none' : undefined,
                            transition: '150ms linear'
                        }}
                    >
                        {props.children}
                    </span>
                    <button
                        onClick={() => {
                            props.setModal(false)
                        }}
                        className={shared.closeButton}
                    >
                        <CloseRounded/>
                    </button>
                </div>
            </div>
        </Modal>
    )


}
SelectorModal.propTypes = {
    ...ListPropsTemplate,
    ...{

        width: PropTypes.string,
        handleChange: PropTypes.func,
        selected: PropTypes.any,
        label: PropTypes.string,
        getEntityKey: PropTypes.func,
        labels: PropTypes.array,
        required: PropTypes.bool,
        disabled: PropTypes.bool,
        createOption: PropTypes.bool,
        children: PropTypes.node,
        modal: PropTypes.bool,
        setModal: PropTypes.func,

        returnToList: PropTypes.bool,
        setReturnToList: PropTypes.func
    }
}
