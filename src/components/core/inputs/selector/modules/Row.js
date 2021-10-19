import PropTypes from "prop-types";
import styles from '../styles/SelectorModal.module.css'
import ToolTip from "../../../misc/tooltip/ToolTip";
import React from "react";
import RowCell from "./RowCell";

export default function Row(props) {

    return (
        <button
            onClick={() => {
                if (props.onClick)
                    props.onClick()
            }}
            ref={props.reference}
            draggable={!props.disabled}
            onDragStart={e => {
                if (props.emptyIndicator)
                    e.preventDefault()
                else
                    e.dataTransfer.setData('text/plain', props.index.toString())
            }}
            onDragOver={e => {
                e.preventDefault()
                const target = document.getElementsByClassName(styles.dropTarget)[0]

                if (document.elementsFromPoint(e.clientX, e.clientY).includes(target))
                    target.classList.add(styles.hoveredRow)
            }}
            onDragLeave={e => {
                e.target.classList.remove(styles.hoveredRow)
            }}
            onDrop={e => {
                e.preventDefault()
                e.target.classList.remove(styles.hoveredRow)
                if (props.onDrop)
                    props.onDrop(parseInt(e.dataTransfer.getData('text')))
            }}
            className={[styles.row, props.emptyIndicator ? styles.dropTarget : ''].join(' ')}
            disabled={props.disabled} id={props.emptyIndicator ? 'drop-target' : undefined}>

            <div style={{display: props.emptyIndicator && !props.data ? undefined : 'none'}}>
                Arraste aqui.
            </div>
            {props.emptyIndicator && !props.data ? null : props.keys.map((k, i) => !k.visible ? null : (
                <div key={'selector-row-' + i} className={styles.rowColumn}
                     style={{width: ((1 / props.keys.filter(e => e.visible).length) * 100) + '%'}}>
                    <div className={styles.overflowEllipsis} style={{maxWidth: '90%'}}>
                        <RowCell data={props.data} field={k}/>
                    </div>

                    <div
                        className={[styles.columnLabel, styles.overflowEllipsis, styles.emptyRow].join(' ')}
                        style={{maxWidth: '75%'}}>
                        {k.label}
                    </div>
                    <ToolTip justify={'middle'}>
                        <div className={styles.rowColumn}>
                            <RowCell data={props.data} field={k}/>
                            <div className={styles.columnLabel}>
                                {k.label}
                            </div>
                        </div>
                    </ToolTip>
                </div>
            ))}

        </button>
    )
}
Row.propTypes = {
    keys: PropTypes.array,
    data: PropTypes.object,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    emptyIndicator: PropTypes.bool,
    identificationKey: PropTypes.string,
    reference: PropTypes.object,
    index: PropTypes.number,
    onDrop: PropTypes.func,
}
