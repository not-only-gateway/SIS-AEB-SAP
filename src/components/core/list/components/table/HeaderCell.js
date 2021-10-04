import PropTypes from "prop-types";
import styles from "../../styles/Table.module.css";
import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import ToolTip from "../../../misc/tooltip/ToolTip";
import {ArrowDownwardRounded} from "@material-ui/icons";

export default function HeaderCell(props) {
    const ref = useRef()
    const [currentSort, setCurrentSort] = useState(undefined)

    return (
        <td className={styles.cell}
            style={{
                height: '30px',
                border: 'none',
                width: (1/props.quantity) * 100 + '%'
            }}>
            <button
                className={[styles.cellHeader, !currentSort ? styles.disabledSort : ''].join(' ')}
                onClick={() => {
                    let newSort
                    switch (currentSort) {
                        case 'desc': {
                            setCurrentSort('asc')
                            newSort = 'asc'
                            break
                        }
                        case 'asc': {
                            setCurrentSort(undefined)
                            newSort = undefined
                            break
                        }
                        default: {
                            setCurrentSort('desc')
                            newSort = 'desc'
                            break
                        }
                    }
                    const exists = props.sorts.findIndex(e => e.key === props.columnKey)
                    props.clean()

                    if (exists > -1)
                        props.setSorts(prevState => {
                            let value = [...prevState]
                            switch (newSort) {
                                case 'desc': {
                                    value[exists].desc = true
                                    value[exists].asc = undefined
                                    break
                                }
                                case 'asc': {
                                    value[exists].desc = undefined
                                    value[exists].asc = true
                                    break
                                }
                                default: {
                                    value[exists].desc = undefined
                                    value[exists].asc = undefined
                                    break
                                }
                            }
                            return value
                        })
                    else if (newSort)
                        props.setSorts([{key: props.columnKey, desc: true}])

                }}
                style={{
                    height: '30px',
                    width: '100%'
                }}
                ref={ref}
            >
                <div className={styles.cellContent}
                     style={{fontSize: '.8rem', height: 'fit-content', textTransform: 'capitalize'}}>
                    {props.value}
                    <ToolTip content={props.value.toUpperCase()}/>
                </div>
                <ArrowDownwardRounded
                    style={{
                        transform: currentSort === 'desc' ? 'rotate(180deg)' : undefined,
                        fontSize: '1.1rem',
                        transition: '150ms linear'
                    }}
                />
            </button>
        </td>
    )
}

HeaderCell.propTypes = {
    additionalWidth: PropTypes.string,

    index: PropTypes.number,
    value: PropTypes.any,
    tableRef: PropTypes.object,
    quantity: PropTypes.number,
    sorts: PropTypes.array,
    setSorts: PropTypes.func,
    columnKey: PropTypes.string,
    clean: PropTypes.func
}
