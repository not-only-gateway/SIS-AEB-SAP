import PropTypes from 'prop-types'
import styles from '../../styles/Table.module.css'
import useCellWidth from "../../hook/useCellWidth";

export default function Cell(props) {
    const width = useCellWidth(props.width)
    return (
        <td  className={styles.cell}  style={{display: props.hidden ? 'none' : undefined}}>
            <div style={{width: width}}  className={styles.cellContent}>
                {props.value}
            </div>
        </td>
    )
}

Cell.propTypes = {
    width: PropTypes.string,
    hidden: PropTypes.bool,
    value: PropTypes.any,
    // editable: PropTypes.bool
}