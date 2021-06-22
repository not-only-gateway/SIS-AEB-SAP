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

export default function Node(props) {
    const [dependents, setDependents] = useState([])
    const [hovered, setHovered] = useState(false)
    const [open, setOpen] = useState(false)
    const [extended, setExtended] = useState(false)
    const [extendedDependents, setExtendedDependents] = useState([])

    useEffect(() => {
        console.log(props.entity)
        if (extendedDependents.length === 0 && extended && props.fetchExtendedDependets !== undefined && props.fetchExtendedDependets !== null)
            props.fetchExtendedDependets(props.entity).then(res => {
                setExtendedDependents(res)
            })
        if (props.entity !== {} && dependents.length === 0)
            props.fetchDependents(props.entity).then(res => {
                setDependents(res)
            })
    }, [props.entity, extended])


    return (
        <li style={{position: 'relative'}}>
          <span
              onClick={() => setOpen(!open)}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              style={{
                  width: 'clamp(150px, 150px, 200px)',
                  height: 'clamp(75px, 75px, 100px)',
                  border: hovered || props.hoveredParent || open ? '#0095ff 1px solid' : '#e0e0e0 1px solid',
                  boxSizing: 'border-box',
                  cursor: 'pointer',
                  background: open ? '#E8F0FE' : 'transparent',
              }}
              className={styles.fadeIn}>
              {hovered ? null : props.renderEntity(props.entity)}
              <div style={{
                  display: hovered ? 'flex' : 'none',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%'
              }} className={styles.fadeIn}>
              {hovered ? open ? <CloseRounded/> :
                  <KeyboardArrowRightRounded style={{color: '#333333', fontSize: '2.2rem'}}/> : null}
                  </div>
            </span>
            <div className={[styles.optionsContainer, open ? styles.fadeIn : styles.fadeOutAnimation].join(' ')}>
                {props.hoverButtons !== undefined ? props.hoverButtons.map((button, index) => (
                    <button key={index + '-' + button.key} onClick={() => {
                        props.handleButtonClick(props.entity, button.key)
                        setOpen(false)
                    }}>
                        {button.icon !== undefined ? button.icon : null}
                        {button.label}
                    </button>
                )) : null}
                {props.extendable ?

                    <button onClick={() => {
                        setExtended(!extended)
                        setOpen(false)
                    }}>
                        {extended ?
                            (
                                <>
                                    <RemoveRounded style={{fontSize: '1.3rem', color: '#333333'}}/>
                                    Menos
                                </>
                            )
                            :
                            (
                                <>
                                    <AddRounded style={{fontSize: '1.3rem', color: '#333333'}}/>
                                    Mais
                                </>
                            )

                        }
                    </button>
                    :
                    null}
            </div>
            {dependents.length > 0 ?
                <ul>
                    {dependents.map((subject, index) => (
                        <React.Fragment key={props.getEntityKey(subject) + '-' + index}>
                            <Node
                                entity={subject} fetchDependents={props.fetchDependents}
                                getEntityKey={props.getEntityKey} getExtendedEntityKey={props.getExtendedEntityKey}
                                fetchExtendedDependets={props.fetchExtendedDependents} hoverButtons={props.hoverButtons}
                                extendable={props.extendable}
                                renderEntity={props.renderEntity} renderExtendedEntity={props.renderExtendedEntity}
                                handleButtonClick={props.handleButtonClick}
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
