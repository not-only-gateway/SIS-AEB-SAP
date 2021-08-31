import PropTypes from 'prop-types'
import styles from './styles/Horizontal.module.css'
import {useEffect, useRef, useState} from "react";
import ToolTip from "../core/tooltip/ToolTip";

export default function HorizontalChart(props) {
    const [biggest, setBiggest] = useState(null)
    const [sortedData, setSortedData] = useState([])
    const [iterations, setIterations] = useState([])
    const [numberOfIterations, setNumberOfIterations] = useState(10)
    const ref = useRef()
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
         let value
        props.data.forEach((e) => {
            if (value === undefined)
                value = e[props.valueField]
            else if (e[props.valueField] > value)
                value = e[props.valueField]
        })

        let nI =[]
        let m = 1
        for (let i = 0; i <= (value.toString().length -1); i++) {
            m = m * numberOfIterations
        }
        if(m/numberOfIterations !== value)
            value = m

        else
            value = m/numberOfIterations
        let nB = value
        for (let i = 0; i <= numberOfIterations; i++) {
            if (i > 0)
                nB = nB - value / numberOfIterations
            nI.push(nB)
        }
        setBiggest(value)
        nI.reverse()
        setIterations(nI)
    }, [props.data])
    return (
        <div className={styles.container} style={props.styles}>
            <div className={styles.header}>
                {props.title}
            </div>
            {/*<div className={styles.legendsContainer}*/}
            {/*     style={{display: props.legends !== undefined ? undefined : 'none'}}>*/}
            {/*    {props.legendLabel}*/}
            {/*</div>*/}
            <div className={styles.content}>
                <div className={styles.axisLabel}>
                    {props.axisLabel}
                </div>
                <div style={{width: '100%'}}>
                    <div className={styles.graphs} ref={ref}>
                        {sortedData.map((d, index) => (
                            <div className={styles.row}>
                                <div className={styles.label}>
                                    {d[props.axisField]}
                                </div>
                                <div style={{
                                    width: `${((d[props.valueField] / numberOfIterations) / (biggest / numberOfIterations)) * 100}%`,
                                    background: `rgba(0, 149, 255, ${1.5 / (index + 1)}`,
                                    color: (1.5 / (index + 1)) < .5 ? '#333333' : undefined
                                }} className={styles.data}>
                                    <ToolTip color={'#f4f5fa'}>
                                        <div className={styles.overview}>

                                            <div style={{
                                                color: '#555555',
                                                fontSize: '.9rem',
                                                fontWeight: 'bold',
                                                textAlign: 'left',
                                                width: '100%'
                                            }}>
                                                {props.axisLabel}: {d[props.axisField]}
                                            </div>
                                            <div style={{
                                                color: '#666666',
                                                fontSize: '.9rem',
                                                textAlign: 'left',
                                                width: '100%'
                                            }}>
                                                {props.valueLabel}: {d[props.valueField]}
                                            </div>
                                        </div>
                                    </ToolTip>
                                </div>
                            </div>
                        ))}

                    </div>
                    <div className={styles.values}>
                        {iterations.map((e, i) => (
                            <div className={styles.value} style={{width: numberOfIterations + '%'}}>
                                <div className={styles.valueDivider}
                                     style={{height: ref.current.offsetHeight + 'px', transform: `translateY(-100%)`}}/>
                                {e}
                            </div>
                        ))}
                    </div>
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