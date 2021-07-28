import React, {useEffect, useRef, useState} from "react";
import NodePropsTemplate from "../../templates/NodePropsTemplate";
import RenderNodeShape from "./shapes/RenderNodeShape";
import NodeConnection from "./NodeConnection";
import RenderStep from "./RenderStep";


export default function Node(props) {
    const ref = useRef()
    const [linkable, setLinkable] = useState(false)

    useEffect(() => {
        if (props.toBeLinked !== null && props.toBeLinked.id !== props.node.id) {
            let el = true
            if (props.node.links.length < 4) {
                props.node.links.map(link => {
                    if (link.child.id === props.node.id && props.toBeLinked.id === link.parent.id || link.parent.id === props.node.id && props.toBeLinked.id === link.child.id)
                        el = false
                })
            } else
                el = false
            setLinkable(el)
        } else
            setLinkable(false)
    }, [props.toBeLinked])

    return (
        <g
            id={props.node.id + '-node'}
            style={{
                cursor: props.selected === props.node.id && props.toBeLinked === null ? 'move' : !linkable && props.toBeLinked !== null ? 'unset' : "pointer",
                opacity: !linkable && props.toBeLinked !== null ? '.5' : '1',
                position: 'relative'
            }}
            ref={ref}
        >
            {props.asStep ?
                <RenderStep {...props} reference={ref.current}/>
                :
                <RenderNodeShape {...props} reference={ref.current} linkable={linkable}/>
            }
            <NodeConnection node={props.node} selected={props.selected} connectionPoint={'a'} reference={ref.current}
                            handleLink={props.handleLink} linkable={linkable}/>
            <NodeConnection node={props.node} selected={props.selected} connectionPoint={'b'} reference={ref.current}
                            handleLink={props.handleLink} linkable={linkable}/>
            <NodeConnection node={props.node} selected={props.selected} connectionPoint={'c'} reference={ref.current}
                            handleLink={props.handleLink} linkable={linkable}/>
            <NodeConnection node={props.node} selected={props.selected} connectionPoint={'d'} reference={ref.current}
                            handleLink={props.handleLink} linkable={linkable}/>
        </g>

    )
}

Node.propTypes = NodePropsTemplate