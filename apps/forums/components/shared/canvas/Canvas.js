import CanvasTemplate from "./templates/CanvasTemplate";
import styles from './styles/Frame.module.css'

import React, {useEffect, useRef, useState} from "react";
import Link from "./modules/link/Link";
import {useReactToPrint} from "react-to-print";
import ReactDOM from "react-dom";
import Node from "./modules/node/Node";
import Move from "./methods/move/MoveNode";
import OptionsMenu from "./modules/navigation/OptionsMenu";
import NodeOverview from "./modules/node/NodeOverview";
import ScrollCanvas from "./methods/move/ScrollCanvas";
import Scale from "./modules/navigation/Scale";
import {v4 as uuid4} from 'uuid';


export default function Canvas(props) {
    const [offsetTop, setOffsetTop] = useState(-1)
    const [data, setData] = useState({
        id: uuid4().toString(),
        subject: 'Sem título',
        nodes: [],
        links: [],
        groups: [],
        dimensions: {}
    })
    const [toBeLinked, setToBeLinked] = useState(null)
    const [openNodeOverview, setOpenNodeOverview] = useState(false)
    const root = useRef()
    const contextMenuRef = useRef()
    const [selectedNode, setSelectedNode] = useState(undefined)
    const [scale, setScale] = useState(1)
    const printRef = useRef()
    const handlePrint = useReactToPrint({
        content: () => printRef.current
    });
    const [selectedLink, setSelectedLink] = useState(null)

    useEffect(() => {
        if (props.data !== undefined && props.data.id !== undefined)
            setData(props.data)
        if (offsetTop === -1) {
            const element = document.getElementById('frame')
            if (element !== null)
                setOffsetTop(element.offsetTop)
        }
    }, [props.data])

    const renderNode = (node, index) => {
        return (
            <Node
                node={node} index={index}
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
                handleLink={(id, type) => {
                    if (toBeLinked !== null) {
                        let newLink = {
                            type: toBeLinked.type,
                            parent: {id: toBeLinked.id},
                            child: {
                                id: id
                            }
                        }
                        let newLinks = [...data.links, ...[newLink]]
                        setData({...data, links: newLinks})

                        setToBeLinked(null)
                    } else
                        setToBeLinked({
                            id: id,
                            type: type
                        })
                }}
                selected={selectedNode} links={data.links}
                setSelected={setSelectedNode} toBeLinked={toBeLinked}
                handleDelete={(index, id) => {
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
                }}
                openOverview={() => {
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
                            setState: setData,
                            data: data,
                            scale: scale
                        }
                    })
                }}
                root={root.current}
                options={props.options}
                setOpenContext={(event, x, y) => {
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
            style={{height: '100%', width: '100%', userSelect: 'none', scrollBehavior: 'auto'}}
            id={'frame'}
            onMouseDown={event => {
                const className = event.target.className
                if (selectedLink && event.target.closest('.Link_input__3SQkm') === null)
                    setSelectedLink(undefined)
                if (selectedNode && event.target.closest('.NodeMenu_selectedHighlight__jWe4i') === null)
                    setSelectedNode(undefined)
                if (toBeLinked !== null && event.target.closest('.NodeMenu_selectedHighlight__jWe4i') === null)
                    setToBeLinked(null)
                if (!openNodeOverview && contextMenuRef.current !== null && contextMenuRef.current.firstChild && className !== 'Canvas_optionButton__1K9rT' && className !== 'Canvas_lineContentContainer__1xCXK')
                    ReactDOM.unmountComponentAtNode(contextMenuRef.current)
            }}>
            <div className={styles.content}>
                <Scale scale={scale} setScale={setScale}/>
                <OptionsMenu
                    root={root.current}
                    data={data}
                    setState={setData}
                    onSave={props.onSave}
                    handlePrint={handlePrint}
                />
                <div ref={contextMenuRef} style={{position: 'absolute'}}/>
                <div ref={root} className={styles.canvasContainer} onMouseDown={event => {
                    if (typeof event.target.className === 'object' && event.button === 2)
                        ScrollCanvas({canvas: root.current, event: event})
                }}>
                    <svg
                        onContextMenu={event => {
                            event.preventDefault()
                            if (openNodeOverview)
                                setOpenNodeOverview(false)
                        }}
                        style={{
                            minWidth: root.current !== undefined ? (root.current.offsetWidth * 2 + 'px') : '100%',
                            minHeight: root.current !== undefined ? (root.current.offsetHeight * 2 + 'px') : '100%',
                            position: 'absolute',
                            transform: `scale(${scale})`,
                            transformOrigin: scale !== 1 ? 'top left' : undefined,
                            top: 0,
                            left: 0
                        }}
                        ref={printRef}
                    >

                        <foreignObject
                            width={'100%'} height={'100%'}
                            id={'canvas'}
                        >

                            {data.nodes.map((node, index) => (
                                <React.Fragment key={node.id + '-' + index}>
                                    {renderNode(node, index)}
                                </React.Fragment>
                            ))}
                        </foreignObject>

                        {data.links.map((link, index) => (
                            <g key={link.child.id + '-link-' + link.parent.id}>

                                <Link
                                    target={link.parent} source={link.child}
                                    type={link.type}
                                    setSelected={setSelectedLink}
                                    selectedLink={selectedLink}
                                    handleChange={event => {
                                        let newLink = {...link}
                                        newLink[event.name] = event.value
                                        let newLinks = [...data.links]

                                        newLinks[index] = newLink
                                        setData({...data, links: newLinks})
                                    }}
                                    canEdit={props.options.edit}
                                    rootOffset={root.current}
                                    openContextMenu={(event, x, y) => {
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
                                    deleteLink={() => {
                                        let newLinks = []
                                        data.links.map(l => {
                                            if (!(l.parent.id === link.parent.id && l.child.id === link.child.id))
                                                newLinks.push(l)
                                        })
                                        setData({...data, links: newLinks})
                                    }}
                                    description={link.description}
                                />
                            </g>
                        ))}

                    </svg>
                </div>
            </div>
        </div>
    )
}
Canvas.propTypes = CanvasTemplate