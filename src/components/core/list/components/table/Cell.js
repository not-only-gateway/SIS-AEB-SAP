import PropTypes from 'prop-types'
import styles from '../../styles/Table.module.css'
import React from 'react'
import useField from "../../../shared/hooks/useField";

export default function Cell(props) {
    const content = useField(props.field, props.entry)
    const color = props.field.getColor ? props.field.getColor(props.entry[props.field.key]) : undefined
    return (
        <td className={styles.cell} style={{width: (1/props.quantity) * 100 + '%'}}>

            <div className={styles.cellContent} style={{
                 color: color, paddingLeft: '8px'}}>
                {content}
            </div>

        </td>
    )
}

Cell.propTypes = {
    additionalWidth: PropTypes.string,
    entry: PropTypes.object,
    field: PropTypes.object,
    quantity: PropTypes.number
}
