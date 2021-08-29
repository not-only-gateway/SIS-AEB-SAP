import PropTypes from 'prop-types'
import styles from '../styles/Control.module.css'
import ToolTip from "../../tooltip/ToolTip";
import {AddRounded, GetAppRounded} from "@material-ui/icons";
import React from "react";
import RefreshRoundedIcon from "@material-ui/icons/RefreshRounded";
import HandleDownload from "../methods/HandleDownload";

export default function ControlHeader(props) {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                {props.createOption ?
                    <div>
                        <button
                            onClick={() => {
                                props.setEntity(null)
                                props.clickEvent()
                            }}
                            className={styles.createButton}
                        >
                            <AddRounded/>
                            Inserir
                        </button>
                        <ToolTip content={'Inserir'}/>
                    </div>
                    : null}
                <div>
                    <button onClick={() => props.refresh()}  className={styles.button}>
                        <RefreshRoundedIcon/>
                        Recarregar
                    </button>
                    <ToolTip content={'Recarregar dados'}/>
                </div>
            </div>
            <div className={styles.content}>
                {!props.controlOptions ?
                    null
                    :
                    props.controlOptions.map((c, i) => (
                        <div key={'control-' + i}>
                            <button
                                className={styles.button}
                                onClick={() => {
                                    let data = []
                                    let selected = []
                                    props.data.map(e => {
                                        data = [...data, ...e]
                                    })
                                    props.selected.map((m) => {
                                        if (data[m] !== null)
                                            selected = [...selected, ...[data[m]]]
                                    })
                                    c.onClick(selected)
                                }} disabled={c.disabled === undefined ? props.disabled : c.disabled}>
                                {c.icon}
                                <div className={styles.label}>
                                    {c.label}
                                </div>
                            </button>
                            <ToolTip content={c.label}/>
                        </div>
                    ))
                }
                <div>
                    <button
                        className={styles.button}
                        onClick={() => {
                            let data = []
                            let selected = []
                            props.data.map(e => {
                                data = [...data, ...e]
                            })
                            props.selected.map((m) => {
                                if (data[m] !== null)
                                    selected = [...selected, ...[data[m]]]
                            })
                            HandleDownload(selected, props.listTitle)
                        }} disabled={props.disabled}>
                        <GetAppRounded/>
                        <div className={styles.label}>
                            Baixar selecionados
                        </div>
                    </button>
                    <ToolTip content={'Baixar selecionados'}/>
                </div>
            </div>
        </div>
    )
}

ControlHeader.propTypes = {
    controlOptions: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        icon: PropTypes.object,
        onClick: PropTypes.func,
        disabled: PropTypes.bool
    })),
    data: PropTypes.array,
    selected: PropTypes.array,
    listTitle: PropTypes.string
}