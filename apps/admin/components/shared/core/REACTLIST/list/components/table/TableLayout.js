import Cell from "./Cell";
import PropTypes from 'prop-types'
import styles from '../../styles/Table.module.css'
import HeaderCell from "./HeaderCell";
import useTable from "../../hook/useTable";
import React, {useEffect, useRef} from 'react'
import ControlCell from "./ControlCell";
import EmptyListIndicator from "../../../../shared/EmptyListIndicator";


export default function TableLayout(props) {

    const {
        columns,
        dispatchColumns,
        actions,
        lastElementRef
    } = useTable(props.keys, props.listRef, props.setCurrentPage, props.currentPage, props.loading, props.hasMore)


    return (
        <table className={styles.table} ref={props.listRef} >
            <thead>
            <tr style={{height: '30px'}}>
                    <ControlCell onClick={() => null} asCheckbox={true}/>
                    {/*{props.controlButtons?.map((e, i) => (*/}
                    {/*    <React.Fragment key={i + '-control-cell'}>*/}
                    {/*        <ControlCell onClick={e.onClick} icon={e.icon} label={e.label}/>*/}
                    {/*    </React.Fragment>*/}
                    {/*))}*/}
                    {columns.map((e, i) => (
                        <React.Fragment key={i + '-header'}>

                            <HeaderCell
                                tableRef={props.listRef.current}

                                additionalWidth={e.additionalWidth !== undefined ? e.additionalWidth : '0px'}

                                index={i}
                                dispatchColumns={dispatchColumns}
                                actions={actions}
                                quantity={columns.length}
                                value={e.label}/>
                        </React.Fragment>
                    ))}

            </tr>
            </thead>

            <tbody>

            {props.data.length === 0 ?
            <EmptyListIndicator/>
                :
                props.data.map((e, i) => (
                <tr key={'row-' + e.id}
                    className={styles.row}
                    onClick={() => {
                    if (props.onRowClick !== undefined && typeof props.onRowClick === 'function')
                        props.onRowClick(e.data)
                }} ref={i === (props.data.length - 1) ? lastElementRef : undefined}>
                    <ControlCell onClick={() => null} width={50} asCheckbox={true}/>
                    {/*{props.controlButtons?.map(val => (*/}
                    {/*    <React.Fragment key={i + '-control-cell-row-' + e.id}>*/}
                    {/*        <ControlCell onClick={() => val.onClick(e.data)} icon={val.icon} label={val.label}*/}
                    {/*                     width={50}*/}
                    {/*                     asCheckbox={false}/>*/}
                    {/*    </React.Fragment>*/}
                    {/*))}*/}


                    {columns.map((value, ic) => (
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