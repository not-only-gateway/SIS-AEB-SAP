import PropTypes from 'prop-types'
import React, {useEffect, useState} from "react";
import styles from '../styles/Node.module.css'

export default function Node(props) {
    const [dependents, setDependents] = useState([])

    useEffect(() => {


        if (props.entity !== {} && dependents.length === 0 && props.fetchDependents !== undefined && props.fetchDependents !== null)
            props.fetchDependents(props.entity).then(res => {
                setDependents(res)
            })
    }, [])


    return (
        <li>
            <div className={props.row === 0 ? styles.noOutline : ''}
                 style={{width: 'fit-content', margin: 'auto', padding: 0}}>
                <span
                    id={"node-" + props.getEntityKey(props.entity)}
                    style={{
                        cursor: props.openElement === props.entity ? 'default' : 'pointer',
                    }}
                    className={[props.row === 0 ? styles.noOutline : '', styles.nodeContainer].join(' ')}
                    onClick={() => {
                        if (props.openElement === null || props.openElement === undefined)
                            props.handleClick(props.entity)
                    }}
                >
                      {props.entity !== undefined && props.renderEntity !== undefined ? props.renderEntity(props.entity) : null}
                </span>
            </div>
            {dependents.length === 0 && !props.endNode ? null :
                <ul>
                    {dependents.length > 0 ? dependents.map((subject, index) => (
                            <React.Fragment key={props.getEntityKey(subject) + '-' + index}>
                                <Node
                                    endNode={props.endNode} endNodeContent={props.endNodeContent}
                                    renderEndNode={props.renderEndNode}

                                    fetchDependents={props.fetchDependents}
                                    row={props.row + 1} openElement={props.openElement}
                                    renderEntity={props.renderEntity}
                                    getEntityKey={props.getEntityKey}
                                    handleClick={props.handleClick}
                                    entity={subject}
                                />
                            </React.Fragment>
                        ))
                        :
                        <Node
                            fetchDependents={props.fetchDependents}
                            row={props.row + 1} openElement={props.openElement}
                            renderEntity={props.renderEndNode}
                            getEntityKey={() => props.getEntityKey() + '-end-node'}
                            handleClick={props.handleClick}
                            entity={props.endNodeContent} endNode={false}
                        />
                    }
                </ul>
            }
        </li>

    )
}


Node.propTypes = {
    renderEndNode: PropTypes.func,
    endNodeContent: PropTypes.object,
    endNode: PropTypes.bool,

    openElement: PropTypes.object,
    getEntityKey: PropTypes.func,
    renderEntity: PropTypes.func,
    handleClick: PropTypes.func,
    row: PropTypes.number,
    entity: PropTypes.any,
    fetchDependents: PropTypes.func
}
