import PropTypes from 'prop-types'
import styles from './styles/Horizontal.module.css'
export default function HorizontalChart(props) {
    return(
        <div className={styles.container} style={props.styles}>
            <div className={styles.header}>
                {props.title}
            </div>
            <div className={styles.legendsContainer} style={{display: props.legends !== undefined ? undefined : 'none'}}>
                {props.legendLabel}
            </div>
            <div className={styles.content}>
                <div className={styles.axisLabel}>
                    {props.axisLabel}
                </div>
                <div>

                </div>
            </div>
            <div className={styles.valuesLabel}>
                {props.valueLabel}
            </div>
        </div>
    )
}
HorizontalChart.propTypes = {
    valueLabel: PropTypes.string,
    valuesField: PropTypes.arrayOf(PropTypes.any),
    legendLabel: PropTypes.string,
    legendsField: PropTypes.arrayOf(PropTypes.any),
    axisField: PropTypes.string,
    axisLabel: PropTypes.string,
    styles: PropTypes.object,
    title: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.object)
}