import PropTypes from 'prop-types'
import styles from '../styles/Table.module.css'

export default function Cell(props) {
    return (
        <td  className={styles.cell}  style={{width: typeof props.width === "number" ? props.width + 'px' : 'px'}} >
            <div style={{width: typeof props.width === "number" ? props.width + 'px' :'px'}}  className={styles.cellContent}>
                {props.value}
            </div>
        </td>
    )
}

Cell.propTypes = {
    width: PropTypes.any,
    hidden: PropTypes.bool,
    value: PropTypes.any,
    // editable: PropTypes.bool
}