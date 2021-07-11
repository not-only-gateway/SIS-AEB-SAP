import PropTypes from "prop-types";
import {useEffect, useState} from "react";

export default function Line(props) {


    return (
        <svg style={{
            position: 'absolute',
            overflow: 'visible',
            top: (props.target.y + props.target.offsetHeight / 2) + 'px',
            left: props.target.offsetHeight / 2 + 'px'
        }}>
            <path
                stroke={props.color} strokeWidth={'2'} fill={'none'}
                d={`M${props.source.x},${props.source.y} C${props.source.x},${(props.source.y - props.target.y) / 2} ${props.target.x},${(props.source.y - props.target.y) / 2} ${props.target.x},${props.target.y}`}/>
        </svg>
    )

}

Line.propTypes = {
    color: PropTypes.string,
    source: PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number,
        offsetHeight: PropTypes.number
    }),
    target: PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number,
        offsetHeight: PropTypes.number
    }),
}