import PropTypes from 'prop-types'
import NodePropsTemplate from "../../../templates/NodePropsTemplate";

export default function Triangle(props) {
    return (
        <path
            d={`M ${props.node.placement.x} ${props.node.placement.y} L ${props.node.placement.x} ${props.node.placement.y + 50} L ${props.node.placement.x + 50} ${props.node.placement.y}`}
            fill={'white'} stroke={props.node.color} strokeWidth={'2'}/>
    )
}
Triangle.propTypes = {...NodePropsTemplate, ...{ref: PropTypes.object}}