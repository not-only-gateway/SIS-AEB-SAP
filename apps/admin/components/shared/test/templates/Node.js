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

export default function Node(props) {
    const [dependents, setDependents] = useState([])
    const [hovered, setHovered] = useState(false)
    const [open, setOpen] = useState(false)
    const [extended, setExtended] = useState(false)
    const [extendedDependents, setExtendedDependents] = useState([])
    const [elementHeight, setElementHeight] = useState(undefined)
    useEffect(() => {
        const element = document.getElementById("node-" + props.getEntityKey(props.entity))
        if (element !== null && (elementHeight === undefined || elementHeight > element.offsetHeight)) {

            if (element !== null)
                setElementHeight(element.offsetHeight)
        }
        if (extendedDependents.length === 0 && extended && props.fetchExtendedDependents !== undefined && props.fetchExtendedDependents !== null)
            props.fetchExtendedDependents(props.entity).then(res => {
                setExtendedDependents(res)
            })
        if (props.entity !== {} && dependents.length === 0)
            props.fetchDependents(props.entity).then(res => {
                setDependents(res)
            })
    }, [props.entity, extended])


    return (
        <li>
            <div
                id={"node-" + props.getEntityKey(props.entity)}
                className={styles.nodeContainer} style={{
                width: open ? '300px' : undefined,
                border: open ? '#0095ff 1px solid' : 'transparent 1px solid',
                padding: open ? '8px' : '0',
            }}>
                  <span
                      onClick={() => setOpen(!open)}
                      onMouseOver={() => setHovered(true)}
                      onMouseLeave={() => setHovered(false)}
                      style={{
                          border: (hovered || props.hoveredParent) && !open ? '#0095ff 1px solid' : '#e0e0e0 1px solid',
                          width: open ? '100%' : undefined,

                          height: elementHeight !== undefined ? elementHeight + 'px' : undefined,
                          margin: 'auto'
                      }}
                      className={[styles.fadeIn, styles.nodeContentContainer].join(' ')}
                  >
                        {props.renderEntity(props.entity)}
                      {/*<div style={{*/}
                      {/*    display: hovered ? 'flex' : 'none',*/}
                      {/*    alignItems: 'center',*/}
                      {/*    justifyContent: 'center',*/}
                      {/*    height: '100%',*/}
                      {/*    position: 'relative'*/}
                      {/*}} className={styles.fadeIn}>*/}
                      {/*        {hovered ? open ? <CloseRounded/> :*/}
                      {/*            <KeyboardArrowRightRounded style={{color: '#333333', fontSize: '2.2rem'}}/> : null}*/}
                      {/*    </div>*/}


                    </span>
                <NodeButtons
                    setOpen={setOpen} open={open} buttons={props.hoverButtons} extended={extended}
                    setExtended={setExtended} entity={props.entity} extendable={props.extendable}
                    handleButtonClick={props.handleButtonClick} entityKey={props.getEntityKey(props.entity)}
                    elementHeight={elementHeight}
                />
            </div>

            {(props.row < props.rowLimit || props.row > props.rowLimit) && dependents.length > 0 ?
                <ul>
                    {dependents.map((subject, index) => (
                        <React.Fragment key={props.getEntityKey(subject) + '-' + index}>
                            <Node
                                entity={subject} fetchDependents={props.fetchDependents}
                                getEntityKey={props.getEntityKey} getExtendedEntityKey={props.getExtendedEntityKey}
                                fetchExtendedDependents={props.fetchExtendedDependents}
                                hoverButtons={props.hoverButtons}
                                extendable={props.extendable} hoveredParent={hovered} row={props.row + 1}
                                renderEntity={props.renderEntity} renderExtendedEntity={props.renderExtendedEntity}
                                handleButtonClick={props.handleButtonClick} rowLimit={props.rowLimit}
                            />
                        </React.Fragment>
                    ))}
                </ul>
                :
                null
            }
            {extended && extendedDependents.length > 0 ?
                <ul>
                    {extendedDependents.map((subject, index) => (
                        <React.Fragment key={props.getExtendedEntityKey(subject) + '- extended -' + index}>
                            <Node
                                entity={subject} fetchDependents={props.fetchExtendedDependents}
                                getEntityKey={props.getExtendedEntityKey}
                                hoverButtons={props.hoverButtons}
                                extendable={null}
                                renderEntity={props.renderExtendedEntity}
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
    row: PropTypes.number,
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
            key: PropTypes.number
        })),
    renderEntity: PropTypes.func,
    renderExtendedEntity: PropTypes.func,
    hoveredParent: PropTypes.bool,
    handleButtonClick: PropTypes.func,
    extendable: PropTypes.bool
}
