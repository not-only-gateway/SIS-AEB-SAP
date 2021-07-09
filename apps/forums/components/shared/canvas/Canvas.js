import PropTypes from 'prop-types'
import React, {useEffect, useRef, useState} from "react";
import Node from "./templates/ node/Node";
import ReactDOM from 'react-dom'
import styles from "./styles/Styles.module.css";
import {
    AddRounded,
    DeleteForeverRounded,
    EditRounded,
    GetAppRounded,
    LinkRounded, SaveRounded,
    VisibilityRounded
} from "@material-ui/icons";
import Line from "./templates/connection/Line";

export default function Canvas(props) {
    const [toBeLinked, setToBeLinked] = useState(null)
    const ref = useRef()
    const menuRef = useRef()
    const [linkable, setLinkable] = useState(false)
    const [openMenu, setOpenMenu] = useState(null)
    const contextMenuRef = useRef()
    const menu = (
        <div className={styles.options} ref={contextMenuRef}>
            <button className={styles.optionButton} onClick={() => props.handleTriggerUpdate()}>
                <SaveRounded/>
                Salvar layout
            </button>
            <button className={styles.optionButton} disabled={true}>
                <GetAppRounded/>
                Download
            </button>

            <button
                className={styles.optionButton}
                onClick={() => {
                    props.handleCreate()
                }}>
                <AddRounded/>
                Criar modulo
            </button>
        </div>
    )
    useEffect(() => {
        const root = document.getElementById(props.rootElementID)
        if (root !== null) {
            root.style.background = '#f4f5fa radial-gradient(#0095ff 5%, transparent 0)'
            root.style.backgroundSize = '30px 30px'
        }
        document.addEventListener('mousedown', (event) => {
            if (menuRef.current !== null && menuRef.current.firstChild && event.button === 0 && event.target.className !== 'Pop_popContainer__1N8Wc' && event.target.className !== 'Styles_lineContentContainer__1xCXK' && event.target.className !== 'Styles_optionButton__2v96u' && event.target.className !== 'Styles_lineContentContainer__1xCXK') {
                ReactDOM.unmountComponentAtNode(menuRef.current)
                setOpenMenu(null)
            }
        })
        document.addEventListener('contextmenu', (event) => {

            if (event.target.className === 'Subject_content__2o62t' && props.options.edit) {
                if (menuRef.current.firstChild)
                    ReactDOM.unmountComponentAtNode(menuRef.current)
                ReactDOM.render(
                    menu,
                    menuRef.current
                )
                menuRef.current.style.top = (event.clientY - ref.current.offsetTop - (contextMenuRef.current.offsetHeight * 1.5)) + 'px'
                menuRef.current.style.left = event.clientX + 'px'
            }
            event.preventDefault();
        })
        return () => {
            document.removeEventListener('mousedown', () => null)
            document.removeEventListener('contextmenu', () => null)
        }
    })


    if (Array.isArray(props.entities))
        return (
            <div ref={ref} style={{
                position: 'relative',
                width: '100%',
                marginTop: 0,
                marginBottom: '50%'
            }}>

                <div ref={menuRef} style={{position: 'absolute'}}/>
                {props.entities.map((entity, index) => (
                    <React.Fragment key={props.level + ':level - index:' + index}>
                        <Node
                            entityKey={props.getEntityKey(entity)}
                            updateEntity={event => {
                                console.log('index => ' + index + ' | length => ' + props.entities.length)
                                props.updateEntity(event)
                                if (index === (props.entities.length - 1))
                                    props.endUpdate()
                            }}
                            setOpenMenu={(event, x, y, id) => {
                                if (event === null) {
                                    ReactDOM.unmountComponentAtNode(menuRef.current)
                                    setOpenMenu(null)
                                } else {
                                    ReactDOM.render(
                                        event,
                                        menuRef.current
                                    )

                                    setOpenMenu(id)

                                    menuRef.current.style.top = y + 'px'
                                    menuRef.current.style.left = x + 'px'
                                }
                            }}

                            renderOnRoot={(event, x, y) => {
                                if (event === null)
                                    ReactDOM.unmountComponentAtNode(menuRef.current)
                                else {
                                    if (menuRef.current.firstChild)
                                        ReactDOM.unmountComponentAtNode(menuRef.current)

                                    ReactDOM.render(
                                        event,
                                        menuRef.current
                                    )

                                    menuRef.current.style.top = (y - menuRef.current.firstChild.offsetHeight) + 'px'
                                    menuRef.current.style.left = x + 'px'
                                }
                            }}
                            handleLink={(entity) => {
                                if (entity === null)
                                    setToBeLinked(entity)
                                if (toBeLinked === null) {
                                    setToBeLinked(entity)
                                } else if (entity !== toBeLinked && !props.getParentKeys(entity).includes(props.getEntityKey(toBeLinked))) {
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
                            root={ref.current} toBeLinked={toBeLinked}
                            linkable={linkable}
                            openMenu={openMenu}
                            {...props}
                        />

                    </React.Fragment>
                ))}

            </div>
            //     </foreignObject>
            // </svg>
        )
    else
        return null
}
Canvas.propTypes = {
    show: PropTypes.func,
    edit: PropTypes.func,
    triggerLink: PropTypes.func,
    options: PropTypes.shape({
        edit: PropTypes.bool,
        move: PropTypes.bool,
        show: PropTypes.bool
    }),
    endUpdate: PropTypes.func,
    updateEntity: PropTypes.func,
    triggerUpdate: PropTypes.bool,
    rootElementID: PropTypes.string,
    level: PropTypes.number,
    renderNode: PropTypes.func,
    entities: PropTypes.array,
    getEntityKey: PropTypes.func,

    getParentKeys: PropTypes.func,
    getChildrenKeys: PropTypes.func,

    handleDelete: PropTypes.func,

    getLinkParent: PropTypes.func,
    getLinkChild: PropTypes.func,

    getLinkType: PropTypes.func,
    getLinkContent: PropTypes.func,

    handleCreate: PropTypes.func,
    handleTriggerUpdate: PropTypes.func
}