import PropTypes from 'prop-types'
import React, {useEffect, useState} from "react";
import NodeTemplate from "../../../templates/NodeTemplate";
import styles from '../../../styles/Node.module.css'

export default function ConnectionIndicator(props) {
    const [canRender, setCanRender] = useState(true)
    useEffect(() => {
        setCanRender(true)
        props.node.links.map((entity) => {
            if ((entity.parent.id === props.node.id && entity.parent.connectionPoint === props.connectionPoint) || (entity.child.id === props.node.id && entity.child.connectionPoint === props.connectionPoint)) {
                setCanRender(false)
            }
        })
    })
    const getPlacement = () => {
        console.log(props.reference)
        const bBox = {
            width: props.reference.firstChild.getBBox().width,
            height: props.reference.firstChild.getBBox().height,
            x: parseInt(props.reference.firstChild.getAttribute('x')),
            y: parseInt(props.reference.firstChild.getAttribute('y'))
        }
        let response = {}
        switch (props.connectionPoint) {
            case 'a': {
                response = {
                    x: bBox.x + bBox.width / 2,
                    y: bBox.y - 15
                }
                break
            }
            case 'b': {
                response = {
                    x: bBox.x + bBox.width + 15,
                    y: bBox.y + bBox.height / 2
                }
                break
            }
            case 'c': {

                response = {
                    x: bBox.x + bBox.width / 2,
                    y: bBox.y + bBox.height + 15
                }
                break
            }
            case 'd': {
                response = {
                    x: bBox.x - 15,
                    y: bBox.y + bBox.height / 2
                }
                break
            }
            default:
                break
        }
        return response
    }

    if (canRender && props.reference !== undefined && (props.selected === props.node.id || props.linkable)) {
        const placement = getPlacement()
        return (
            // <image
            //     href={'./straight-right-arrow.svg'}
            //        x={placement.x}
            //        y={placement.y} width={'20px'} height={'20px'}/>
            <circle
                onMouseDown={() => props.handleLink(props.node, props.connectionPoint)}
                onMouseUp={() => props.handleLink(props.node, props.connectionPoint)}
                id={props.node.id + '-' + props.connectionPoint}
                cx={placement.x} className={styles.entityContainer}
                cy={placement.y} stroke={props.node.styling.color} strokeWidth={'2'}
                r={'5'}
                // className={styles.indicator}
                fill={'transparent'}
            />
        )
    } else {
        return null
    }
}
ConnectionIndicator.propTypes = {
    node: NodeTemplate,
    reference: PropTypes.object,
    selected: PropTypes.string,
    connectionPoint: PropTypes.oneOf(['a', 'b', 'c', 'd']),
    handleLink: PropTypes.func
}