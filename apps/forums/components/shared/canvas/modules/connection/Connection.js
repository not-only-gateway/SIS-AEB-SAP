import PropTypes from 'prop-types'
import styles from "../../styles/Canvas.module.css";
import {ArrowForwardIosRounded} from "@material-ui/icons";
import React, {useEffect, useRef, useState} from "react";
import ConnectionContextMenu from "./ConnectionContextMenu";
import EntityTemplate from "../../templates/EntityTemplate";
import LinkTemplate from "../../templates/LinkTemplate";
import Line from "./Line";

export default function Connection(props) {
    const ref = useRef()
    const [target, setTarget] = useState({
        x: null,
        y: null,
        offsetHeight: null
    })
    setTimeout(() => {
        const parent = document.getElementById(`${props.link.parent}-node`)
        if(parent !== null)
            setTarget({
                x: parent.offsetLeft,
                y: parent.offsetTop,
                offsetHeight: parent.offsetHeight
            })

    }, 1000)
    useEffect(() => {
        if (ref.current !== null && ref.current !== undefined) {
            ref.current.addEventListener('contextmenu', function (e) {
                if (props.canEdit)
                    props.renderOnRoot(<ConnectionContextMenu/>, (e.clientX), (e.clientY - props.root.offsetTop))
                else if (props.canEdit)
                    props.renderOnRoot(null, null, null)

                e.preventDefault();
            }, false)
            ref.current.addEventListener('contextmenu', function (e) {
                if (props.canEdit)
                    props.renderOnRoot(<ConnectionContextMenu/>, (e.clientX), (e.clientY - props.root.offsetTop))
                else if (props.canEdit)
                    props.renderOnRoot(null, null, null)

                e.preventDefault();
            }, false)
        }
    }, [])


    return (

        <Line
            color={props.entity.highlight_color !== null ? props.entity.highlight_color : '#777777'}
            target={{
                x: target.x,
                y: target.y,
                offsetHeight: target.offsetHeight
            }}
            source={{
                x: props.source.offsetLeft,
                y: props.source.offsetTop
            }}
        />
        // <div
        //     ref={ref}
        //     className={styles.lineContainer}
        //     style={{
        //         cursor: props.canEdit ? 'pointer' : 'default',
        //         background: props.entity.highlight_color !== null ? props.entity.highlight_color : '#777777'
        //     }}
        //     id={props.link.parent + '-line-' + props.entity.id}
        // >
        //
        //     {/*<div id={props.link.parent + '-line-indicator-objective-' + props.entity.id}*/}
        //     {/*     className={styles.indicatorContainer} style={{*/}
        //     {/*    background: props.entity.highlight_color !== null ? props.entity.highlight_color : '#777777',*/}
        //     {/*}}>*/}
        //     {/*    <ArrowForwardIosRounded*/}
        //     {/*        style={{*/}
        //     {/*            transform: 'rotate(-90deg)',*/}
        //     {/*            color: 'white',*/}
        //     {/*        }}/>*/}
        //     {/*</div>*/}
        //     {/*<div id={props.link.parent + '-line-content-' + props.entity.id}*/}
        //     {/*     className={styles.lineContentContainer}*/}
        //     {/*     style={{*/}
        //     {/*         color: props.entity.highlight_color !== null ? props.entity.highlight_color : undefined,*/}
        //     {/*         border: props.entity.highlight_color !== null ? props.entity.highlight_color + ' 2px solid' : '#777777 2px solid'*/}
        //     {/*     }}>*/}
        //     {/*    {props.link.description}*/}
        //     {/*</div>*/}
        // </div>
    )
}
Connection.propTypes = {
    canDelete: PropTypes.func,
    link:  PropTypes.shape({
        parent: PropTypes.number,
        child: PropTypes.number,
        strong: PropTypes.bool,
        description: PropTypes.string
    }),

    canEdit: PropTypes.bool,
    entity: EntityTemplate,

    renderOnRoot: PropTypes.func,
    root: PropTypes.object,

    source: PropTypes.object
}