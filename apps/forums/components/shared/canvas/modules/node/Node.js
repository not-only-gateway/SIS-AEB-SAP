import React, {useEffect, useRef, useState} from "react";
import NodePropsTemplate from "../../templates/NodePropsTemplate";
import RenderNodeShape from "./shapes/RenderNodeShape";


export default function Node(props) {
    const ref = useRef()
    const [linkable, setLinkable] = useState(false)

    useEffect(() => {
        if (props.toBeLinked !== null && props.toBeLinked.id !== props.node.id) {
            let el

            props.links.map(link => {
                if (link.child.id === props.node.id && props.toBeLinked.id === link.parent.id || link.parent.id === props.node.id && props.toBeLinked.id === link.child.id)
                    el = false
            })
            setLinkable(el)
        } else
            setLinkable(undefined)
    }, [props.toBeLinked])

    return (
        <g
            id={props.node.id + '-node'}
            style={{
                cursor: props.selected === props.node.id && props.toBeLinked === null ? 'move' : linkable === false ? 'unset' : "pointer",
                opacity: linkable === false ? '.5' : '1',
            }}
            ref={ref}
        >
            {/*<SelectedMenu selected={props.selected} node={props.node} nodeRef={ref.current} linkable={linkable}/>*/}
            <RenderNodeShape {...props} reference={ref.current}/>
        </g>

    )
}

Node.propTypes = NodePropsTemplate