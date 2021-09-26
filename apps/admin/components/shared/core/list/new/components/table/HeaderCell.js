import PropTypes from "prop-types";
import Cell from "./Cell";
import styles from "../../styles/Table.module.css";
import {
    CloseRounded,
    DragIndicatorRounded,
    RemoveRounded,
    VisibilityOffRounded,
    VisibilityRounded
} from "@material-ui/icons";
import {useEffect, useRef, useState} from "react";
import ToolTip from "../../../../misc/tooltip/ToolTip";
// import ToolTip from "../../../tooltip/ToolTip";

export default function HeaderCell(props) {
    const ref = useRef()

    return (
        <td className={styles.cell} style={{height: '30px', width:  'calc(100% + ' + props.additionalWidth}}>
            <div className={styles.cellHeader}
                 style={{height: '30px', width: 'calc(100% + ' + props.additionalWidth}} ref={ref}>
                <div className={styles.cellContent}
                     style={{fontWeight: 'bold', fontSize: '.8rem', height: 'fit-content', textTransform: 'capitalize'}}>
                    {props.value}
                    <ToolTip content={props.value.toUpperCase()}/>
                </div>

            </div>
        </td>
    )
}

HeaderCell.propTypes = {
    additionalWidth: PropTypes.string,
    dispatchColumns: PropTypes.func,
    actions: PropTypes.object,
    index: PropTypes.number,
    value: PropTypes.any,
    tableRef: PropTypes.object,
    quantity: PropTypes.number
}