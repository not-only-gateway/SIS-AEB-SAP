import PropTypes from 'prop-types'
import NodeTemplate from "../../../templates/NodeTemplate";
import ResizeNode from "../../../methods/misc/ResizeNode";

export default function ResizeIndicator(props) {
    const getPlacement = () => {
        return {
            x: props.reference.getBBox().x,
            y: props.reference.getBBox().y,
            width: props.reference.getBBox().width,
            height: props.reference.getBBox().height
        }
    }
    if (props.reference !== undefined && props.selected === props.node.id) {
        const placement = getPlacement()
        const radius = props.node.shape === 'circle' || props.node.shape === 'ellipse' ? '50%' : (props.node.shape.includes('rounded') ? '5' : undefined)

        return (
            <rect width={placement.width} height={placement.height} fill={'none'}
                  stroke={props.node.color} strokeWidth={'3'} id={props.node.id + '-node-resize'}
                  x={placement.x} cursor={'crosshair'}
                  y={placement.y} style={{position: 'absolute', transition: 'fill 150ms linear'}}
                  rx={radius} ry={radius}
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