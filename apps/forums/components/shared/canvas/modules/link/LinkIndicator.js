import PropTypes from "prop-types";
import React, {useEffect, useRef, useState} from "react";
import GetCurve from "../../methods/misc/GetCurve";
import LinkContextMenu from "./LinkContextMenu";
import AdjustLink from "../../methods/misc/AdjustLink";
import FollowMouse from "../../methods/misc/FollowMouse";

export default function LinkIndicator(props) {
    const pathRef = useRef()

    useEffect(() => {
        if (props.source !== null && props.source !== undefined) {
            FollowMouse({
                pathRef: pathRef.current,
                source: {
                    reference: document.getElementById(props.source.id + '-node'),
                    connectionPoint: props.source.connectionPoint,
                    nodeShape: props.source.nodeShape
                },
                root: props.root,
                type: props.type
            })
        }
    })

    if (props.source !== null && props.source !== undefined)
        return (
            <g>
                <defs>
                    <marker
                        id={`${props.source.id}-end`}
                        viewBox="0 0 20 20" refX="10" refY="10"
                        markerWidth="10" markerHeight="10"
                    >
                        <circle cx="10" cy="10" r="10" fill={'#0095ff'}
                                style={{transition: 'fill 250ms linear', transitionDelay: '250ms'}}
                        />
                    </marker>
                    <marker
                        id={`${props.source.id}-start`}
                        viewBox="0 0 10 10" refX={'5'} refY={'10'}
                        markerWidth="5" markerHeight="5"
                    >

                        <circle cx="5" cy="5" r="5" fill={'#0095ff'}
                                style={{transition: 'fill 250ms linear', transitionDelay: '250ms'}}/>
                    </marker>
                </defs>
                <path
                    stroke={
                        '#0095ff'
                    } strokeWidth={'2'} style={{transition: 'stroke 250ms linear', transitionDelay: '250ms'}}
                    fill={'none'} ref={pathRef}
                    strokeDasharray={props.type.includes('dashed') ? '5,5' : undefined}
                    d={'M 0,0'}
                    markerStart={`url(#${props.source.id}-end)`}
                    markerEnd={`url(#${props.source.id}-start)`}
                />

                <path
                    stroke={
                        'transparent'
                    } strokeWidth={'20'}
                    fill={'none'}
                    d={pathRef.current !== undefined ? pathRef.current.getAttribute("d") : undefined}
                />

            </g>
        )
    else
        return null
}

LinkIndicator.propTypes = {
    source: PropTypes.shape({
        id: PropTypes.string,
        nodeShape: PropTypes.string,
        connectionPoint: PropTypes.oneOf(['a', 'b', 'c', 'd'])
    }),
    root: PropTypes.object,
    type: PropTypes.oneOf(['strong-path', 'strong-line', 'dashed-path', 'dashed-line'])
}