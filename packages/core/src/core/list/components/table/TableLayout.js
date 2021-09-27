import Cell from "./Cell";
import PropTypes from 'prop-types'
import styles from '../../styles/Table.module.css'
import HeaderCell from "./HeaderCell";
import useInfiniteScroll from "../../../shared/hooks/useInfiniteScroll";
import React from 'react'


export default function TableLayout(props) {
    const lastElementRef = useInfiniteScroll(props.setCurrentPage, props.currentPage, props.loading, props.hasMore)

    return (
        <table className={styles.table} ref={props.listRef} style={{maxHeight: props.maxHeight}}>
            <thead>
            <tr className={styles.headerRow}>
                {props.keys.map((e, i) => (
                    <React.Fragment key={i + '-header'}>

                        <HeaderCell
                            tableRef={props.listRef.current}

                            additionalWidth={e.additionalWidth !== undefined ? e.additionalWidth : '0px'}

                            index={i}
                            quantity={props.data.length}
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
                    {props.keys.map((value, ic) => (
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
    keys: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        type: PropTypes.oneOf(['string', 'number', 'object', 'date']),
        maskStart: PropTypes.any,
        maskEnd: PropTypes.any,
        additionalWidth: PropTypes.string
    })).isRequired,
    controlButtons: PropTypes.array,
    onRowClick: PropTypes.func,
    listRef: PropTypes.object,
    currentPage: PropTypes.number,
    setCurrentPage: PropTypes.func,
    loading: PropTypes.bool,
    hasMore: PropTypes.bool
}
