import React, {useEffect, useRef, useState} from "react";
import NodePropsTemplate from "../../templates/NodePropsTemplate";
import RenderNodeShape from "./misc/RenderNodeShape";
import ConnectionIndicator from "./modules/ConnectionIndicator";
import styles from '../../styles/Node.module.css'
import ResizeIndicator from "./modules/ResizeIndicator";
import Wrapper from "./modules/Wrapper";

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
                cursor: !linkable && props.toBeLinked !== null ? 'unset' : "pointer",
                opacity: !linkable && props.toBeLinked !== null || (props.selected !== undefined && props.node.id !== props.selected) ? '.5' : '1',
                position: 'relative',
            }}
            className={styles.entityContainer}
            ref={ref}
        >

            <svg x={props.node.placement.x} y={props.node.placement.y} overflow={'visible'} id={props.node.id+'-*svg'}>
                <RenderNodeShape {...props} reference={ref.current} linkable={linkable}/>

                <foreignObject
                    x={(props.node.shape === 'triangle' ? props.node.dimensions.width/4 : 0)} y={0}
                    width={props.node.dimensions.width/(props.node.shape === 'triangle' ? 2 : 1)}
                    height={props.node.dimensions.height} key={props.node.id+'-*object'}
                    className={props.linkable ? styles.pulse : ' '}
                    style={{
                        transition: 'box-shadow 150ms linear',
                        borderRadius: props.node.styling.border + 'px',

                    }}>
                    <Wrapper {...props}>
                        <div className={styles.header} id={props.node.id+'-*header'}>
                            {props.node.title}
                        </div>
                    </Wrapper>
                </foreignObject>
            </svg>
            <ResizeIndicator reference={ref.current} selected={props.selected} node={props.node} scale={props.scale}
                             setSelected={props.setSelected} handleSizeChange={props.handleSizeChange} />

            <ConnectionIndicator
                node={props.node} selected={props.selected} connectionPoint={'a'}
                reference={ref.current}
                handleLink={props.handleLink} linkable={linkable}/>
            <ConnectionIndicator
                node={props.node} selected={props.selected} connectionPoint={'b'}
                reference={ref.current}
                handleLink={props.handleLink} linkable={linkable}/>
            <ConnectionIndicator
                node={props.node} selected={props.selected} connectionPoint={'c'}
                reference={ref.current}
                handleLink={props.handleLink} linkable={linkable}/>
            <ConnectionIndicator
                node={props.node} selected={props.selected} connectionPoint={'d'}
                reference={ref.current}
                handleLink={props.handleLink} linkable={linkable}/>

            <g id={props.node.id + '-node-slot'}/>
        </g>

    )
}

Node.propTypes = NodePropsTemplate