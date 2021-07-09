import PropTypes from 'prop-types'
import styles from "../../styles/Styles.module.css";
import {ArrowForwardIosRounded, CloseRounded, DeleteForeverRounded, EditRounded} from "@material-ui/icons";
import React, {useEffect, useRef, useState} from "react";
import ConnectionContextMenu from "./ConnectionContextMenu";
import Line from "./Line";

export default function Connection(props) {
    const ref = useRef()
    useEffect(() => {

        if (ref.current !== null) {
            ref.current.addEventListener('contextmenu', function (e) {
                if (props.editable)
                    props.renderOnRoot(<ConnectionContextMenu/>, (e.clientX), (e.clientY - props.root.offsetTop))
                else if (props.editable)
                    props.renderOnRoot(null, null, null)

                e.preventDefault();
            }, false)
            ref.current.addEventListener('contextmenu', function (e) {
                if (props.editable)
                    props.renderOnRoot(<ConnectionContextMenu/>, (e.clientX), (e.clientY - props.root.offsetTop))
                else if (props.editable)
                    props.renderOnRoot(null, null, null)

                e.preventDefault();
            }, false)
        }
        return () => {
            if (ref.current !== null)
                ref.current.removeEventListener('contextmenu', () => null)
        }

    }, [])


    return (


        <div
            ref={ref}
            className={styles.lineContainer}
            style={{
                cursor: props.editable ? 'pointer' : 'default',
                background: props.color !== undefined && props.color !== null ? props.color : '#777777'
            }}
            id={props.getLinkParent(props.link) + '-line-' + props.entityKey}
        >

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
                 className={styles.lineContentContainer}
                 style={{
                     color: props.color !== undefined && props.color !== null ? props.color : undefined,
                     border: props.color !== undefined && props.color !== null ? props.color + ' 2px solid' : '#777777 2px solid'
                 }}>
                {props.getLinkContent(props.link)}
            </div>
        </div>
    )
}
Connection.propTypes = {
    getLinkType: PropTypes.func,
    getLinkContent: PropTypes.func,

    canDelete: PropTypes.func,
    link: PropTypes.object,
    entityKey: PropTypes.any,
    editable: PropTypes.bool,
    color: PropTypes.string,
    getLinkParent: PropTypes.func,

    renderOnRoot: PropTypes.func,
    root: PropTypes.object,
}