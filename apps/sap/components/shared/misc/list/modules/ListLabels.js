import PropTypes from 'prop-types'
import styles from "../styles/List.module.css";
import React, {useState} from "react";
import {ArrowDownwardRounded, ArrowDropDownRounded} from "@material-ui/icons";

export default function ListLabels(props) {
    const [open, setOpen] = useState(false)
    return (
        <div style={{display: 'flex', alignItems: 'center', width: (100 / props.fields.length) + '%'}}>
            <button className={styles.label}
                    disabled={props.fields[props.index].type === 'object'} onClick={() => setOpen(!open)}>
                <div className={styles.labelContent}>
                    {props.label}
                </div>
                <ArrowDownwardRounded style={{transform: open ? 'rotate(180deg)' : undefined, transition: '150ms linear', fontSize: '1rem'}}/>
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