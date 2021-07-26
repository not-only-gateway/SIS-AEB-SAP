import Node from "../../modules/node/Node";
import ReactDOM from "react-dom";
import Move from "../move/MoveNode";
import React from "react";
import CanvasTemplate from "../../templates/CanvasPropsTemplate";
import PropTypes from 'prop-types'
import OpenNodeOverview from "./OpenNodeOverview";

export default function RenderNodes(props) {
    const handleLink = (id) => {
        if (props.toBeLinked !== null) {
            let newLink = {
                type: props.data.connectionType,
                parent: {id: props.toBeLinked.id},
                child: {
                    id: id
                }
            }
            let newLinks = [...props.data.links, ...[newLink]]
            props.setData({...props.data, links: newLinks})

            props.setToBeLinked(null)
        } else
            props.setToBeLinked({
                id: id
            })
    }
    const handleLinkDelete = (link) => {
        let newLinks = [...props.data.links]
        const index = newLinks.indexOf(link)

        if (index > -1) {
            newLinks.splice(index, 1)
            props.setData({
                ...props.data,
                links: newLinks
            })
        }
    }
    const handleDelete = (index, id) => {
        let newNodes = [...props.data.nodes]
        let linksToRemove = []
        let newLinks = [...props.data.links]
        newNodes.splice(index, 1)

        props.data.links.map((link, lIndex) => {
            if (link.parent.id === id || link.child.id === id)
                linksToRemove = [...linksToRemove, ...[lIndex]]
        })
        linksToRemove.map(i => {
            newLinks.splice(i, 1)
        })
        props.setData({
            ...props.data,
            nodes: newNodes,
            links: newLinks
        })
    }
    const handleMove = (node, index) => {
        Move({
            ...node,
            ...{
                root: props.root,
                setState: props.setData,
                data: props.data,
                scale: props.scale,
                index: index
            }
        })
    }
    const handleContextMenu = (event, x, y) => {
        console.log('OPENING CONTEXT')
        console.log(event)
        console.log(x)
        console.log(y)
        if (event === null)
            ReactDOM.unmountComponentAtNode(props.contextMenuRef)
        else {
            ReactDOM.render(
                event,
                props.contextMenuRef
            )

            props.contextMenuRef.style.top = y + 'px'
            props.contextMenuRef.style.left = x + 'px'
        }
    }

    return (
        <g id={'canvas'}>
            {props.data.nodes.map((node, index) => (
                <g key={`${node.id}-node-${index}`} x={node.placement.x} y={node.placement.y}>
                    <Node
                        node={node} index={index} asStep={false}
                        handleLinkDelete={handleLinkDelete}
                        handleLink={handleLink} toBeLinked={props.toBeLinked}
                        selected={props.selectedNode} links={props.data.links}
                        setSelected={props.setSelectedNode}
                        handleDelete={handleDelete}
                        openOverview={() => OpenNodeOverview({...props, ...{node: node, index: index}})}
                        move={nodeProps => handleMove(nodeProps, index)}
                        root={props.root} options={props.options}
                        setOpenContext={handleContextMenu}
                    />
                </g>
            ))}
            {props.data.steps.map((node, index) => (
                <g key={`${node.id}-step-${index}`}>
                    <Node
                        node={node} index={index} asStep={true}
                        handleLinkDelete={handleLinkDelete}
                        handleLink={handleLink} toBeLinked={props.toBeLinked}
                        selected={props.selectedNode} links={props.data.links}
                        setSelected={props.setSelectedNode}
                        handleDelete={handleDelete}
                        openOverview={() => OpenNodeOverview({...props, ...{node: node, index: index}})}
                        move={nodeProps => handleMove(nodeProps, index)}
                        root={props.root} options={props.options}
                        setOpenContext={handleContextMenu}
                    />
                </g>
            ))}
        </g>
    )
}
RenderNodes.propTypes = {
    ...CanvasTemplate,
    ...{
        contextMenuRef: PropTypes.object,
        root: PropTypes.object,
        scale: PropTypes.number,
        setData: PropTypes.func,
        data: PropTypes.object,
        setOpenNodeOverview: PropTypes.func,
        openNodeOverview: PropTypes.any,
        setSelectedNode: PropTypes.func,
        selectedNode: PropTypes.any,
        toBeLinked: PropTypes.object,
        setToBeLinked: PropTypes.func
    }
}