import PropTypes from "prop-types";
import {useEffect, useState} from "react";

export default function Line(props) {
    const [pivotSource, setPivotSource] = useState({
        x: null,
        y: null
    })
    const [pivotTarget, setPivotTarget] = useState({
        x: null,
        y: null
    })
    useEffect(() => {

        setPivotSource({
            x: props.source.x,
            y: props.source.y - (props.target.y - props.source.y)
        })
        setPivotTarget({
            x: props.target.x,
            y: props.target.y - (props.source.y - props.target.y)
        })
    }, [props])

    return (
        <svg style={{position: 'absolute', width: '100%', height: 'fit-content', overflow: 'visible'}} >
            <path
                stroke={props.color} strokeWidth={'2'} fill={'none'}
                d={'M ' + props.source.x + ', ' + props.source.y + ' L ' + pivotSource.x +', ' +pivotSource.y + ' Q '+(pivotSource.x + 8) +', 0' + '0 '+ (pivotSource.x + 8)+ ', 50 L 300 250 Q 300, 300 350, 300'}/>
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