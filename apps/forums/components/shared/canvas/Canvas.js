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

export default function Canvas(props) {
    const [offsetTop, setOffsetTop] = useState(-1)
    const [data, setData] = useState({dimensions: {width: '100%', height: '100%'}, nodes: [], links: [], groups: []})
    const [toBeLinked, setToBeLinked] = useState(null)
    const [openNodeOverview, setOpenNodeOverview] = useState(false)
    const root = useRef()
    const contextMenuRef = useRef()
    const overflowRef = useRef()
    const canvasRef = useRef()

    const handlePrint = useReactToPrint({
        content: () => root.current
    });

    useEffect(() => {
        if (data.id === undefined && props.data !== undefined && props.data.id !== undefined) {
            setData(props.data)
        }
        if (offsetTop === -1) {
            const element = document.getElementById('frame')
            if (element !== null)
                setOffsetTop(element.offsetTop)
        }
        document.addEventListener('contextmenu', (event) => {
            if (event.target.id === 'canvas' && props.options.edit && contextMenuRef.current !== null && contextMenuRef.current !== undefined && root.current !== undefined) {
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
                contextMenuRef.current.style.top = (event.clientY - root.current.offsetTop) + 'px'
                contextMenuRef.current.style.left = (event.clientX - root.current.offsetLeft) + 'px'
            }
            event.preventDefault();
        })
        return () => {
            document.removeEventListener('contextmenu', () => null)
        }
    }, [props.data])
    const renderNode = (node, inGroup) => {
        return (
            <Node
                node={node} inGroup={inGroup}
                openOverview={() => {

                    if (!openNodeOverview) {
                        setOpenNodeOverview(true)
                        if (contextMenuRef.current.firstChild)
                            ReactDOM.unmountComponentAtNode(contextMenuRef.current)
                        ReactDOM.render(
                            <NodeOverview
                                node={node} setState={setData} data={data}
                                handleClose={() => {
                                    setOpenNodeOverview(false)
                                    ReactDOM.unmountComponentAtNode(contextMenuRef.current)
                                }}
                            />,
                            contextMenuRef.current
                        )
                    }

                }}
                move={node => {
                    Move({
                        ...node,
                        ...{
                            nodes: data.nodes,
                            overflowRef: overflowRef.current,
                            root: root.current,
                            canvasRoot: canvasRef.current,
                            canvasRef: canvasRef.current,
                            groups: data.groups,
                            setState: setData,
                            data: data
                        }
                    })
                }} root={root.current}
                options={props.options} setOpenContext={(event, x, y, id) => {
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
        <div style={{height: 'calc(100vh - ' + offsetTop + 'px)', width: '100%'}}
             id={'frame'}
             onMouseDown={event => {
            if (!openNodeOverview && contextMenuRef.current !== null && contextMenuRef.current.firstChild && event.button === 0 && event.target.className !== 'Pop_popContainer__1N8Wc' && event.target.className !== 'Styles_lineContentContainer__1xCXK' && event.target.className !== 'Canvas_optionButton__1K9rT' && event.target.className !== 'Canvas_lineContentContainer__1xCXK')
                ReactDOM.unmountComponentAtNode(contextMenuRef.current)
        }}>
            <div className={styles.content} ref={overflowRef}>
                <OptionsMenu
                    root={root.current} canvasRef={canvasRef.current} overflowRef={overflowRef.current}
                    data={data} setState={setData} onSave={props.onSave} handlePrint={handlePrint}/>
                <div ref={contextMenuRef} style={{position: 'absolute'}}/>
                <div className={styles.canvasContainer} ref={root} style={{
                    height: data.dimensions.height + 'px',
                    width: data.dimensions.width + 'px'
                }}>
                    <svg width="100%" height="100%" style={{
                        position: 'absolute',
                        overflow: 'hidden',
                        top: '0',
                        left: '0'
                    }}>
                        {toBeLinked !== null && toBeLinked !== undefined ?
                            <Link followMouse={true} source={`${toBeLinked.id}-node`}
                                  color={'#0095ff'} type={'weak'} canEdit={false}
                                  rootOffset={root.current !== undefined && root.current !== null ? {
                                      x: overflowRef.current.offsetLeft,
                                      y: overflowRef.current.offsetTop
                                  } : null}/>
                            :
                            null
                        }
                        {data.links.map(link => (
                            <Link
                                target={`${link.parent}-node`} source={`${link.child}-node`}
                                type={link.type}
                                canEdit={props.options.edit}
                                rootOffset={{
                                    x: root.current.offsetLeft,
                                    y: root.current.offsetTop
                                }}
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
                        <foreignObject width="100%" height="100%" ref={canvasRef} id={'canvas'}>
                            <>
                                {data.nodes.map((node, index) => (
                                    <React.Fragment key={node.id + '-' + index}>
                                        {renderNode(node, false)}
                                    </React.Fragment>
                                ))}
                                {data.groups.map((group, groupIndex) => (
                                    <Group group={group} index={groupIndex} move={data => {
                                        MoveGroup({
                                            ...data,
                                            ...{
                                                overflowRef: overflowRef.current,
                                                root: root.current,
                                                canvasRoot: canvasRef.current,
                                                canvasRef: canvasRef.current,
                                            }
                                        })
                                    }}>
                                        {group.nodes.map((node, index) => (
                                            <React.Fragment key={'group-' + groupIndex + '-' + node.id + '-' + index}>
                                                {renderNode(node, true)}
                                            </React.Fragment>
                                        ))}
                                    </Group>
                                ))}
                            </>
                        </foreignObject>




                    </svg>
                </div>
            </div>
        </div>
    )
}
Canvas.propTypes = CanvasTemplate