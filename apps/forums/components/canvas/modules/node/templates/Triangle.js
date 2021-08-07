import PropTypes from 'prop-types'
import NodePropsTemplate from "../../../templates/NodePropsTemplate";

export default function Triangle(props) {
    return (
        <polygon
            points={`${props.node.dimensions.width},${props.node.dimensions.height} 0,${props.node.dimensions.width} ${props.node.dimensions.width / 2},0`}
            stroke={props.node.styling.color} strokeWidth={props.node.styling.borderWidth} filter={ 'drop-shadow(0 0.2rem 0.25rem rgba(0, 0, 0, 0.08))'}
            rx={props.node.styling.border} ry={props.node.styling.border} fill={'white'} strokeLinejoin={'round'}/>
    )
}
Triangle.propTypes = {
    ...NodePropsTemplate,
    ...{
        ref: PropTypes.object
    }
}