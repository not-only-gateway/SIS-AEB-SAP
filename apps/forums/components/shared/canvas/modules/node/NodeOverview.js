import PropTypes from 'prop-types'
import NodeTemplate from "../../templates/NodeTemplate";
import styles from '../../styles/NodeOverview.module.css'
import {
    ArrowBackIos,
    AttachFileRounded,
    CloseRounded,
    DeleteForeverRounded,
    DragIndicatorRounded
} from "@material-ui/icons";
import {useEffect, useRef, useState} from "react";
import MoveOverview from "../../methods/move/MoveOverview";
import {ColorField} from "sis-aeb-inputs";
import Tabs from "../navigation/Tabs";
import HandleUpload from "../../methods/handles/HandleUpload";
import nodeStyles from "../../styles/NodeOverview.module.css";
import DragHandleRoundedIcon from "@material-ui/icons/DragHandleRounded";

export default function NodeOverview(props) {
    const [node, setNode] = useState(props.node)
    const [openTab, setOpenTab] = useState(0)
    const nodeRef = document.getElementById(props.node.id + '-node')
    const ref = useRef()
    const handleChange = (name, value) => {
        const newNodes = [...props.data.nodes]
        const newNode = {...node}

        newNode[name] = value
        newNodes[props.nodeIndex] = newNode
        setNode(newNode)
        props.setState(({
            ...props.data,
            nodes: newNodes
        }))
    }

    useEffect(() => {
        let newPlacement = {...node.placement}
        newPlacement.y = nodeRef.getBBox().y
        newPlacement.x = nodeRef.getBBox().x
        handleChange('placement', newPlacement)

        let newDimensions = {...node.dimensions}
        newDimensions.height = nodeRef.firstChild.getBBox().height
        newDimensions.width = nodeRef.firstChild.getBBox().width
        handleChange('dimensions', newDimensions)
    }, [])
    return (
        <div className={styles.container} id={'node-overview'} ref={ref}>
            <div className={styles.dragHeader} onMouseDown={event => {
                if (typeof event.target.className !== 'object' && event.target.className !== 'NodeOverview_closeButtonContainer__2RYF9')
                    MoveOverview({
                        contextMenuRef: props.contextMenuRef,
                        root: props.root,
                        event: event
                    })
            }}>
                <button className={nodeStyles.closeButtonContainer} onClick={() => {

                    props.contextMenuRef.style.top = '50px'
                    props.contextMenuRef.style.left = 'calc(100vw - 360px)'
                    const frame = document.getElementById('frame')
                    if (frame !== null) {
                        props.contextMenuRef.style.height = 'auto'
                        props.contextMenuRef.childNodes[0].style.height = 'calc(100vh - ' + (frame.offsetTop + 60) + 'px)'

                    }

                }}>
                    <DragHandleRoundedIcon style={{
                        fontSize: '1.2rem',
                        transition: '150ms linear'
                    }}/>
                </button>
                <div className={styles.overflowEllipsis} style={{maxWidth: '40%'}}>
                    {props.node.id}
                    {/*<div class={styles.toolTip}>*/}
                    {/*    {props.node.id}*/}
                    {/*</div>*/}
                </div>
                <button className={styles.closeButtonContainer} onClick={() => props.handleClose()}>
                    <CloseRounded style={{fontSize: '1.3rem'}}/>
                </button>
            </div>
            <Tabs buttons={[
                {
                    key: 0,
                    value: 'Conteúdo',
                    content: (
                        <div className={styles.header}>
                            <input className={[styles.input, styles.inputTitle].join(' ')} value={node.title}
                                   placeholder={'Título'}
                                   onChange={event => handleChange('title', event.target.value)}/>

                            <textarea className={[styles.input, styles.inputBody].join(' ')} maxLength={'300'}
                                      value={node.description}
                                      placeholder={'Descrição'}
                                      onChange={event => handleChange('description', event.target.value)}/>

                            <input type="file" id="upload_node_file" style={{display: 'none'}} multiple={false}
                                   onChange={event => {
                                       console.log(event.target.files)
                                       handleChange('file', event.target.files[0])
                                   }}/>


                            <button
                                className={[styles.uploadButton, node.file !== undefined && node.file !== null ? styles.uploadButtonWFile : styles.uploadButtonNoFile].join(' ')}
                                onClick={() => {
                                    if (node.file !== undefined && node.file !== null)
                                        handleChange('file', undefined)
                                    else {
                                        const input = document.getElementById('upload_node_file')
                                        if (input !== null)
                                            input.click()
                                    }
                                }} id="upload_node_file">
                                {node.file !== undefined && node.file !== null ?
                                    <>
                                        <DeleteForeverRounded/>
                                        <div style={{color: '#333333'}}>
                                            {node.file.name}
                                        </div>
                                    </>
                                    :
                                    <>
                                        <AttachFileRounded/>
                                        <div style={{color: '#333333'}}>
                                            Anexar arquivo
                                        </div>
                                    </>
                                }
                            </button>
                        </div>
                    )
                },
                {
                    key: 1,
                    value: 'Estilo',
                    content: (
                        <>
                            <ColorField
                                required={false} width={'100%'}
                                value={node.color}
                                handleChange={event => {
                                    handleChange('color', event)
                                }} label={'Cor de destaque'}
                            />

                        </>
                    )
                },
                {
                    key: 2,
                    value: 'Ajustes',
                    content: (
                        <div style={{display: "grid", gap: '16px'}}>
                            <fieldset className={styles.fieldSetContainer}>
                                <legend>Posição</legend>
                                <div className={styles.fieldContainer}>
                                    <label htmlFor={'x-placement'}>X</label>
                                    <input id={'x-placement'}
                                           className={[styles.input, styles.inputBody].join(' ')}
                                           style={{fontSize: '.9rem'}}
                                           onChange={event => {
                                               let newPlacement = {...node.placement}
                                               newPlacement.y = nodeRef.getBBox().y
                                               newPlacement.x = event.target.value
                                               handleChange('placement', newPlacement)
                                           }}
                                           value={node.placement.x} placeholder={'X'} type={'number'}
                                    />
                                </div>
                                <div className={styles.fieldContainer}>
                                    <label htmlFor={'y-placement'}>Y</label>
                                    <input
                                        id={'y-placement'}
                                        className={[styles.input, styles.inputBody].join(' ')}
                                        style={{fontSize: '.9rem'}}
                                        onChange={event => {
                                            let newPlacement = {...node.placement}
                                            newPlacement.x = nodeRef.getBBox().x
                                            newPlacement.y = event.target.value
                                            handleChange('placement', newPlacement)
                                        }}
                                        value={node.placement.y} placeholder={'Y'} type={'number'}
                                    />
                                </div>
                            </fieldset>

                            <fieldset className={styles.fieldSetContainer}>
                                <legend>Tamanho</legend>
                                <div className={styles.fieldContainer}>
                                    <label htmlFor={'width-placement'}>Largura</label>
                                    <input id={'width-placement'}
                                           className={[styles.input, styles.inputBody].join(' ')}
                                           style={{fontSize: '.9rem'}} min={'50'} max={'999'}
                                           onChange={event => {

                                               let newDimensions = {...node.dimensions}
                                               newDimensions.width = event.target.value
                                               newDimensions.height = nodeRef.getBBox().height
                                               if (event.target.value !== '0' && event.target.value.toString().length > 0)
                                                   handleChange('dimensions', newDimensions)
                                           }}
                                           value={node.dimensions.width} placeholder={'Largura'} type={'number'}
                                    />
                                </div>
                                <div className={styles.fieldContainer}>
                                    <label htmlFor={'height-placement'}>Altura</label>
                                    <input id={'height-placement'}
                                           className={[styles.input, styles.inputBody].join(' ')}
                                           style={{fontSize: '.9rem'}} min={'50'} max={'999'}
                                           onChange={event => {
                                               let newDimensions = {...node.dimensions}
                                               newDimensions.height = event.target.value
                                               newDimensions.width = nodeRef.getBBox().width
                                               if (event.target.value !== '0' && event.target.value.toString().length > 0)
                                                   handleChange('dimensions', newDimensions)
                                           }}
                                           value={node.dimensions.height} placeholder={'Altura'} type={'number'}
                                    />

                                </div>
                            </fieldset>
                        </div>
                    )
                },
            ]} openTab={openTab} setOpenTab={setOpenTab}/>
        </div>
    )
}

NodeOverview.propTypes = {
    node: NodeTemplate,
    setState: PropTypes.func,
    data: PropTypes.object,
    handleClose: PropTypes.func,
    contextMenuRef: PropTypes.object,
    root: PropTypes.object,
    nodeIndex: PropTypes.number
}