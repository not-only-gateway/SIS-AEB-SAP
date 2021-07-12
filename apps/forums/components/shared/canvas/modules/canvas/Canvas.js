import React, {useEffect, useRef, useState} from "react";
import Node from "../ node/Node";
import ReactDOM from 'react-dom'
import useCanvas from "../../hooks/useCanvas";
import CanvasTemplate from "../../templates/CanvasTemplate";

export default function Canvas(props) {
    const [toBeLinked, setToBeLinked] = useState(null)
    const [linkable, setLinkable] = useState(false)


    return (
        props.entities.map((entity, index) => (
            <React.Fragment key={entity.id + '-' + index}>
                <Node
                    overflowRef={props.overflowRef}
                    setOpenContext={(event, x, y, id) => {
                        if (event === null) {
                            ReactDOM.unmountComponentAtNode(props.contextMenuRef.current)
                            props.setOpenMenu(null)
                        } else {
                            ReactDOM.render(
                                event,
                                props.contextMenuRef.current
                            )
                            props.setOpenMenu(id)
                            props.contextMenuRef.current.style.top = y + 'px'
                            props.contextMenuRef.current.style.left = x + 'px'
                        }
                    }}
                    index={index}
                    renderOnRoot={(event, x, y) => {
                        if (event === null)
                            ReactDOM.unmountComponentAtNode(props.contextMenuRef.current)
                        else {
                            if (props.contextMenuRef.current.firstChild)
                                ReactDOM.unmountComponentAtNode(props.contextMenuRef.current)

                            ReactDOM.render(
                                event,
                                props.contextMenuRef.current
                            )

                            props.contextMenuRef.current.style.top = (y - props.contextMenuRef.current.firstChild.offsetHeight) + 'px'
                            props.contextMenuRef.current.style.left = x + 'px'
                        }
                    }}
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
                    openMenu={props.openMenu}
                    {...props}
                />

            </React.Fragment>
        ))
    )
}

Canvas.propTypes = CanvasTemplate