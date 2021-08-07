import PropTypes from 'prop-types'
import styles from "../../../styles/Node.module.css";
import React, {useEffect, useState} from "react";

export default function Placement(props) {
    const [placement, setPlacement] = useState({
        x: props.x,
        y: props.y
    })
    useEffect(() => {
        let moving = true
        document.addEventListener('mousemove', function move(event) {
            if (moving)
                setPlacement({
                    x: props.nodeRef.getBBox().x,
                    y: props.nodeRef.getBBox().y
                })
            else
                event.currentTarget.removeEventListener('mousemove', move);
        })
        document.addEventListener("mouseup", function up(event) {
            moving = false
            document.removeEventListener('mousemove', () => null)
            event.currentTarget.removeEventListener('mousemove', up);
        }, {
            once: true
        })
        return () => {
            document.removeEventListener('mousemove', () => null)
        }
    }, [])
    return (
        <svg height={20}>
            <rect
                rx={'5'}
                ry={'5'}
                fill={'white'} strokeWidth={'2'}
                x={0}
                y={0} stroke={'#e0e0e0'}
                height={'100%'}
                width={150}
            />
            <foreignObject
                x={0}
                y={0}
                width={150}
                height={'100%'}
                style={{
                    boxShadow: '0 4px 30px rgb(22 33 74 / 5%)',

                }}
            >
                <div className={styles.header} style={{fontSize: '.9rem', textAlign: 'center', wordSpacing: '2px'}}>
                    {Math.ceil(placement.x)}, {Math.ceil(placement.y)}
                </div>
            </foreignObject>
        </svg>
    )
}

Placement.propTypes = {
    x: PropTypes.number,
    y: PropTypes.number,
    nodeRef: PropTypes.object,
    nodeSlotRef: PropTypes.object,
    shape: PropTypes.string
}