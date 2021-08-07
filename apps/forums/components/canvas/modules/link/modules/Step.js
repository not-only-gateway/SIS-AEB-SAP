import PropTypes from 'prop-types'
import styles from "../../../styles/Node.module.css";
import React, {useEffect, useState} from "react";

export default function Step(props) {
    const [placement, setPlacement] = useState({
        x: undefined,
        y: undefined
    })
    useEffect(() => {
        if (props.pathRef !== null && props.pathRef !== undefined && (placement.x === undefined || placement.y === undefined))
            setPlacement({
                y: props.pathRef.getBBox().y + props.pathRef.getBBox().height / 2 - 1,
                x: props.pathRef.getBBox().x + props.pathRef.getBBox().width / 2 - 50
            })

        document.addEventListener('mousemove', function move(event) {
            if (props.onMove)
                setPlacement({
                    y: props.pathRef.getBBox().y + props.pathRef.getBBox().height / 2 - 1,
                    x: props.pathRef.getBBox().x + props.pathRef.getBBox().width / 2 - 50
                })
            else
                event.currentTarget.removeEventListener('mousemove', move);
        })

    }, [props.onMove])
    return (
        props.pathRef !== null && props.pathRef !== undefined && ((props.description !== undefined && props.description.length > 0) || props.show) ?
            <foreignObject
                width={'100'} height={'30'}
                y={placement.y}
                x={placement.x}
                style={{
                    boxShadow: '0 4px 30px rgb(22 33 74 / 5%)',
                    transition: 'border 150ms linear',
                    borderRadius: '5px',
                    background: 'white',
                    padding: '4px',
                    border: props.pathRef.getAttribute('stroke') + ' 2px solid'

                }}
            >
                <input
                    onBlur={() => {
                        if (props.description === undefined || props.description.length === 0)
                            props.setShow(false)
                    }} onChange={event => {
                    props.handleChange({
                        name: 'description',
                        value: event.target.value
                    })
                }}
                    value={props.description} className={styles.stepInput}
                />
            </foreignObject>
            :
            null

    )
}

Step.propTypes = {
    pathRef: PropTypes.object,
    description: PropTypes.string,
    handleChange: PropTypes.func,
    onMove: PropTypes.bool,
    show: PropTypes.bool,
    setShow: PropTypes.func
}