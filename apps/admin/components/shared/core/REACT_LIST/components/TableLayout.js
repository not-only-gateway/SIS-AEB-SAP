import Cell from "./Cell";
import PropTypes from 'prop-types'
import styles from '../styles/Table.module.css'
import HeaderCell from "./HeaderCell";
import useTable from "../hook/useTable";
import React, {useEffect} from 'react'
import ControlCell from "./ControlCell";
import Checkbox from "../../list/modules/Checkbox";


export default function TableLayout(props) {

    const {columns, dispatchColumns, actions, ref, maxWidth} = useTable(props.keys)

    return (
        <table className={styles.table} ref={ref}>
            <thead>
            <tr>
                <ControlCell onClick={() => null} width={59} asCheckbox={true}/>
                {props.controlButtons?.map(e => (
                    <ControlCell onClick={e.onClick} icon={e.icon} label={e.label} width={50}/>
                ))}
                {columns.map((e, i) => (
                    <React.Fragment key={i + '-header'}>

                        <HeaderCell
                            tableRef={ref.current}
                            isLast={i === (columns.length - 1)}
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
                <tr key={i + '-row'}>
                    <ControlCell onClick={() => null} width={50} asCheckbox={true}/>
                    {props.controlButtons?.map(val => (

                        <ControlCell onClick={() => val.onClick(e)} icon={val.icon} label={val.label} width={50}
                                     asCheckbox={false}/>
                    ))}


                    {columns.map((value, ic) => (
                        <React.Fragment key={i + '-row-cell-' + ic}>

                            <Cell
                                width={value.width}
                                hidden={value.hidden}

                                value={e[value.key]}
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
    controlButtons: PropTypes.array
}