import PropTypes from "prop-types";
import Cell from "./Cell";
import styles from "../styles/Table.module.css";
import {DragIndicatorRounded} from "@material-ui/icons";
import {useEffect, useRef, useState} from "react";

export default function HeaderCell(props) {
    const ref = useRef()
    const [dragging, setDragging] = useState(false)
    let currentWidth
    let lastMousePlacement
    const handleMouseUp = () => {
        setDragging(false)
        props.dispatchColumns({type: props.actions.RESIZE, payload: {index: props.index, width: 'auto'}})
    }
    const handleMouseDown = (e) => {
        currentWidth = ref.current.parentNode.offsetWidth
        lastMousePlacement = e.clientX
        setDragging(true)
    }
    const handleResize = (e) => {

        let newWidth
        if (lastMousePlacement === undefined)
            lastMousePlacement = e.clientX
        if (currentWidth === undefined || isNaN(currentWidth))
            newWidth = ref.current.parentNode.offsetWidth + (e.clientX - lastMousePlacement)
        else
            newWidth = currentWidth + (e.clientX - lastMousePlacement)
        console.log(newWidth, props.tableRef.offsetWidth)
        if (newWidth > 100 || newWidth >= props.tableRef.offsetWidth || props.quantity * 100 < newWidth) {
            lastMousePlacement = e.clientX
            currentWidth = newWidth
            props.dispatchColumns({type: props.actions.RESIZE, payload: {index: props.index, width: currentWidth}})
        }
    }
    useEffect(() => {
        if (!props.isLast) {
            ref.current.addEventListener('mousedown', handleMouseDown)
            if (dragging) {
                document.addEventListener('mouseup', handleMouseUp)
                document.addEventListener('mousemove', handleResize)
            }
        }
        return () => {
            ref.current.removeEventListener('mousedown', handleMouseDown)
            document.removeEventListener('mouseup', handleMouseUp)
            document.removeEventListener('mousemove', handleResize)

        }
    }, [dragging])

    return (
        <td className={styles.cell} style={{width: typeof props.width === "number" ? props.width + 'px' : 'px', border: 'none', borderRight: '#ecedf2 1px solid'}}>
            <div className={styles.cellHeader}
                 style={{width: typeof props.width === "number" ? props.width + 'px' : 'px'}}>
                <div className={styles.cellContent}
                     style={{width: typeof props.width === "number" ? (props.width - 50) + 'px' : 'px'}}>
                    {props.value}
                </div>
                <button ref={ref} style={{display: props.isLast ? 'none' : 'px'}} className={styles.resizeButton}
                        onDoubleClick={() => {
                            if (props.hidden)
                                props.dispatchColumns({type: props.actions.HIDE, payload: {index: props.index}})
                            else
                                props.dispatchColumns({type: props.actions.SHOW, payload: {index: props.index}})
                        }}>
                    <DragIndicatorRounded/>
                </button>
            </div>
        </td>
    )
}

HeaderCell.propTypes = {
    width: PropTypes.number,
    hidden: PropTypes.bool,
    dispatchColumns: PropTypes.func,
    actions: PropTypes.object,
    index: PropTypes.number,
    isLast: PropTypes.bool,
    value: PropTypes.any,
    tableRef: PropTypes.object,
    quantity: PropTypes.number
}