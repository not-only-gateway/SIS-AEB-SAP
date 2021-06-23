import styles from "../styles/Canvas.module.css";
import {AddRounded, CloseRounded, RemoveRounded} from "@material-ui/icons";
import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import NodePT from "../locale/NodePT";

export default function NodeButtons(props) {

    const lang = NodePT

    // useEffect(() => {
    //     const nodeButtonsElement = document.querySelector('#node_buttons-' + props.entityKey)
    //     const nodeElement = document.querySelector('#node-' + props.entityKey)
    //     const element = document.getElementById('canvas')
    //
    //     if (element !== null && props.open)
    //         element.addEventListener('mousedown', event => {
    //             if (!nodeButtonsElement.contains(event.target) && !nodeElement.contains(event.target)) {
    //                 props.setOpen(false)
    //                 props.setExtended(false)
    //             }
    //         })
    // })
    if (props.open)
        return (
            <div
                onBlur={() => {
                    props.setOpen(false)
                }} id={'node_buttons-' + props.entityKey}
                className={[styles.optionsContainer, props.open ? styles.fadeIn : styles.fadeOutAnimation].join(' ')}
            >
                {props.buttons !== undefined ? props.buttons.map((button, index) => (
                    <button key={index + '-' + button.key} onClick={() => {
                        props.handleButtonClick(props.entity, button.key)

                    }}>
                        {button.icon !== undefined ? button.icon : null}
                        {button.label}
                    </button>
                )) : null}
                {props.extendable ?

                    <button onClick={() => {
                        props.setExtended(!props.extended)
                    }}>
                        {props.extended ?
                            (
                                <>
                                    <RemoveRounded style={{fontSize: '1.3rem', color: '#333333'}}/>
                                    {lang.less}
                                </>
                            )
                            :
                            (
                                <>
                                    <AddRounded style={{fontSize: '1.3rem', color: '#333333'}}/>
                                    {lang.more}
                                </>
                            )

                        }
                    </button>
                    :
                    null}

                {props.buttons !== undefined ? props.buttons.map((button, index) => (
                    <button key={index + '-' + button.key} style={{color: '#ff5555'}} onClick={() => {
                        props.setOpen(false)
                    }}>
                        <CloseRounded style={{fontSize: '1.3rem'}}/>
                        {lang.close}
                    </button>
                )) : null}
            </div>
        )
    else
        return null
}

NodeButtons.propTypes = {
    elementHeight: PropTypes.number,
    entityKey: PropTypes.any,
    extendable: PropTypes.bool,
    handleButtonClick: PropTypes.func,
    entity: PropTypes.object,
    extended: PropTypes.bool,
    setExtended: PropTypes.func,
    open: PropTypes.bool,
    setOpen: PropTypes.func,
    buttons: PropTypes.arrayOf(
        PropTypes.shape({
            icon: PropTypes.any,
            label: PropTypes.string,
            key: PropTypes.number
        })),
}