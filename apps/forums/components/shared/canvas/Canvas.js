import CanvasTemplate from "./templates/CanvasTemplate";
import FrameTemplate from "./templates/FrameTemplate";
import styles from './styles/Frame.module.css'

import React, {useEffect, useRef, useState} from "react";
import PropTypes from 'prop-types'
import Header from "./modules/Header";
import Link from "./modules/link/Link";
import {useReactToPrint} from "react-to-print";
import ReactDOM from "react-dom";
import CanvasContextMenu from "./modules/CanvasContextMenu";
import LinkContextMenu from "./modules/link/LinkContextMenu";
import HandleLinkChange from "./methods/HandleLinkChange";
import Node from "./modules/ node/Node";

export default function Canvas(props) {
    const [offsetTop, setOffsetTop] = useState(-1)
    const [openMenu, setOpenMenu] = useState(null)
    const [toBeLinked, setToBeLinked] = useState(null)
    const [linkable, setLinkable] = useState(false)
    const root = useRef()
    const contextMenuRef = useRef()
    const overflowRef = useRef()
    const canvasRef = useRef()
    const [dimensions, setDimensions] = useState({
        width: -1,
        height: -1,
        viewPortWidth: document.documentElement.offsetWidth,
        viewPortHeight: document.documentElement.offsetHeight,
    })
    const handlePrint = useReactToPrint({
        content: () => root.current
    });

    useEffect(() => {
        if (offsetTop === -1) {
            const element = document.getElementById('frame')
            if (element !== null)
                setOffsetTop(element.offsetTop)
        }
        document.addEventListener('mousedown', (event) => {

            if (contextMenuRef.current !== null && contextMenuRef.current.firstChild && event.button === 0 && event.target.className !== 'Pop_popContainer__1N8Wc' && event.target.className !== 'Styles_lineContentContainer__1xCXK' && event.target.className !== 'Canvas_optionButton__1K9rT' && event.target.className !== 'Canvas_lineContentContainer__1xCXK') {
                ReactDOM.unmountComponentAtNode(contextMenuRef.current)
                setOpenMenu(null)

            }
        })
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
        props.entities.map(entity => {
            if (entity.x > (dimensions.viewPortWidth)) {
                setDimensions({
                    width: entity.x + 150,
                    height: dimensions.height,
                    viewPortWidth: dimensions.viewPortWidth,
                    viewPortHeight: dimensions.viewPortHeight
                })
            }
            if (entity.y > (dimensions.viewPortHeight - overflowRef.current.offsetTop)) {
                setDimensions({
                    width: dimensions.width,
                    height: entity.y + 150,
                    viewPortWidth: dimensions.viewPortWidth,
                    viewPortHeight: dimensions.viewPortHeight
                })
            }
        })

    }, [props.entities])

    return (
        <div className={styles.container} style={{...props.style, ...{height: 'calc(100vh - ' + offsetTop + 'px)'}}}

             id={'frame'}>
            <Header {...props.subject}/>

            <div className={styles.content} ref={overflowRef}>
                <div ref={contextMenuRef} style={{position: 'absolute'}}/>
                <div className={styles.canvasContainer} ref={root} style={{
                    height: dimensions.height !== -1 ? dimensions.height + 'px' : 'auto',
                    width: dimensions.width !== -1 ? dimensions.width + 'px' : 'auto',
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
                        <foreignObject width="100%" height="100%" ref={canvasRef} id={'canvas'}>
                            {props.entities.map((entity, index) => (
                                <React.Fragment key={entity.id + '-' + index}>
                                    <Node
                                        overflowRef={overflowRef.current}
                                        setOpenContext={(event, x, y, id) => {
                                            if (event === null) {
                                                ReactDOM.unmountComponentAtNode(contextMenuRef.current)
                                                setOpenMenu(null)
                                            } else {
                                                ReactDOM.render(
                                                    event,
                                                    contextMenuRef.current
                                                )
                                                setOpenMenu(id)
                                                contextMenuRef.current.style.top = y + 'px'
                                                contextMenuRef.current.style.left = x + 'px'
                                            }
                                        }}
                                        index={index} root={root.current}
                                        renderOnRoot={(event, x, y) => {
                                            if (event === null)
                                                ReactDOM.unmountComponentAtNode(contextMenuRef.current)
                                            else {
                                                if (contextMenuRef.current.firstChild)
                                                    ReactDOM.unmountComponentAtNode(contextMenuRef.current)

                                                ReactDOM.render(
                                                    event,
                                                    contextMenuRef.current
                                                )

                                                contextMenuRef.current.style.top = (y - contextMenuRef.current.firstChild.offsetHeight) + 'px'
                                                contextMenuRef.current.style.left = x + 'px'
                                            }
                                        }}
                                        canvasRef={canvasRef.current}
                                        handleLink={(entity) => {
                                            if (entity === null)
                                                setToBeLinked(entity)
                                            if (toBeLinked === null) {
                                                setToBeLinked(entity)
                                            } else if (entity.id !== toBeLinked.id && !entity.parents.includes(toBeLinked.id)) {
                                                props.triggerUpdate()
                                                props.triggerLink(entity, toBeLinked)
                                                setToBeLinked(null)
                                                setLinkable(false)
                                            } else {
                                                setToBeLinked(null)
                                                setLinkable(false)
                                            }
                                        }}

                                        setLinkable={value => {
                                            setLinkable(value)
                                            if (!value)
                                                setToBeLinked(null)
                                        }}

                                        entity={entity}
                                        toBeLinked={toBeLinked}
                                        linkable={linkable}
                                        openMenu={openMenu}
                                        {...props}
                                    />
                                </React.Fragment>
                            ))}
                        </foreignObject>

                        {props.entities.map(entity => (
                            entity.parents.map(link => <Link
                                target={`${link.parent}-node`} source={`${entity.id}-node`}
                                color={entity.highlight_color !== undefined ? entity.highlight_color : '#777777'}
                                type={link.strong ? 'strong' : 'weak'}
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
                                                props.triggerUpdate()
                                                HandleLinkChange({
                                                    entities: props.entities,
                                                    updateEntity: props.updateEntity,
                                                    event: event
                                                })
                                            }}
                                        />,
                                        contextMenuRef.current
                                    )
                                    contextMenuRef.current.style.top = (event.clientY - root.current.offsetTop + 70) + 'px'
                                    contextMenuRef.current.style.left = (event.clientX - root.current.offsetLeft) + 'px'
                                }}
                                description={link.description}/>)
                        ))}

                    </svg>
                </div>
            </div>
        </div>
    )
}
Canvas.propTypes = CanvasTemplate