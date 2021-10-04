import Cell from "./Cell";
import PropTypes from 'prop-types'
import styles from '../../styles/Table.module.css'
import HeaderCell from "./HeaderCell";
import useInfiniteScroll from "../../../shared/hooks/useInfiniteScroll";
import React, {useMemo, useRef} from 'react'
import keyTemplate from "../../templates/keyTemplate";


export default function TableLayout(props) {
    const lastElementRef = useInfiniteScroll(props.setCurrentPage, props.currentPage, props.loading, props.hasMore)
    const listRef = useRef()
    const keys = useMemo(() => {
        return props.keys.filter(e => e.visible)
    }, [props.keys])


    return (
        <table className={styles.table} ref={listRef} style={{maxHeight: props.maxHeight}}>
            <thead>
            <tr className={styles.headerRow}>
                {keys.map((e, i) => (
                    <React.Fragment key={i + '-header'}>
                        <HeaderCell
                            tableRef={listRef.current}
                            sorts={props.sorts} columnKey={e.key}
                            setSorts={props.setSorts} clean={props.clean}
                            additionalWidth={e.additionalWidth !== undefined ? e.additionalWidth : '0px'}
                            index={i}
                            quantity={props.keys.length}
                            value={e.label}/>
                    </React.Fragment>
                ))}
            </tr>
            </thead>

            <tbody>

            {props.data.map((e, i) => (
                <tr
                    key={'row-' + e.id}
                    className={styles.row}
                    onClick={() => {
                        if (props.onRowClick !== undefined && typeof props.onRowClick === 'function')
                            props.onRowClick(e.data)
                    }} ref={i === (props.data.length - 1) ? lastElementRef : undefined}
                >
                    {keys.map((value, ic) => (
                        <React.Fragment key={i + '-row-cell-' + ic}>

                            <Cell
                                additionalWidth={value.additionalWidth !== undefined ? value.additionalWidth : '0px'}
                                value={e.data[value.key]}
                            />
                        </React.Fragment>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    )
}

TableLayout.propTypes = {
    data: PropTypes.array,
    keys: PropTypes.arrayOf(keyTemplate).isRequired,

    controlButtons: PropTypes.array,
    onRowClick: PropTypes.func,
    currentPage: PropTypes.number,
    setCurrentPage: PropTypes.func,
    loading: PropTypes.bool,
    hasMore: PropTypes.bool,
    sorts: PropTypes.array,
    setSorts: PropTypes.func,
    clean: PropTypes.func
}
