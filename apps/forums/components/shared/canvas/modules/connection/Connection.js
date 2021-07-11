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
            target={`${props.link.parent}-node`} type={props.link.strong ? 'strong' : 'weak'}
            source={`${props.entity.id}-node`}
            rootOffset={{
                x: props.root.offsetLeft,
                y: props.root.offsetTop
            }}
        />
    )
}
Connection.propTypes = {
    canDelete: PropTypes.bool,
    link: PropTypes.shape({
        parent: PropTypes.number,
        child: PropTypes.number,
        strong: PropTypes.bool,
        description: PropTypes.string
    }),

    canEdit: PropTypes.bool,
    entity: EntityTemplate,

    renderOnRoot: PropTypes.func,
    root: PropTypes.object,
}