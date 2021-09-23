import Cell from "./Cell";
import PropTypes from 'prop-types'
import styles from '../../styles/Table.module.css'
import HeaderCell from "./HeaderCell";
import useTable from "../../hook/useTable";
import React, {useEffect, useRef} from 'react'
import ControlCell from "./ControlCell";


export default function TableLayout(props) {

    const {
        columns,
        dispatchColumns,
        actions,
        lastElementRef
    } = useTable(props.keys, props.listRef, props.setCurrentPage, props.currentPage, props.loading, props.hasMore)


    return (
        <table className={styles.table} ref={props.listRef}>
            <thead style={{position: 'sticky', top: 0, background: 'white', boxShadow: '0 0 .8px #ecedf2'}}>
            <tr>
                <ControlCell onClick={() => null} asCheckbox={true}/>
                {props.controlButtons?.map((e, i) => (
                    <React.Fragment key={i + '-control-cell'}>
                        <ControlCell onClick={e.onClick} icon={e.icon} label={e.label}/>
                    </React.Fragment>
                ))}
                {columns.map((e, i) => (
                    <React.Fragment key={i + '-header'}>

                        <HeaderCell
                            tableRef={props.listRef.current}

                            width={e.width}
                            hidden={e.hidden}
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

            {props.data.map((e, i) => (
                <tr key={'row-' + e.id} onClick={() => {
                    if (props.onRowClick !== undefined && typeof props.onRowClick === 'function')
                        props.onRowClick(e.data)
                }} ref={i === (props.data.length - 1) ? lastElementRef : undefined}>
                    <ControlCell onClick={() => null} width={50} asCheckbox={true}/>
                    {props.controlButtons?.map(val => (
                        <React.Fragment key={i + '-control-cell-row-' + e.id}>
                            <ControlCell onClick={() => val.onClick(e.data)} icon={val.icon} label={val.label}
                                         width={50}
                                         asCheckbox={false}/>
                        </React.Fragment>
                    ))}


                    {columns.map((value, ic) => (
                        <React.Fragment key={i + '-row-cell-' + ic}>

                            <Cell
                                width={value.width}
                                hidden={value.hidden}

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
    keys: PropTypes.array,
    controlButtons: PropTypes.array,
    onRowClick: PropTypes.func,
    listRef: PropTypes.object,
    currentPage: PropTypes.number,
    setCurrentPage: PropTypes.func,
    loading: PropTypes.bool,
    hasMore: PropTypes.bool
}