import PropTypes from 'prop-types'
import {useEffect, useRef, useState} from "react";
import React from 'react'

export default function Node(props) {
    const [connections, setConnections] = useState([])
    const [children, setChildren] = useState([])
    const [startup, setStartup] = useState(true)
    const [parentXDistance, setParentXDistance] = useState(0)
    const [parentYDistance, setParentYDistance] = useState(0)
    const ref = useRef();
    useEffect(() => {
        if (props.entity !== undefined && children.length === 0 && startup) {
            props.getDependents(props.entity).then(res => {
                let newArray = []
                let i
                for (i = 0; i < res.length; i++) {
                    if (document.getElementById(props.getEntityKey(res[i]) + '-node') === null)
                        newArray.push(res[i])
                }
                setChildren(newArray)
            })

            setConnections(props.getParentKeys(props.entity))


            setStartup(false)
        }
        let parent
        let i
        if (props.entity !== undefined && !startup)
            for (i = 0; i < props.entity.parents.length; i++) {
                parent = document.getElementById(props.entity.parents[i] + '-node')

                if (ref.current !== null && parent !== null ) {
                    parent = parent.getBoundingClientRect()
                    let main = ref.current.getBoundingClientRect()

                    let x = (main.left - parent.left) > (main.right - parent.right) ? (main.left - parent.left) : (main.right - parent.right)
                    let y = (main.top - parent.top) > (main.bottom - parent.bottom) ? (main.bottom - parent.bottom) : (main.top - parent.top)
                    setParentXDistance(x)
                    setParentYDistance(y)
                } else
                    console.log(parent)
            }
    })

    return (
        <div style={{
            display: 'grid',
            rowGap: '45px',
            justifyItems: 'center',
            justifyContent: 'center',
            position: 'relative'
        }}>
            <div style={{
                display: connections.length === 0 || props.isOnlyChild || props.level === 0 ? 'none' : undefined,
                position: 'absolute',
                height: '2px',
                width: Math.abs(parentXDistance) + 'px',
                background: '#e0e0e0',
                top: '-24px',
                left: props.isFirstChild ? '50%' : undefined,
                right: props.isLastChild ? '50%' : undefined,
            }}/>
            <div id={props.getEntityKey(props.entity) + '-node'} ref={ref}
                 style={{
                     width: 'fit-content',
                     height: 'fit-content',
                     position: 'relative',
                     zIndex: 2,
                     background: 'white'
                 }}>
                <div style={{
                    display: connections.length === 0 || props.level === 0 ? 'none' : undefined,
                    position: 'absolute',
                    height: ref.current !== undefined && parentYDistance < ref.current.offsetHeight ? Math.abs(parentYDistance) +'px': '24px',
                    width: '2px',
                    background: 'blue',
                    top: ref.current !== undefined && parentYDistance < ref.current.offsetHeight ? '-'+Math.abs(parentYDistance) +'px': '-24px',
                    left: '50%',
                    zIndex: 0
                }}/>

                {props.renderNode(props.entity)}
                <div style={{
                    display: children.length === 0 ? 'none' : undefined,
                    position: 'absolute',
                    height: ref.current !== undefined && parentYDistance < ref.current.offsetHeight ? Math.abs(parentYDistance) +'px': '24px',
                    width: '2px',
                    background: 'red',
                    bottom: ref.current !== undefined && parentYDistance < ref.current.offsetHeight ? '-'+Math.abs(parentYDistance) +'px': '-24px',
                    left: '50%',
                    zIndex: 0
                }}/>
            </div>
            <div style={{
                display: children.length > 0 ? 'inline-flex' : 'none',
                justifyItems: 'center',
                justifyContent: 'center',
                gap: '32px',
                gridTemplateColumns: 'repeat(' + children.length + ', 10%)'
            }}>
                <React.Fragment key={props.getEntityKey(props.entity) + '-container'}>
                    {children.map((child, index) =>
                        <Node entity={child} getEntityKey={props.getEntityKey} renderNode={props.renderNode}
                              isFirstChild={index === 0 && children.length > 1} isOnlyChild={children.length === 1}
                              level={props.level + 1}
                              isLastChild={index === (children.length - 1) && children.length > 1}
                              getDependents={props.getDependents} getParentKeys={props.getParentKeys}/>
                    )}
                </React.Fragment>
            </div>
        </div>
    )

}
Node.propTypes = {
    level: PropTypes.number,

    isLastChild: PropTypes.bool,
    isFirstChild: PropTypes.bool,
    isOnlyChild: PropTypes.bool,

    renderNode: PropTypes.func,
    entity: PropTypes.object,
    getEntityKey: PropTypes.func,
    getParentKeys: PropTypes.func,
    getDependents: PropTypes.func
}