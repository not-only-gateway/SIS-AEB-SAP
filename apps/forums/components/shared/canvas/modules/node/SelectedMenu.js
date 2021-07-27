import PropTypes from 'prop-types'
import React, {useEffect, useState} from "react";
import NodeTemplate from "../../templates/NodeTemplate";


export default function SelectedMenu(props) {
    const renderDots = () => {
        const bBox = props.nodeRef.getBBox()
        return (
            <g>
                <circle
                    onClick={() => props.handleLink(props.node, 'a')} id={props.node.id + '-a'}
                    cx={bBox.x + bBox.width / 2}
                    cy={bBox.y - 10}
                    stroke={'red'} r={'4'}
                    fill={'red'}/>
                <circle
                    onClick={() => props.handleLink(props.node, 'b')}
                    cx={bBox.x + bBox.width + 10}
                    cy={bBox.y + bBox.height / 2}
                    stroke={'red'} r={'4'} id={props.node.id + '-b'}
                    fill={'red'}/>
                <circle
                    onClick={() => props.handleLink(props.node, 'c')}
                    cx={bBox.x + bBox.width / 2}
                    cy={bBox.y + bBox.height + 10} stroke={'red'} r={'4'} id={props.node.id + '-c'}
                    fill={'red'}/>
                <circle
                    onClick={() => props.handleLink(props.node, 'd')}
                    cx={bBox.x - 10}
                    cy={bBox.y + bBox.height / 2}
                    stroke={'red'} r={'4'}
                    id={props.node.id + '-d'}
                    fill={'red'}
                />
            </g>
        )
    }

    const renderBox = () => {
        const bBox = props.nodeRef.getBBox()
        return (
            <rect
                visibility={props.selected === props.node.id ? 'visible' : 'hidden'}
                width={bBox.width + 20}
                height={bBox.height + 20}
                stroke={props.node.color} fill={'transparent'}
                x={bBox.x - 10} y={bBox.y - 10}
                strokeDasharray={'3,3'} strokeWidth={'2'}
            />
        )
    }
    return (
        <g>
            {props.selected === props.node.id ?
                renderBox()
                :
                null
            }
            {props.selected === props.node.id || (props.toBeLinked !== null && props.linkable) ?
                renderDots()
                :
                null
            }
        </g>
    )
}
SelectedMenu.propTypes = {
    selected: PropTypes.string,
    linkable: PropTypes.bool,
    nodeRef: PropTypes.object,
    node: NodeTemplate,
    handleLink: PropTypes.func,
    toBeLinked: PropTypes.string
}