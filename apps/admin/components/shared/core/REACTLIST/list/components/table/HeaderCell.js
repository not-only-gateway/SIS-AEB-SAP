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
import useCellWidth from "../../hook/useCellWidth";
import ToolTip from "../../../tooltip/ToolTip";

export default function HeaderCell(props) {
    const width = useCellWidth(props.width)
    const observer = useRef()
    const ref = useRef()
    const handleResize = () => {
        props.dispatchColumns({
            type: props.actions.RESIZE,
            payload: {index: props.index, width: ref.current.offsetWidth}
        })
    }
    useEffect(() => {
        observer.current = new ResizeObserver(handleResize)
        observer.current.observe(ref.current)
        return () => {
            if (observer.current)
                observer.current.disconnect()
        }
    }, [])
    return (
        <td className={styles.cell} style={{display: props.hidden ? 'none' : undefined}}>
            <div className={styles.cellHeader}
                 style={{ width: width}} ref={ref}>
                <div className={styles.cellContent}
                     style={{fontWeight: 'bold', fontSize: '.9rem', height: 'fit-content'}}>
                    {props.value.toUpperCase()}
                    <ToolTip content={props.value.toUpperCase()}/>
                </div>
                <button className={styles.hideButton}
                        onClick={() => {
                            props.dispatchColumns({type: props.actions.HIDE, payload: {index: props.index}})
                        }}>
                    <CloseRounded style={{fontSize: '1.3rem'}}/>
                </button>
            </div>
        </td>
    )
}

HeaderCell.propTypes = {
    width: PropTypes.string,
    hidden: PropTypes.bool,
    dispatchColumns: PropTypes.func,
    actions: PropTypes.object,
    index: PropTypes.number,
    value: PropTypes.any,
    tableRef: PropTypes.object,
    quantity: PropTypes.number
}