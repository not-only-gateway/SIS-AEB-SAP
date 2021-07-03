import styles from "./styles/Canvas.module.css";
import Node from "./templates/Node";
import {AddRounded, RemoveRounded} from "@material-ui/icons";
import React, {useState} from "react";
import PropTypes from 'prop-types'


export default function Chart(props) {
    const [zoom, setZoom] = useState(1)

    return (
        <div style={{position: 'relative', width: 'auto', height: 'auto', minHeight: '100%', display: 'flex'}}
             id={'canvas'}>
            <div style={{
                zoom: zoom,
                transition: '250ms ease-in-out',
                '-moz-transform': 'scale(' + zoom + ')',
                width: 'fit-content',
                whiteSpace: 'nowrap',
                display: 'inline',
                margin: 'auto'
            }}>

                <ul className={styles.tree}>
                    <Node
                        entity={props.firstEntity} fetchDependents={props.fetchDependents}
                        getEntityKey={props.getEntityKey} hoveredParent={false} row={0}
                        extendLabel={props.extendLabel}
                        getExtendedEntityKey={props.getExtendedEntityKey} rowLimit={props.rowLimit}
                        fetchExtendedDependents={props.fetchExtendedDependents} hoverButtons={props.hoverButtons}
                        extendable={props.extendable} handleButtonClick={props.handleButtonClick}
                        baseWidth={props.baseWidth} extendedEntityWidth={props.extendedEntityWidth}
                        renderEntity={props.renderEntity} renderExtendedEntity={props.renderExtendedEntity}
                    />
                </ul>
            </div>
            <div className={styles.zoomContainer}>
                <span className={styles.zoomLevelContainer}>{zoom} : 1</span>
                <button disabled={zoom === 2} onClick={() => setZoom(zoom + 0.25)}
                        className={styles.buttonContainer}
                        style={{
                            cursor: zoom === 2 ? undefined : 'pointer',
                            boxShadow: zoom === 2 ? 'none' : undefined
                        }}
                >
                    <AddRounded/>
                </button>
                <button disabled={zoom === 0.5} onClick={() => setZoom(zoom - 0.25)}
                        className={styles.buttonContainer}
                        style={{
                            cursor: zoom === 0.5 ? undefined : 'pointer',
                            boxShadow: zoom === 0.5 ? 'none' : undefined
                        }}

                >
                    <RemoveRounded/>
                </button>
            </div>
        </div>
    )
}

Chart.propTypes = {
    baseWidth: PropTypes.number,
    extendedEntityWidth: PropTypes.number,
    rowLimit: PropTypes.number,
    getEntityKey: PropTypes.func,
    getExtendedEntityKey: PropTypes.func,
    firstEntity: PropTypes.object,
    renderEntity: PropTypes.func,
    renderExtendedEntity: PropTypes.func,
    fetchExtendedDependents: PropTypes.func,
    extendable: PropTypes.bool,
    hoverButtons: PropTypes.arrayOf(
        PropTypes.shape({
            icon: PropTypes.any,
            label: PropTypes.string,
            key: PropTypes.number,
            extendButton: PropTypes.bool
        })),
    handleButtonClick: PropTypes.func,
    fetchDependents: PropTypes.func,
    extendedChildButtons:PropTypes.arrayOf(
        PropTypes.shape({
            icon: PropTypes.any,
            label: PropTypes.string,
            key: PropTypes.number,
            extendButton: PropTypes.bool
        })),
}
