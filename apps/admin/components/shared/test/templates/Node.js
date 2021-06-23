import PropTypes from 'prop-types'
import React, {useEffect, useState} from "react";
import styles from '../styles/Canvas.module.css'
import {
    AddRounded,
    ArrowDownward,
    CloseRounded,
    EditRounded,
    KeyboardArrowRightRounded,
    RemoveRounded
} from "@material-ui/icons";
import NodeButtons from "./NodeButtons";
import Canvas from "../Canvas";

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
            <div
                id={"node-" + props.getEntityKey(props.entity)}
                className={styles.nodeContainer} style={{
                width: open ? props.baseWidth * 2 + 'px' : undefined,
                border: open ? '#0095ff 1px solid' : 'transparent 1px solid',
                padding: open ? '8px' : '0',
            }}>
                  <span
                      onClick={() => setOpen(!open)}
                      onMouseOver={() => setHovered(true)}
                      onMouseLeave={() => setHovered(false)}
                      style={{
                          border: hovered && !open ? '#0095ff 1px solid' : '#e0e0e0 1px solid',
                          width: open ? '100%' : props.baseWidth + 'px',
                          background: hovered || props.hoveredParent ? '#f4f5fa' : undefined,
                          height: 'auto',
                          margin: 'auto'
                      }}
                      className={[styles.fadeIn, styles.nodeContentContainer].join(' ')}
                  >
                        {props.renderEntity(props.entity)}
                    </span>
                <NodeButtons
                    setOpen={setOpen} open={open} buttons={props.hoverButtons} extended={extended}
                    setExtended={setExtended} entity={props.entity} extendable={props.extendable}
                    handleButtonClick={props.handleButtonClick} entityKey={props.getEntityKey(props.entity)}
                    elementHeight={elementHeight} dependentsSize={dependents.length}
                    setShowExtendedDependents={setShowExtendedDependents}
                    showExtendedDependents={showExtendedDependents}
                />
            </div>

            {showExtendedDependents || ((props.row < props.rowLimit || props.row > props.rowLimit) || extended) && dependents.length > 0 ?
                <ul>
                    {showExtendedDependents ?
                        extendedDependents.map((subject, index) => (
                            <React.Fragment key={props.getExtendedEntityKey(subject) + '-extended-' + index}>
                                <Node
                                    entity={subject} baseWidth={props.extendedEntityWidth}
                                    getEntityKey={props.getExtendedEntityKey}
                                    hoveredParent={hovered} row={props.row + 1}
                                    renderEntity={props.renderExtendedEntity}
                                    rowLimit={props.rowLimit}
                                />
                            </React.Fragment>
                        ))
                        :
                        null}
                    {((props.row < props.rowLimit || props.row > props.rowLimit) || extended) && dependents.length > 0 ?
                        dependents.map((subject, index) => (
                            <React.Fragment key={props.getEntityKey(subject) + '-' + index}>
                                <Node
                                    entity={subject} fetchDependents={props.fetchDependents}
                                    getEntityKey={props.getEntityKey} baseWidth={props.baseWidth}
                                    getExtendedEntityKey={props.getExtendedEntityKey}
                                    extendedEntityWidth={props.extendedEntityWidth}
                                    fetchExtendedDependents={props.fetchExtendedDependents}
                                    hoverButtons={props.hoverButtons}
                                    extendable={props.extendable} hoveredParent={hovered} row={props.row + 1}
                                    renderEntity={props.renderEntity}
                                    renderExtendedEntity={props.renderExtendedEntity}
                                    handleButtonClick={props.handleButtonClick} rowLimit={props.rowLimit}
                                />
                            </React.Fragment>
                        ))
                        :
                        null}
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
