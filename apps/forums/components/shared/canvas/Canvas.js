import CanvasTemplate from "./templates/CanvasPropsTemplate";
import styles from './styles/Frame.module.css'

import React, {useEffect, useRef, useState} from "react";
import {useReactToPrint} from "react-to-print";
import ReactDOM from "react-dom";
import OptionsMenu from "./modules/navigation/OptionsMenu";
import ScrollCanvas from "./methods/misc/ScrollCanvas";
import Scale from "./modules/navigation/Scale";

import StickyZone from "./modules/misc/StickyZone";
import RenderNodes from "./methods/render/RenderNodes";
import RenderLinks from "./methods/render/RenderLinks";
import NewProjectTemplate from "./templates/NewProjectTemplate";
import LinkIndicator from "./modules/link/LinkIndicator";


export default function Canvas(props) {
    const [reduced, setReduced] = useState(false)
    const [offsetTop, setOffsetTop] = useState(-1)
    const [data, setData] = useState(NewProjectTemplate)
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
        document.addEventListener('mouseup', event => {
            const closest = event.target.closest('circle')
            if (toBeLinked !== null && closest === null)
                setToBeLinked(null)


        }, {once: true})

        if (offsetTop === -1) {
            const element = document.getElementById('frame')
            if (element !== null)
                setOffsetTop(element.offsetTop)

            if (props.data !== undefined && props.data.id !== undefined)
                setData(props.data)
        }
        return () => {
            document.removeEventListener('mouseup', () => null)
        }
    }, [toBeLinked])


    return (
        <div
            style={{height: '100%', width: '100%', userSelect: 'none', scrollBehavior: 'auto'}}
            id={'frame'}
            onMouseDown={event => {
                const className = event.target.className
                if (selectedLink && event.target.closest('.Link_input__3SQkm') === null)
                    setSelectedLink(undefined)
                if (selectedNode && event.target.closest('.Node_body__1O9a2') === null && event.target.closest('.Node_nodeShapeContainer__3-69M') === null && event.target.id === '')
                    setSelectedNode(undefined)
                if (toBeLinked !== null && event.target.closest('.Node_body__1O9a2') === null && event.target.closest('.Node_nodeShapeContainer__3-69M') === null && event.target.id === '')
                    setToBeLinked(null)
                if (!openNodeOverview && contextMenuRef.current !== null && contextMenuRef.current.firstChild && className !== 'Canvas_optionButton__1K9rT' && className !== 'Canvas_lineContentContainer__1xCXK')
                    ReactDOM.unmountComponentAtNode(contextMenuRef.current)
            }}>

            <div className={styles.content}>
                <Scale scale={scale} setScale={setScale}/>
                <OptionsMenu
                    reduced={reduced}
                    setReduced={setReduced}
                    root={root.current}
                    data={data}
                    setState={setData}
                    onSave={props.onSave}
                    handlePrint={handlePrint}
                />
                <div ref={contextMenuRef} style={{position: 'absolute'}}/>
                <StickyZone/>
                <div
                    ref={root} className={styles.canvasContainer}
                    onMouseDown={event => {
                        if (typeof event.target.className === 'object' && event.button === 2)
                            ScrollCanvas({canvas: root.current, event: event})
                    }}
                    style={{width: reduced ? `calc(100% - 80px)` : 'calc(100% - 400px)'}}>
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
                        className={styles.canvasBackground}
                        ref={printRef}
                    >
                        <LinkIndicator source={toBeLinked} type={data.connectionType} root={root.current}/>
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