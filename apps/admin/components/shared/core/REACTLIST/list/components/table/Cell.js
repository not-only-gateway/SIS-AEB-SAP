import PropTypes from 'prop-types'
import styles from '../../styles/Table.module.css'

export default function Cell(props) {
    return (
        <td className={styles.cell}>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <div className={styles.cellContent} style={{width: 'calc(100% + ' + props.additionalWidth}}>
                    {props.value}
                </div>
            </div>
        </td>
    )
}

Cell.propTypes = {
    additionalWidth: PropTypes.string,
    value: PropTypes.any,
    // editable: PropTypes.bool
}