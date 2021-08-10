import PropTypes from 'prop-types'
import NodeTemplate from "../../../templates/NodeTemplate";
import ResizeNode from "../../../methods/misc/ResizeNode";
import styles from '../../../styles/Node.module.css'

export default function ResizeIndicator(props) {
    const getPlacement = () => {
        return {
            x: props.reference.firstChild.getAttribute('x') - 2,
            y: props.reference.firstChild.getAttribute('y') - 2,
            width: props.reference.firstChild.getBBox().width + 4,
            height: props.reference.firstChild.getBBox().height + 4
        }
    }
    if (props.reference !== undefined && props.selected === props.node.id) {
        const placement = getPlacement()
        return (
            <rect width={placement.width} height={placement.height} fill={'none'} className={styles.entityContainer}
                  stroke={'#777777'} strokeWidth={'2'} id={props.node.id + '-node-resize'}
                  x={placement.x} cursor={'crosshair'}
                  y={placement.y} style={{position: 'absolute', transition: 'fill 150ms linear'}}
                  rx={props.node.styling.border} ry={props.node.styling.border}
                  onMouseDown={event => {
                      ResizeNode({
                          node: props.node,
                          event: event,
                          scale: props.scale,
                          nodeShape: props.node.shape,
                          setSelected: props.setSelected,
                          nodeColor: props.node.color,
                          handleSizeChange: props.handleSizeChange

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
    setSelected: PropTypes.func,
    node: NodeTemplate,
    scale: PropTypes.number,
    handleSizeChange: PropTypes.func
}