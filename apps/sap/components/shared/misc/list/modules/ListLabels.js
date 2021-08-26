import PropTypes from 'prop-types'
import styles from "../styles/List.module.css";
import React, {useState} from "react";
import {ArrowDropDownRounded} from "@material-ui/icons";

export default function ListLabels(props) {
    const [open, setOpen] = useState(false)
    return (
        <div style={{display: 'flex', alignItems: 'center', width: (100 / props.fields.length) + '%'}}>
            {props.index > 0 ? <div className={styles.divider}/> : null}
            <button className={styles.label}
                    disabled={props.fields[props.index].type === 'object'} onClick={() => setOpen(!open)}>

                <ArrowDropDownRounded style={{transform: open ? 'rotate(180deg)' : undefined, transition: '150ms linear'}}/>
                <div className={styles.labelContent}>
                    {props.label}
                </div>
            </button>
        </div>
    )
}

ListLabels.propTypes = {
    data: PropTypes.array,
    fields: PropTypes.array,
    index: PropTypes.number,
    label: PropTypes.any
}