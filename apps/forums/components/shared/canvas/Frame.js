import CanvasTemplate from "./templates/CanvasTemplate";
import FrameTemplate from "./templates/FrameTemplate";
import styles from './styles/Frame.module.css'
import Canvas from "./modules/canvas/Canvas";
import OptionsMenu from "./modules/navigation/OptionsMenu";
import React, {useEffect, useRef, useState} from "react";
import PropTypes from 'prop-types'
import Header from "./modules/Header";
import Scale from "./modules/Scale";
import Line from "./modules/connection/Line";

export default function Frame(props) {
    const [offsetTop, setOffsetTop] = useState(-1)
    const root = useRef()
    const contextMenuRef = useRef()
    const overflowRef = useRef()
    const canvasRef = useRef()
    useEffect(() => {
        if (offsetTop === -1) {
            const element = document.getElementById('frame')
            if (element !== null)
                setOffsetTop(element.offsetTop)
        }
    })
    return (
        <div className={styles.container} style={{...props.style, ...{height: 'calc(100vh - ' + offsetTop + 'px)'}}}
             id={'frame'}>
            <Header {...props.subject}/>
            <div className={styles.content} ref={overflowRef}>
                {/*<OptionsMenu/>*/}
                <div className={styles.canvasContainer} ref={root}>
                    <div ref={contextMenuRef} style={{position: 'absolute'}}/>
                    <svg width="100%" height="100%" style={{
                        position: 'absolute',
                        overflow: 'hidden',
                        top: '0',
                        left: '0'
                    }} id={'canvas'}>
                        {props.canvas.entities.map(entity => (
                            entity.parents.map(link => <Line
                                target={`${link.parent}-node`} source={`${entity.id}-node`}
                                color={entity.highlight_color !== undefined ? entity.highlight_color : '#777777'}
                                type={link.strong ? 'strong' : 'weak'}
                                rootOffset={{
                                    x: root.current.offsetLeft,
                                    y: root.current.offsetTop
                                }} description={link.description}/>)
                        ))}
                        <foreignObject width="100%" height="100%" ref={canvasRef}>
                            <Canvas {...props.canvas} root={root.current} canvasRef={canvasRef.current}
                                    contextMenuRef={contextMenuRef} overflowRef={overflowRef.current}/>
                        </foreignObject>
                    </svg>
                </div>
                {/*<Scale setScale={setCanvasScale} scale={canvasScale}/>*/}
            </div>
        </div>
    )
}
Frame.propTypes = {
    canvas: CanvasTemplate,
    style: FrameTemplate,
    subject: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        collaborators: PropTypes.arrayOf(
            PropTypes.object
        )
    })
}