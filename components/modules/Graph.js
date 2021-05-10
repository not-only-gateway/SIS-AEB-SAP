import PropTypes from 'prop-types'
import mainStyles from '../../styles/shared/Main.module.css'
import {useEffect, useState} from "react";
import styles from '../../styles/component/Component.module.css'
import {Divider} from "@material-ui/core";

export default function Graph(props) {
    const [maxValue, setMaxValue] = useState(1)
    const [hoveredElement, setHoveredElement] = useState(undefined)
    useEffect(() => {
        let i = 0
        let maxValue = 0
        for (i = 0; i < props.values.length; i++) {
            if (props.values[i].amount > maxValue)
                maxValue = props.values[i].amount
        }

        setMaxValue(maxValue)
    }, [])
    return (
        <div className={mainStyles.displayInlineStart} style={{
            height: '500px',
            width: '100%',
            padding: '16px 16px 0 16px',
            gap: '16px',
            backgroundColor: 'white'
        }}>
            {props.values.map((column, index) => (
                <div

                    style={{
                        width: '50px',
                        height: '100%',
                        display: 'grid', alignItems: 'flex-end',
                        gap: '5px',
                        gridTemplateRows: '92% 8%',
                    }}>
                    <div
                        onMouseLeave={() => setHoveredElement(undefined)}
                        onMouseEnter={() => setHoveredElement(index)}
                        style={{
                            backgroundColor: !column.color ? '#0095ff' : column.color,
                            width: '50px',
                            maxHeight: '100%',
                            height: (column.amount / maxValue) * 100 + '%',
                            borderRadius: '8px 8px 0 0',
                            // boxShadow: hoveredElement === index ? 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' : "unset",
                            position: 'relative'
                        }}>
                        <div className={styles.GraphInfo} style={{
                            opacity: hoveredElement === index ? '1' : '0',
                        }}>
                            <p>{column.amount}</p>
                            <Divider orientation={"horizontal"}/>
                            <p style={{color: '#262626', fontSize: '.9rem'}}>{(column.amount/ maxValue) * 100}%</p>
                        </div>

                    </div>
                    <p style={{textAlign: 'center', height: 'fit-content'}}>
                        {column.label}
                    </p>
                </div>
            ))}
        </div>
    )
}

Graph.propTypes = {
    values: PropTypes.array
}