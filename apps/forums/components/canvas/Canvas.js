import CanvasTemplate from "./templates/CanvasPropsTemplate";
import styles from './styles/Canvas.module.css'
import React, {useEffect, useRef, useState} from "react";
import {useReactToPrint} from "react-to-print";
import ReactDOM from "react-dom";
import ScrollCanvas from "./methods/misc/ScrollCanvas";
import RenderNodes from "./methods/render/RenderNodes";
import RenderLinks from "./methods/render/RenderLinks";
import NewProjectTemplate from "./templates/NewProjectTemplate";
import LinkIndicator from "./modules/link/LinkIndicator";
import Header from "./modules/navigation/Header";
import Footer from "./modules/navigation/Footer";
import SideBar from "./modules/navigation/SideBar";
import Overview from "./modules/node/misc/Overview";


export default function Canvas(props) {

    const [offsetTop, setOffsetTop] = useState(-1)
    const [data, setData] = useState(NewProjectTemplate)
    const [toBeLinked, setToBeLinked] = useState(null)
    const [nodeOnOverview, setNodeOnOverview] = useState(undefined)
    const root = useRef()
    const contextMenuRef = useRef()
    const [selectedNode, setSelectedNode] = useState(undefined)
    const [scale, setScale] = useState(1)
    const printRef = useRef()
    const handlePrint = useReactToPrint({
        content: () => printRef.current
    });

    useEffect(() => {

        if (selectedNode !== undefined) {
            let listen = true
            document.addEventListener('keydown', function keyDown(event) {
                if (listen && event.key === 'Delete') {
                    // let index
                    // data.nodes.find((node, i) => {
                    //     if (node.id === selectedNode)
                    //         index = i
                    // })
                    // console.log(index)
                    // let newNodes = [...data.nodes]
                    // newNodes.splice(index, 1)
                    // setData({
                    //     ...data,
                    //     nodes: newNodes
                    // })
                    listen = false
                } else
                    event.currentTarget.removeEventListener('keydown', keyDown);
            })
        }

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
            document.removeEventListener('keydown', () => null)
        }
    }, [toBeLinked, selectedNode])

    const renderOverview = () => {
        let i = -1
        if (nodeOnOverview !== undefined)
            data.nodes.find((node, index) => {
                if (node.id === nodeOnOverview.id)
                    i = index
            })
        let response = null

        if (i !== -1)
            response = (
                <Overview
                    root={root.current} data={data}
                    node={data.nodes[i]}
                    setState={setData}
                    nodeIndex={i}
                    handleClose={() => setNodeOnOverview(undefined)}/>
            )

        return response
    }
    return (
        <div
            className={styles.wrapper}
            id={'frame'}
            onMouseDown={event => {
                if (selectedNode && event.target.closest('.Node_body__1O9a2') === null && event.target.closest('.Node_nodeShapeContainer__3-69M') === null && event.target.id === '')
                    setSelectedNode(undefined)
                if (toBeLinked !== null && event.target.closest('.Node_body__1O9a2') === null && event.target.closest('.Node_nodeShapeContainer__3-69M') === null && event.target.id === '')
                    setToBeLinked(null)
            }}>
            <div ref={contextMenuRef} style={{position: 'fixed', zIndex: '999'}}/>

            <div className={styles.content}>
                <Header
                    root={root.current}
                    data={data}
                    setData={setData}
                    onSave={props.onSave}
                    handlePrint={handlePrint}
                />

                <div style={{display: 'flex', height: 'calc(100% - 75px)'}}>

                    <SideBar
                        root={root.current}
                        data={data} scale={scale}
                        setState={setData} contextMenuRef={contextMenuRef.current}
                    />

                    <div
                        ref={root} className={styles.canvasContainer}
                        onMouseDown={event => {
                            if (typeof event.target.className === 'object' && event.button === 2)
                                ScrollCanvas({canvas: root.current, event: event})
                        }}>
                        <svg
                            onContextMenu={event => {
                                event.preventDefault()
                            }}
                            style={{
                                minWidth: data.dimensions.width + 'px',
                                minHeight: data.dimensions.height + 'px',
                                transform: `scale(${scale})`,
                                transformOrigin: scale !== 1 ? 'top left' : undefined,
                            }}
                            className={styles.canvasBackground}
                            ref={printRef}
                        >
                            <LinkIndicator source={toBeLinked} type={data.connectionType} root={root.current}/>
                            <RenderNodes
                                {...props} contextMenuRef={contextMenuRef.current}
                                scale={scale} root={root.current}
                                setData={setData} data={data}
                                nodeOnOverview={nodeOnOverview}
                                setNodeOnOverview={setNodeOnOverview}
                                selectedNode={selectedNode} toBeLinked={toBeLinked}
                                setToBeLinked={setToBeLinked}
                                asStep={false} setSelectedNode={setSelectedNode}
                            />
                            <RenderLinks
                                {...props} data={data} setData={setData}
                                root={root.current}
                                contextMenuRef={contextMenuRef.current}
                                handleContextClose={() => ReactDOM.unmountComponentAtNode(contextMenuRef.current)}
                            />

                        </svg>
                    </div>

                    {renderOverview()}
                </div>
                <Footer scale={scale} setScale={setScale} data={data} setData={setData}
                        contextMenuRef={contextMenuRef.current}/>
            </div>
        </div>
    )
}
Canvas.propTypes = CanvasTemplate