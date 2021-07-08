import PropTypes from 'prop-types'
import styles from "../styles/Styles.module.css";
import {ArrowForwardIosRounded, DeleteForeverRounded} from "@material-ui/icons";
import React, {useState} from "react";

export default function Connection(props) {
    const [open, setOpen] = useState(false)
    return (
        <div
            className={styles.lineContainer}
            style={{
                cursor: props.editable ? 'pointer' : 'default',
            }}
            id={props.parent + '-line-' + props.entityKey}
            onClick={() => {
                if (props.canDelete)
                    setOpen(!open)
            }}>
            <div id={props.parent + '-line-indicator-objective-' + props.entityKey}
                 className={styles.indicatorContainer}>
                <ArrowForwardIosRounded
                    style={{transform: 'rotate(-90deg)', color: props.editable ? undefined : '#777777'}}/>
            </div>
            <div id={props.parent + '-line-content-' + props.entityKey} className={styles.lineContentContainer}>
                {open ? <DeleteForeverRounded/> : 'conteudo'}
            </div>

        </div>
    )
}
Connection.propTypes = {
    canDelete: PropTypes.func,
    parent: PropTypes.number,
    entityKey: PropTypes.number,
    editable: PropTypes.bool
}