import PropTypes from 'prop-types'
import React, {useRef, useState} from "react";
import Node from "./templates/Node";

export default function Canvas(props) {
    const [toBeLinked, setToBeLinked] = useState(null)
    const ref = useRef()
    const [linkable, setLinkable] = useState(false)
    const [openMenu, setOpenMenu] = useState(null)

    useState(() => {

        const root = document.getElementById(props.rootElementID)

        if (root !== null) {
            root.style.background = '#f4f5fa radial-gradient(#0095ff 5%, transparent 0)'
            root.style.backgroundSize = '30px 30px'
        }
    })


    if (Array.isArray(props.entities))
        return (
            <div ref={ref} style={{
                position: 'relative',
                width: '100vw',
                marginTop: '0',
                marginBottom: '50%'
            }}>

                {props.entities.map((entity, index) => (
                    <React.Fragment key={props.level + ':level - index:' + index}>
                        <Node
                            renderNode={props.renderNode} entityKey={props.getEntityKey(entity)}
                            updateEntity={props.updateEntity}
                            setOpenMenu={setOpenMenu}
                            openMenu={openMenu} getChildrenKeys={props.getChildrenKeys}
                            handleLink={(entity) => {
                                if (entity === null)
                                    setToBeLinked(entity)

                                if (toBeLinked === null) {
                                    setToBeLinked(entity)
                                } else if (entity !== toBeLinked && !props.getParentKeys(entity).includes(props.getEntityKey(toBeLinked))) {

                                    entity.parents = [...props.getParentKeys(entity), ...[props.getEntityKey(toBeLinked)]]
                                    toBeLinked.children = [...props.getChildrenKeys(toBeLinked), ...[props.getEntityKey(entity)]]

                                    setToBeLinked(null)
                                    setLinkable(false)
                                } else {
                                    setToBeLinked(null)
                                    setLinkable(false)
                                }
                            }}
                            linkable={linkable}
                            setLinkable={value => {
                                setLinkable(value)
                                if (!value)
                                    setToBeLinked(null)
                            }} show={props.show} edit={props.edit}
                            toBeLinked={toBeLinked}
                            entity={entity} root={ref.current} options={props.options} getEntityKey={props.getEntityKey}
                            getParentKeys={props.getParentKeys} triggerUpdate={props.triggerUpdate}
                            entitiesLength={props.entities.length}/>

                    </React.Fragment>
                ))}

            </div>
        )
    else
        return null
}
Canvas.propTypes = {
    show: PropTypes.func,
    edit: PropTypes.func,

    options: PropTypes.shape({
        edit: PropTypes.bool,
        move: PropTypes.bool,
        show: PropTypes.bool
    }),

    updateEntity: PropTypes.func,
    triggerUpdate: PropTypes.bool,
    rootElementID: PropTypes.string,
    level: PropTypes.number,
    renderNode: PropTypes.func,
    entities: PropTypes.array,
    getEntityKey: PropTypes.func,

    getParentKeys: PropTypes.func,
    getChildrenKeys: PropTypes.func
}
