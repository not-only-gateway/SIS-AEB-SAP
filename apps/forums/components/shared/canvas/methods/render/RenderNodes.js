import Node from "../../modules/node/Node";
import ReactDOM from "react-dom";
import Move from "../move/MoveNode";
import React from "react";
import CanvasTemplate from "../../templates/CanvasPropsTemplate";
import PropTypes from 'prop-types'
import OpenNodeOverview from "./OpenNodeOverview";

export default function RenderNodes(props) {
    const handleLink = (node, connection, index) => {
        if (props.toBeLinked !== null) {
            props.setSelectedNode(undefined)
            let newLink = {
                type: props.data.connectionType,
                parent: {
                    id: props.toBeLinked.id,
                    connectionPoint: props.toBeLinked.connectionPoint,
                    nodeShape: props.toBeLinked.nodeShape,
                    index: props.toBeLinked.index
                },
                child: {
                    id: node.id,
                    connectionPoint: connection,
                    nodeShape: node.shape,
                    index: index
                }
            }
            let newLinks = [...props.data.links, ...[newLink]]
            let newNodes = [...props.data.nodes]
            newNodes[props.toBeLinked.index].links = [...newNodes[props.toBeLinked.index].links, ...[newLink]]
            newNodes[index].links = [...newNodes[index].links, ...[newLink]]

            props.setData({...props.data, links: newLinks, nodes: newNodes})
            props.setToBeLinked(null)
        } else {
            props.setSelectedNode(undefined)
            props.setToBeLinked({
                id: node.id,
                connectionPoint: connection,
                nodeShape: node.shape,
                index: index
            })
        }
    }
    const handleLinkDelete = (link) => {
        let newLinks = [...props.data.links]
        const index = newLinks.indexOf(link)
        let newNodes = [...props.data.nodes]
        newNodes[link.child.index].links.splice(newNodes[link.child.index].links.find((l, index) => {
            if (l === link)
                return index
        }), 1)
        newNodes[link.parent.index].links.splice(newNodes[link.parent.index].links.find((l, index) => {
            if (l === link)
                return index
        }), 1)
        if (index > -1) {
            newLinks.splice(index, 1)
            props.setData({
                ...props.data,
                links: newLinks,
                nodes: newNodes
            })
        }
    }
    const handleDelete = (index, id) => {
        let newNodes = [...props.data.nodes]
        newNodes.splice(index, 1)

        props.data.links.map(link => {
            if (link.parent.id === id || link.child.id === id)
                handleLinkDelete(link)
        })

        props.setData({
            ...props.data,
            nodes: newNodes
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
                index: index,
                setSelectedNode: props.setSelectedNode
            }
        })
    }
    const handleContextMenu = (event, x, y) => {
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
                        handleLink={(node, connection) => handleLink(node, connection, index)}
                        toBeLinked={props.toBeLinked}
                        selected={props.selectedNode} links={props.data.links}
                        setSelected={props.setSelectedNode}
                        handleDelete={handleDelete} scale={props.scale}
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
                        handleLink={(node, connection) => handleLink(node, connection, index)}
                        toBeLinked={props.toBeLinked}
                        selected={props.selectedNode} links={props.data.links}
                        setSelected={props.setSelectedNode}
                        handleDelete={handleDelete} scale={props.scale}
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