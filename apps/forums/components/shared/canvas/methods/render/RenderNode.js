import Node from "../../modules/node/Node";
import ReactDOM from "react-dom";
import NodeOverview from "../../modules/node/NodeOverview";
import Move from "../move/MoveNode";
import React from "react";
import CanvasTemplate from "../../templates/CanvasTemplate";
import Canvas from "../../Canvas";
import PropTypes from 'prop-types'
import OpenNodeOverview from "./OpenNodeOverview";

export default function RenderNode(props) {
    return (
        <Node
            node={props.node} index={props.index} asStep={props.asStep}
            handleLinkDelete={(link) => {
                let newLinks = [...props.data.links]
                const index = newLinks.indexOf(link)

                if (index > -1) {
                    newLinks.splice(index, 1)
                    props.setData({
                        ...props.data,
                        links: newLinks
                    })
                }
            }}
            handleLink={id => {
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
            }}
            selected={props.selectedNode} links={props.data.links}
            setSelected={props.setSelectedNode} toBeLinked={props.toBeLinked}
            handleDelete={(index, id) => {
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
            }}
            openOverview={() => {
                OpenNodeOverview(props)
            }}
            move={node => {
                Move({
                    ...node,
                    ...{
                        root: props.root,
                        setState: props.setData,
                        data: props.data,
                        scale: props.scale,
                        index: props.index
                    }
                })
            }}
            root={props.root}
            options={props.options} setOpenContext={(event, x, y) => {
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
        }}
        />
    )
}
RenderNode.propTypes = {
    ...CanvasTemplate,
    ...{
        contextMenuRef: PropTypes.object,
        root: PropTypes.object,
        scale: PropTypes.number,
        index: PropTypes.number,
        setData: PropTypes.func,
        data: PropTypes.object,
        setOpenNodeOverview: PropTypes.func,
        openNodeOverview: PropTypes.any,
        setSelectedNode: PropTypes.func,
        selectedNode: PropTypes.any,
        node: PropTypes.object,
        toBeLinked: PropTypes.object,
        setToBeLinked: PropTypes.func,
        asStep: PropTypes.bool,
        nodesRef: PropTypes.object
    }
}