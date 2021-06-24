import PropTypes from 'prop-types'
import React, {useEffect, useState} from "react";
import NodeOptions from "./NodeOptions";
import NodeContent from "./NodeContent";
import NodeCloseButton from "./NodeCloseButton";
import ExtendedNodeContainer from "./ExtendedNodeContainer";
import OpenNodeContainer from "./OpenNodeContainer";
import styles from '../styles/Canvas.module.css'

export default function Node(props) {
    const [dependents, setDependents] = useState([])
    const [hovered, setHovered] = useState(false)
    const [open, setOpen] = useState(false)
    const [extended, setExtended] = useState(false)
    const [showExtendedDependents, setShowExtendedDependents] = useState(false)
    const [extendedDependents, setExtendedDependents] = useState([])
    const [elementHeight, setElementHeight] = useState(undefined)

    useEffect(() => {
        const element = document.getElementById("node-" + props.getEntityKey(props.entity))
        if (element !== null && (elementHeight === undefined || elementHeight > element.offsetHeight)) {

            if (element !== null)
                setElementHeight(element.offsetHeight)
        }
        if (extendedDependents.length === 0 && showExtendedDependents && props.fetchExtendedDependents !== undefined && props.fetchExtendedDependents !== null)
            props.fetchExtendedDependents(props.entity).then(res => {
                setExtendedDependents(res)
            })
        if (props.entity !== {} && dependents.length === 0 && props.fetchDependents !== undefined && props.fetchDependents !== null)
            props.fetchDependents(props.entity).then(res => {
                setDependents(res)
            })
    }, [props.entity, showExtendedDependents])


    return (
        <li>
            <ExtendedNodeContainer showExtendedDependents={showExtendedDependents} row={props.row}>
                <NodeCloseButton handleClose={() => setShowExtendedDependents(false)} visible={showExtendedDependents}/>
                <OpenNodeContainer open={open} entityKey={props.getEntityKey(props.entity)}
                                   isExtendedChild={props.isExtendedChild}>
                    <NodeCloseButton handleClose={() => setOpen(false)} visible={open} smaller={true}/>
                    <NodeContent open={open} setOpen={setOpen} hovered={hovered} setHovered={setHovered}
                                 renderEntity={props.renderEntity} isExtendedChild={props.isExtendedChild}
                                 hoveredParent={props.hoveredParent} showExtendedDependents={showExtendedDependents}
                                 entity={props.entity}
                    />
                    <NodeOptions
                        row={props.row} rowLimit={props.rowLimit}
                        open={open} buttons={props.hoverButtons} extended={extended}
                        setExtended={setExtended} entity={props.entity} extendable={props.extendable}
                        handleButtonClick={props.handleButtonClick} entityKey={props.getEntityKey(props.entity)}
                        elementHeight={elementHeight} dependentsSize={dependents.length}
                        setShowExtendedDependents={setShowExtendedDependents}
                        showExtendedDependents={showExtendedDependents}
                    />
                </OpenNodeContainer>


                {showExtendedDependents && extendedDependents.length > 0 ?
                    <ul>
                        <ul className={styles.transformExtendedElement}>
                            {extendedDependents.map((subject, index) => (
                                <React.Fragment key={props.getExtendedEntityKey(subject) + '-extended-' + index}>
                                    <Node
                                        entity={subject} baseWidth={props.extendedEntityWidth}
                                        getEntityKey={props.getExtendedEntityKey}
                                        hoveredParent={hovered} row={props.row + 1}
                                        renderEntity={props.renderExtendedEntity}
                                        rowLimit={props.rowLimit} isExtendedChild={true}
                                    />
                                </React.Fragment>
                            ))}

                        </ul>
                    </ul>
                    :
                    null}


            </ExtendedNodeContainer>

            {((props.row < props.rowLimit || props.row > props.rowLimit) || extended) && dependents.length > 0 ?
                <ul>
                    {dependents.map((subject, index) => (
                        <React.Fragment key={props.getEntityKey(subject) + '-' + index}>
                            <Node
                                entity={subject} fetchDependents={props.fetchDependents}
                                getEntityKey={props.getEntityKey} baseWidth={props.baseWidth}
                                getExtendedEntityKey={props.getExtendedEntityKey}
                                extendedEntityWidth={props.extendedEntityWidth}
                                fetchExtendedDependents={props.fetchExtendedDependents}
                                hoverButtons={props.hoverButtons}
                                extendable={props.extendable} hoveredParent={!showExtendedDependents && hovered} row={props.row + 1}
                                renderEntity={props.renderEntity}
                                renderExtendedEntity={props.renderExtendedEntity}
                                handleButtonClick={props.handleButtonClick} rowLimit={props.rowLimit}
                            />
                        </React.Fragment>
                    ))}
                </ul>
                :
                null
            }
        </li>

    )
}


Node.propTypes = {
    baseWidth: PropTypes.number,
    extendedEntityWidth: PropTypes.number,
    row: PropTypes.number,
    isExtendedChild: PropTypes.bool,
    rowLimit: PropTypes.number,
    entity: PropTypes.object,
    getEntityKey: PropTypes.func,
    getExtendedEntityKey: PropTypes.func,
    fetchDependents: PropTypes.func,
    fetchExtendedDependents: PropTypes.func,
    hoverButtons: PropTypes.arrayOf(
        PropTypes.shape({
            icon: PropTypes.any,
            label: PropTypes.string,
            key: PropTypes.number,
            extendButton: PropTypes.bool
        })),
    renderEntity: PropTypes.func,
    renderExtendedEntity: PropTypes.func,
    hoveredParent: PropTypes.bool,
    handleButtonClick: PropTypes.func,
    extendable: PropTypes.bool,
}
