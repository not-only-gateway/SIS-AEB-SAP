import styles from "./styles/Chart.module.css";
import nodeStyles from "./styles/Node.module.css";
import Node from "./templates/Node";
import {AddRounded, RemoveRounded} from "@material-ui/icons";
import React, {useState} from "react";
import PropTypes from 'prop-types'


export default function Chart(props) {
    const [zoom, setZoom] = useState(1)
    return (
        <div className={styles.chartContainer} id={'canvas'}>
            <div className={styles.chartContent} style={{
                zoom: zoom,
                '-moz-transform': 'scale(' + zoom + ')',
            }}>
                {props.firstEntities === undefined || props.firstEntities === null || props.firstEntities.length === 0 ?
                    <div style={{width: '100%'}}>
                        <h5 style={{textAlign: 'center', color: '#555555'}}>Nada encontrado</h5>
                    </div>
                    :
                    props.firstEntities.map(entity =>
                        <ul className={nodeStyles.tree}>
                            <Node
                                endEntity={props.endEntity}
                                openElement={props.openElement}
                                getEntityKey={props.getEntityKey}
                                renderEntity={props.renderEntity}
                                handleClick={props.handleClick}
                                row={0} fetchDependents={props.fetchDependents}
                                entity={entity} endNode={props.endNode} endNodeContent={props.endNodeContent} renderEndNode={props.renderEndNode}
                            />
                        </ul>
                    )
                }
            </div>
            <div className={styles.zoomContainer}>
                <div className={styles.zoomLevelContainer}>{zoom} : 1</div>
                <button
                    disabled={zoom === 2 || props.firstEntities === undefined || props.firstEntities === null || props.firstEntities.length === 0}
                    onClick={() => setZoom(zoom + 0.25)}
                    className={[styles.buttonContainer, styles.zoomInButton].join(' ')}
                >
                    <AddRounded/>
                </button>
                <button
                    disabled={zoom === 0.5 || props.firstEntities === undefined || props.firstEntities === null || props.firstEntities.length === 0}
                    onClick={() => setZoom(zoom - 0.25)}
                    className={[styles.buttonContainer, styles.zoomOutButton].join(' ')}

                >
                    <RemoveRounded/>
                </button>
            </div>
        </div>
    )
}

Chart.propTypes = {
    renderEndNode: PropTypes.func,
    endNodeContent: PropTypes.object,
    endNode: PropTypes.bool,

    endEntity: PropTypes.bool,

    getEntityKey: PropTypes.func,
    firstEntities: PropTypes.object,
    renderEntity: PropTypes.func,
    handleClick: PropTypes.func,
    fetchDependents: PropTypes.func,
    openElement: PropTypes.object

}
