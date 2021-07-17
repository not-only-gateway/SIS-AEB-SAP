import CanvasTemplate from "./templates/CanvasTemplate";
import styles from './styles/Frame.module.css'

import React, {useEffect, useRef, useState} from "react";
import Link from "./modules/link/Link";
import {useReactToPrint} from "react-to-print";
import ReactDOM from "react-dom";
import CanvasContextMenu from "./modules/CanvasContextMenu";
import LinkContextMenu from "./modules/link/LinkContextMenu";
import Node from "./modules/ node/Node";
import Move from "./methods/move/MoveNode";
import Group from "./modules/Group";
import MoveGroup from "./methods/move/MoveGroup";
import OptionsMenu from "./modules/navigation/OptionsMenu";
import NodeOverview from "./modules/ node/NodeOverview";
import ScrollCanvas from "./methods/move/ScrollCanvas";
import Scale from "./modules/Scale";
import {v4 as uuid4} from 'uuid';


export default function Canvas(props) {
    const [offsetTop, setOffsetTop] = useState(-1)
    const [data, setData] = useState({id: uuid4().toString(), subject: 'Sem título', nodes: [], links: [], groups: []})
    const [toBeLinked, setToBeLinked] = useState(null)
    const [openNodeOverview, setOpenNodeOverview] = useState(false)
    const root = useRef()
    const contextMenuRef = useRef()
    const canvasRef = useRef()
    const [selectedNode, setSelectedNode] = useState(undefined)
    const [scale, setScale] = useState(1)
    const printRef = useRef()
    const handlePrint = useReactToPrint({
        content: () => printRef.current
    });

    useEffect(() => {
        if (props.data !== undefined && props.data.id !== undefined)
            setData(props.data)
        if (offsetTop === -1) {
            const element = document.getElementById('frame')
            if (element !== null)
                setOffsetTop(element.offsetTop)
        }
    }, [props.data])
    const renderNode = (node, inGroup, index, groupIndex) => {
        return (
            <Node
                node={node} inGroup={inGroup} index={index}
                handleLinkDelete={(link) => {
                    let newLinks = [...data.links]
                    const index = newLinks.indexOf(link)

                    if (index > -1) {
                        newLinks.splice(index, 1)
                        setData({
                            ...data,
                            links: newLinks
                        })
                    }
                }}
                handleLink={(id, indicator) => {
                    if (toBeLinked !== null) {
                        let newLink = {
                            parent: toBeLinked,
                            child: {
                                id: id,
                                indicator: indicator
                            }
                        }
                        let newLinks = [...data.links, ...[newLink]]
                        setData({...data, links: newLinks})

                        setToBeLinked(null)
                    } else
                        setToBeLinked({
                            id: id,
                            indicator: indicator
                        })
                }} selected={selectedNode}
                setSelected={setSelectedNode} toBeLinked={toBeLinked}
                handleDelete={(index, id) => {
                    if (!inGroup) {
                        let newNodes = [...data.nodes]
                        let linksToRemove = []
                        let newLinks = [...data.links]
                        newNodes.splice(index, 1)

                        data.links.map((link, lIndex) => {
                            if (link.parent.id === id || link.child.id === id)
                                linksToRemove = [...linksToRemove, ...[lIndex]]
                        })
                        linksToRemove.map(i => {
                            newLinks.splice(i, 1)
                        })
                        setData({
                            ...data,
                            nodes: newNodes,
                            links: newLinks
                        })
                    } else {
                        const groups = [...data.groups]
                        groups[groupIndex].nodes.splice(index, 1)
                        setData({
                            ...data,
                            groups: groups
                        })
                    }
                }}
                links={data.links.filter(l => {
                    if (l.parent.id === node.id)
                        return l
                })}
                openOverview={() => {
                    console.log('OPen')
                    if (openNodeOverview !== node.id) {
                        const nodeEl = document.getElementById(openNodeOverview + '-node')
                        if (nodeEl !== null)
                            nodeEl.style.border = 'transparent 2px solid'
                    }
                    setOpenNodeOverview(node.id)
                    if (contextMenuRef.current.firstChild)
                        ReactDOM.unmountComponentAtNode(contextMenuRef.current)

                    const nodeEl = document.getElementById(node.id + '-node')
                    if (nodeEl !== null)
                        nodeEl.style.border = node.color + ' 2px solid'

                    setSelectedNode(null)
                    ReactDOM.render(
                        <NodeOverview
                            node={node} setState={setData} data={data}
                            handleClose={() => {
                                setSelectedNode(node.id)
                                if (nodeEl !== null)
                                    nodeEl.style.border = 'transparent 2px solid'
                                setOpenNodeOverview(false)
                                ReactDOM.unmountComponentAtNode(contextMenuRef.current)
                            }}
                        />,
                        contextMenuRef.current
                    )
                }}
                move={node => {
                    Move({
                        ...node,
                        ...{
                            nodes: data.nodes,
                            root: root.current,
                            canvasRef: canvasRef.current,
                            groups: data.groups,
                            setState: setData,
                            data: data
                        }
                    })
                }}
                root={root.current}
                options={props.options}
                setOpenContext={(event, x, y, id) => {
                    if (event === null) {
                        ReactDOM.unmountComponentAtNode(contextMenuRef.current)

                    } else {
                        ReactDOM.render(
                            event,
                            contextMenuRef.current
                        )

                        contextMenuRef.current.style.top = y + 'px'
                        contextMenuRef.current.style.left = x + 'px'
                    }
                }}
            />
        )
    }
    return (
        <div
            style={{height: 'calc(100vh - ' + offsetTop + 'px)', width: '100%'}}
            id={'frame'}
            onMouseDown={event => {
                const className = event.target.className
                if (selectedNode && event.target.closest('.NodeMenu_selectedHighlight__jWe4i') === null) {
                    setSelectedNode(undefined)
                }
                if (!openNodeOverview && contextMenuRef.current !== null && contextMenuRef.current.firstChild && event.button === 0 && className !== 'Canvas_optionButton__1K9rT' && className !== 'Canvas_lineContentContainer__1xCXK') {
                    ReactDOM.unmountComponentAtNode(contextMenuRef.current)
                }
            }}>
            <div
                className={styles.content}>
                <Scale scale={scale} setScale={setScale}/>
                < OptionsMenu
                    root={root.current}
                    canvasRef={canvasRef.current}
                    data={data}
                    setState={setData}
                    onSave={props.onSave}
                    handlePrint={handlePrint}
                />
                <div ref={contextMenuRef} style={{position: 'absolute'}}/>
                <div ref={root} className={styles.canvasContainer} onMouseDown={event => {
                    if (typeof event.target.className === 'object')
                        ScrollCanvas({canvas: root.current, event: event})
                }}>
                    <svg
                        onContextMenu={event => {
                            event.preventDefault()
                            if (openNodeOverview)
                                setOpenNodeOverview(false)

                            const classname = event.target.className
                            if (classname !== 'Node_entityContainer__3-Msx Node_circleContainer__1Rgcz' &&
                                classname !== 'Node_body__1O9a2' && classname !== 'NodeMenu_selectedHighlight__jWe4i' &&
                                classname !== 'Node_header__2yhU5' &&
                                classname !== 'Node_entityContainer__3-Msx' &&
                                classname !== 'Frame_group__3mVSW' && classname !== "Node_headerCircle__1yS6F") {

                                if (contextMenuRef.current.firstChild)
                                    ReactDOM.unmountComponentAtNode(contextMenuRef.current)

                                ReactDOM.render(
                                    <CanvasContextMenu
                                        handlePrint={handlePrint}
                                        handleClose={() => ReactDOM.unmountComponentAtNode(contextMenuRef.current)}
                                        triggerUpdate={props.triggerUpdate}
                                        handleCreate={props.handleCreate}/>,
                                    contextMenuRef.current
                                )
                                contextMenuRef.current.style.top = (event.clientY - 210) + 'px'
                                contextMenuRef.current.style.left = (event.clientX - 13) + 'px'
                            }

                        }}
                        style={{
                            minWidth: root.current !== undefined ? (root.current.offsetWidth * 2 + 'px') : '100%',
                            minHeight: root.current !== undefined ? (root.current.offsetHeight * 2 + 'px') : '100%',
                            position: 'absolute',
                            scale: scale,
                            top: 0,
                            left: 0
                        }}
                        ref={printRef}
                    >


                        {toBeLinked !== null && toBeLinked !== undefined ?
                            <Link followMouse={true} source={`${toBeLinked.id}-node`}
                                  color={'#0095ff'} type={'weak'} canEdit={false}
                                  rootOffset={root.current}/>
                            :
                            null
                        }
                        {data.links.map(link => (
                            <Link
                                target={link.parent} source={link.child}
                                type={link.type}
                                canEdit={props.options.edit}
                                rootOffset={root.current}
                                renderMenu={event => {
                                    if (contextMenuRef.current.firstChild)
                                        ReactDOM.unmountComponentAtNode(contextMenuRef.current)
                                    ReactDOM.render(
                                        <LinkContextMenu
                                            child={link.child}
                                            parent={link.parent}
                                            triggerLinkChange={event => {
                                                // props.triggerUpdate()
                                                // HandleLinkChange({
                                                //     entities: props.entities,
                                                //     updateEntity: props.updateEntity,
                                                //     event: event
                                                // })
                                            }}
                                        />,
                                        contextMenuRef.current
                                    )
                                    contextMenuRef.current.style.top = (event.clientY - root.current.offsetTop + 70) + 'px'
                                    contextMenuRef.current.style.left = (event.clientX - root.current.offsetLeft) + 'px'
                                }}
                                description={link.description}
                            />
                        ))}

                        <foreignObject
                            width={'100%'} height={'100%'}
                            ref={canvasRef} id={'canvas'}
                        >

                            {data.nodes.map((node, index) => (
                                <React.Fragment key={node.id + '-' + index}>
                                    {renderNode(node, false, index, -1)}
                                </React.Fragment>
                            ))}
                            {data.groups.map((group, groupIndex) => (
                                <Group group={group} index={groupIndex} move={data => {
                                    MoveGroup({
                                        ...data,
                                        ...{
                                            root: root.current,
                                            canvasRoot: canvasRef.current,
                                            canvasRef: canvasRef.current,
                                        }
                                    })
                                }}>
                                    {group.nodes.map((node, index) => (
                                        <React.Fragment key={'group-' + groupIndex + '-' + node.id + '-' + index}>
                                            {renderNode(node, true, index, groupIndex)}
                                        </React.Fragment>
                                    ))}
                                </Group>
                            ))}
                        </foreignObject>

                    </svg>
                </div>
            </div>
        </div>
    )
}
Canvas.propTypes = CanvasTemplate