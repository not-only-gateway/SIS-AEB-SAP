import CanvasTemplate from "./templates/CanvasTemplate";
import FrameTemplate from "./templates/FrameTemplate";
import styles from './styles/Frame.module.css'
import Canvas from "./modules/canvas/Canvas";
import OptionsMenu from "./modules/navigation/OptionsMenu";
import React, {useEffect, useRef, useState} from "react";
import PropTypes from 'prop-types'
import Header from "./modules/Header";
import Scale from "./modules/Scale";

export default function Frame(props) {
    const [offsetTop, setOffsetTop] = useState(-1)
    const [canvasScale, setCanvasScale] = useState(1)
    const root = useRef()
    const contextMenuRef = useRef()
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
            <div className={styles.content}>
                <OptionsMenu/>
                <div className={styles.canvasContainer} ref={root}>
                    <div ref={contextMenuRef} style={{position: 'absolute'}}/>
                    <span style={{zoom: canvasScale}} id={'canvas'}>
                        <Canvas {...props.canvas} root={root.current} scale={canvasScale}
                                contextMenuRef={contextMenuRef}/>
                    </span>
                </div>
                <Scale setScale={setCanvasScale} scale={canvasScale}/>
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