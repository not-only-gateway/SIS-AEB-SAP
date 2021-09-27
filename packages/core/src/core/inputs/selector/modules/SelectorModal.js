import styles from '../styles/Selector.module.css'
import {CloseRounded} from "@material-ui/icons";
import React, {useEffect, useState} from "react";
import SelectorsPT from "../locales/SelectorsPT";
import Modal from "../../../misc/modal/Modal";
import List from "../../../list/old/List";
import PropTypes from "prop-types";
import ParseCellContent from "../../../shared/parseCellContent";
import ListPropsTemplate from "../../../shared/ListPropsTemplate";
import Checkbox from "../../../shared/Checkbox";
import shared from '../../shared/Input.module.css'

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
                                            {ParseCellContent(field, props.selected)}
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
            }} animationStyle={'fade'}
            blurIntensity={.2}
            wrapperClassName={shared.modalContainer}
        >
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
