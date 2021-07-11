import React, {useEffect, useRef, useState} from "react";
import Node from "../ node/Node";
import ReactDOM from 'react-dom'
import styles from "../../styles/Canvas.module.css";
import {AddRounded, GetAppRounded, SaveRounded} from "@material-ui/icons";
import EntityTemplate from "../../templates/EntityTemplate";
import useCanvas from "../../hooks/useCanvas";
import CanvasTemplate from "../../templates/CanvasTemplate";

export default function Canvas(props) {
    const [toBeLinked, setToBeLinked] = useState(null)

    const [linkable, setLinkable] = useState(false)
    const [openMenu, setOpenMenu] = useState(null)


    useEffect(() => {
        useCanvas({
            contextMenuRef: props.contextMenuRef,
            setOpenMenu: setOpenMenu,
            options: props.options,
            handleTriggerUpdate: props.handleTriggerUpdate,
            handleCreate: props.handleCreate, root: props.root
        })
        return () => {
            document.removeEventListener('mousedown', () => null)
            document.removeEventListener('contextmenu', () => null)
        }
    })


    return (

        props.entities.map((entity, index) => (
            <React.Fragment key={entity.id + '-' + index}>
                <Node
                    updateEntity={event => {
                        props.updateEntity(event)
                        if (index === (props.entities.length - 1))
                            props.endUpdate()
                    }} overflowRef={props.overflowRef}
                    setOpenMenu={(event, x, y, id) => {
                        if (event === null) {
                            ReactDOM.unmountComponentAtNode(props.contextMenuRef.current)
                            setOpenMenu(null)
                        } else {
                            ReactDOM.render(
                                event,
                                props.contextMenuRef.current
                            )

                            setOpenMenu(id)

                            props.contextMenuRef.current.style.top = y + 'px'
                            props.contextMenuRef.current.style.left = x + 'px'
                        }
                    }}

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
        ))
    )
}

Canvas.propTypes = CanvasTemplate