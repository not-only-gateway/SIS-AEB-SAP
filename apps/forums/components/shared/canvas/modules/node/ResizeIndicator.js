import PropTypes from 'prop-types'
import NodeTemplate from "../../templates/NodeTemplate";
import ResizeNode from "../../methods/misc/ResizeNode";

export default function ResizeIndicator(props) {
    const getPlacement = () => {
        return {
            x: props.reference.getBBox().x - 1,
            y: props.reference.getBBox().y - 1,
            width: props.reference.getBBox().width + 2,
            height: props.reference.getBBox().height + 2
        }
    }
    if (props.reference !== undefined && props.selected === props.node.id) {
        const placement = getPlacement()
        return (
            <rect width={placement.width} height={placement.height} fill={'none'}
                  stroke={props.node.color} strokeWidth={'2'} id={props.node.id + '-node-resize'}
                  x={placement.x} cursor={'crosshair'}
                  y={placement.y} style={{position: 'absolute'}}
                  onMouseDown={event => {
                      ResizeNode({
                          nodeID: props.node.id,
                          event: event,
                          scale: props.scale,
                          nodeShape: props.node.shape,
                          setSelected: props.setSelected,
                          nodeColor: props.node.color
                      })
                  }}
            />
        )
    } else
        return null
}

ResizeIndicator.propTypes = {
    reference: PropTypes.object,
    selected: PropTypes.string,
    node: NodeTemplate,
    scale: PropTypes.number
}