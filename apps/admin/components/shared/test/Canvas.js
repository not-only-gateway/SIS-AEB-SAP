import styles from "./styles/Canvas.module.css";
import Node from "./templates/Node";
import {AddRounded, RemoveRounded} from "@material-ui/icons";
import React, {useState} from "react";
import PropTypes from 'prop-types'
import StructuralRequests from "../../../utils/fetch/StructuralRequests";


export default function Canvas(props) {
    const [zoom, setZoom] = useState(1)
    return (
        <div style={{position: 'relative', width: '100%', height: 'auto', minHeight: '100%'}} id={'canvas'}>
            <div style={{
                zoom: zoom,
                transition: '.2s',
                '-moz-transform': 'scale(' + zoom + ')',
                marginTop: zoom > 1 ? 'calc(8.3% * ' + (zoom - .25) + ')' : null,

            }}>
                <span className={styles.nav} style={{width: '100%', display: 'flex', placeContent: 'center'}}>

                      <ul>
                        <Node
                            entity={props.firstEntity} fetchDependents={props.fetchDependents}
                            getEntityKey={props.getEntityKey} hoveredParent={false} row={0}
                            getExtendedEntityKey={props.getExtendedEntityKey} rowLimit={props.rowLimit}
                            fetchExtendedDependents={props.fetchExtendedDependents} hoverButtons={props.hoverButtons}
                            extendable={props.extendable} handleButtonClick={props.handleButtonClick}
                            renderEntity={props.renderEntity} renderExtendedEntity={props.renderExtendedEntity}
                        />
                      </ul>

                </span>
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

Canvas.propTypes = {
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
            key: PropTypes.number
        })),
    handleButtonClick: PropTypes.func,
    fetchDependents: PropTypes.func
}
