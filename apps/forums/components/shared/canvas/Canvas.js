import CanvasTemplate from "./templates/CanvasPropsTemplate";
import styles from './styles/Frame.module.css'

import React, {useEffect, useRef, useState} from "react";
import {useReactToPrint} from "react-to-print";
import ReactDOM from "react-dom";
import OptionsMenu from "./modules/navigation/OptionsMenu";
import ScrollCanvas from "./methods/misc/ScrollCanvas";
import Scale from "./modules/navigation/Scale";
import {v4 as uuid4} from 'uuid';
import StickyZone from "./modules/placeholder/StickyZone";
import RenderNodes from "./methods/render/RenderNodes";
import RenderLinks from "./methods/render/RenderLinks";


export default function Canvas(props) {
    const [offsetTop, setOffsetTop] = useState(-1)
    const [data, setData] = useState({
        id: uuid4().toString(),
        subject: 'Sem título',
        nodes: [],
        links: [],
        dimensions: {},
        connectionType: 'strong-path',
        steps: []
    })
    const [toBeLinked, setToBeLinked] = useState(null)
    const [openNodeOverview, setOpenNodeOverview] = useState(false)
    const root = useRef()
    const contextMenuRef = useRef()
    const [selectedNode, setSelectedNode] = useState(undefined)
    const [scale, setScale] = useState(1)
    const printRef = useRef()
    const handlePrint = useReactToPrint({
        content: () => printRef.current
    });
    const [selectedLink, setSelectedLink] = useState(null)

    useEffect(() => {
        if (props.data !== undefined && props.data.id !== undefined) {
            setData(props.data)
        }
        if (offsetTop === -1) {
            const element = document.getElementById('frame')
            if (element !== null)
                setOffsetTop(element.offsetTop)
        }
    }, [])


    return (
        <div
            style={{height: '100%', width: '100%', userSelect: 'none', scrollBehavior: 'auto'}}
            id={'frame'} onMouseDown={event => {
            const className = event.target.className
            if (selectedLink && event.target.closest('.Link_input__3SQkm') === null)
                setSelectedLink(undefined)
            if (selectedNode && event.target.closest('.NodeMenu_selectedHighlight__jWe4i') === null)
                setSelectedNode(undefined)
            if (toBeLinked !== null && event.target.closest('.NodeMenu_selectedHighlight__jWe4i') === null)
                setToBeLinked(null)
            if (!openNodeOverview && contextMenuRef.current !== null && contextMenuRef.current.firstChild && className !== 'Canvas_optionButton__1K9rT' && className !== 'Canvas_lineContentContainer__1xCXK')
                ReactDOM.unmountComponentAtNode(contextMenuRef.current)
        }}>

            <div className={styles.content}>
                <Scale scale={scale} setScale={setScale}/>
                <OptionsMenu
                    root={root.current}
                    data={data}
                    setState={setData}
                    onSave={props.onSave}
                    handlePrint={handlePrint}
                />
                <div ref={contextMenuRef} style={{position: 'absolute'}}/>
                <StickyZone/>
                <div ref={root} className={styles.canvasContainer} onMouseDown={event => {
                    if (typeof event.target.className === 'object' && event.button === 2)
                        ScrollCanvas({canvas: root.current, event: event})
                }}>
                    <svg
                        onContextMenu={event => {
                            event.preventDefault()
                            if (openNodeOverview)
                                setOpenNodeOverview(false)
                        }}
                        style={{
                            minWidth: root.current !== undefined ? (root.current.offsetWidth * 2 + 'px') : '100%',
                            minHeight: root.current !== undefined ? (root.current.offsetHeight * 2 + 'px') : '100%',
                            position: 'absolute',
                            transform: `scale(${scale})`,
                            transformOrigin: scale !== 1 ? 'top left' : undefined,
                            top: 0,
                            left: 0
                        }}
                        ref={printRef}
                    >

                        <RenderNodes
                            {...props} contextMenuRef={contextMenuRef.current}
                            scale={scale} root={root.current}
                            setData={setData} data={data}
                            setOpenNodeOverview={setOpenNodeOverview}
                            openNodeOverview={openNodeOverview}
                            selectedNode={selectedNode} toBeLinked={toBeLinked}
                            setToBeLinked={setToBeLinked}
                            asStep={false} setSelectedNode={setSelectedNode}
                        />
                        <RenderLinks
                            {...props} data={data} setData={setData} selectedLink={selectedLink}
                            setSelectedLink={setSelectedLink} root={root.current}
                            contextMenuRef={contextMenuRef.current}
                            handleContextClose={() => ReactDOM.unmountComponentAtNode(contextMenuRef.current)}
                        />
                    </svg>
                </div>
            </div>
        </div>
    )
}
Canvas.propTypes = CanvasTemplate