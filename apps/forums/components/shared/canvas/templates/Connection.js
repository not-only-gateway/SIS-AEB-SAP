import PropTypes from 'prop-types'
import styles from "../styles/Styles.module.css";
import {ArrowForwardIosRounded, CloseRounded, DeleteForeverRounded, EditRounded} from "@material-ui/icons";
import React, {useEffect, useRef, useState} from "react";

export default function Connection(props) {
    const [open, setOpen] = useState(false)
    const ref = useRef()


    useEffect(() => {
        if (ref.current !== null)
            ref.current.addEventListener('contextmenu', function (e) {
                if (props.editable) {
                    setOpen(!open)
                }

                e.preventDefault();
            }, false);

        return () => {
            if (ref.current !== null)
                ref.current.removeEventListener('contextmenu', () => null)
        }
    })
    return (
        <div
            ref={ref}
            className={styles.lineContainer}
            style={{
                cursor: props.editable ? 'pointer' : 'default',
                background: props.color !== undefined && props.color !== null ? props.color : '#777777'
            }}
            id={props.getLinkParent(props.link) + '-line-' + props.entityKey}
            onClick={() => {
                if (props.canDelete)
                    setOpen(!open)
            }}>
            <div id={props.getLinkParent(props.link) + '-line-indicator-objective-' + props.entityKey}
                 className={styles.indicatorContainer} style={{
                background: props.color !== undefined && props.color !== null ? props.color : '#777777',
            }}>
                <ArrowForwardIosRounded
                    style={{
                        transform: 'rotate(-90deg)',
                        color: 'white',
                    }}/>
            </div>
            <div id={props.getLinkParent(props.link) + '-line-content-' + props.entityKey}
                 className={open ? styles.lineOptionsContainer : styles.lineContentContainer}
                 style={open ? null : {
                     color: props.color !== undefined && props.color !== null && !open ? props.color : undefined,
                     border: props.color !== undefined && props.color !== null ? props.color + ' 2px solid' : '#777777 2px solid'
                 }} onBlur={() => setOpen(false)}>
                {open ?
                    <>

                        <button className={styles.optionButton}>
                            <EditRounded/>
                            Editar conexão
                        </button>
                        <button className={styles.optionButton} style={{color: '#ff5555'}}>
                            <DeleteForeverRounded/>
                            Deletar conexão
                        </button>
                        <button className={styles.optionButton} onClick={() => setOpen(false)}>
                            <CloseRounded/>
                            Fechar
                        </button>
                    </>
                    : props.getLinkContent(props.link)}
            </div>
        </div>
    )
}
Connection.propTypes = {
    getLinkType: PropTypes.func,
    getLinkContent: PropTypes.func,

    canDelete: PropTypes.func,
    link: PropTypes.number,
    entityKey: PropTypes.number,
    editable: PropTypes.bool,
    color: PropTypes.string,
    getLinkParent: PropTypes.func
}