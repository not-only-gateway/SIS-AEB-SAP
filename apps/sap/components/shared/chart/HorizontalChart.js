import PropTypes from 'prop-types'
import styles from './styles/Horizontal.module.css'
import {useEffect, useState} from "react";
import ToolTip from "../core/tooltip/ToolTip";

export default function HorizontalChart(props) {
    const [biggest, setBiggest] = useState(null)
    const [sortedData, setSortedData] = useState([])
    useEffect(() => {
        const nData = [...props.data]

        const compare = (a, b) => {
            let fA = a[props.valueField]
            let fB = b[props.valueField]
            if (fA < fB)
                return 1;
            if (fA > fB)
                return -1;
            return 0;
        }
        nData.sort(compare);

        setSortedData(nData)
        let b
        props.data.forEach((e) => {
            if (b === undefined)
                b = e[props.valueField]
            else if (e[props.valueField] > b)
                b = e[props.valueField]
        })

        setBiggest(b)
    }, [props.data])
    return (
        <div className={styles.container} style={props.styles}>
            <div className={styles.header}>
                {props.title}
            </div>
            <div className={styles.legendsContainer}
                 style={{display: props.legends !== undefined ? undefined : 'none'}}>
                {props.legendLabel}
            </div>
            <div className={styles.content}>
                <div className={styles.axisLabel}>
                    {props.axisLabel}
                </div>
                <div className={styles.graphs}>
                    {sortedData.map((d, index) => (
                        <div className={styles.row}>
                            <div className={styles.label}>
                                {d[props.axisField]}
                            </div>
                            <div style={{
                                width: `${((d[props.valueField] / 10) / (biggest / 10)) * 100}%`,
                                background: `rgba(0, 149, 255, ${1.5 / (index + 1)}`,
                                color: (1.5 / (index + 1)) < .5 ? '#333333' : undefined
                            }} className={styles.data}>
                                <ToolTip>
                                    <div className={styles.overview}>
                                        {d[props.axisField]}
                                        <div>
                                            {d[props.valueField]}
                                        </div>
                                    </div>
                                </ToolTip>
                            </div>
                        </div>
                    ))}
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
    valueField: PropTypes.string,

    axisField: PropTypes.string,
    axisLabel: PropTypes.string,
    styles: PropTypes.object,
    title: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.object)
}