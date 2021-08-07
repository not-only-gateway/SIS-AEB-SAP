import PropTypes from 'prop-types'
import NodeTemplate from "../../../templates/NodeTemplate";
import styles from '../../../styles/NodeOverview.module.css'
import {AttachFileRounded, CloseRounded, DeleteForeverRounded} from "@material-ui/icons";
import {useEffect, useRef, useState} from "react";
import Tabs from "../../navigation/misc/Tabs";
import {CirclePicker} from "react-color";

export default function Overview(props) {
    const [openTab, setOpenTab] = useState(0)
    const [exitAnim, setExitAnim] = useState('')
    const nodeRef = document.getElementById(props.node.id + '-node')
    const ref = useRef()
    const handleChange = (name, value) => {
        const newNodes = [...props.data.nodes]
        const newNode = {...props.node}

        newNode[name] = value
        newNodes[props.nodeIndex] = newNode
        props.setState(({
            ...props.data,
            nodes: newNodes
        }))
    }

    useEffect(() => {
        let newPlacement = {...props.node.placement}
        newPlacement.y = nodeRef.getBBox().y
        newPlacement.x = nodeRef.getBBox().x
        handleChange('placement', newPlacement)

        let newDimensions = {...props.node.dimensions}
        newDimensions.height = nodeRef.firstChild.getBBox().height
        newDimensions.width = nodeRef.firstChild.getBBox().width
        handleChange('dimensions', newDimensions)
    }, [])
    return (
        <div ref={ref} className={[styles.container, exitAnim].join(' ')}>

            <button className={styles.closeButtonContainer} onClick={() => {
                setExitAnim(styles.exitAnimation)
                ref.current.addEventListener('animationend', () => {
                    props.handleClose()
                }, {once: true})
            }}>
                <CloseRounded style={{fontSize: '1.3rem'}}/>
            </button>
            <Tabs buttons={[
                {
                    key: 0,
                    value: 'Conteúdo',
                    content: (
                        <div className={styles.header}>
                            <input className={[styles.input, styles.inputTitle].join(' ')} value={props.node.title}
                                   placeholder={'Título'}
                                   onChange={event => handleChange('title', event.target.value)}/>

                            <textarea className={[styles.input, styles.inputBody].join(' ')} maxLength={'300'}
                                      value={props.node.description}
                                      placeholder={'Descrição'}
                                      onChange={event => handleChange('description', event.target.value)}/>

                            <input type="file" id="upload_node_file" style={{display: 'none'}} multiple={false}
                                   onChange={event =>
                                       handleChange('file', event.target.files[0])
                                   }/>


                            <button
                                className={[styles.uploadButton, props.node.file !== undefined && props.node.file !== null ? styles.uploadButtonWFile : styles.uploadButtonNoFile].join(' ')}
                                onClick={() => {
                                    if (props.node.file !== undefined && props.node.file !== null)
                                        handleChange('file', undefined)
                                    else {
                                        const input = document.getElementById('upload_node_file')
                                        if (input !== null)
                                            input.click()
                                    }
                                }} id="upload_node_file">
                                {props.node.file !== undefined && props.node.file !== null ?
                                    <>
                                        <DeleteForeverRounded/>
                                        <div style={{color: '#333333'}}>
                                            {props.node.file.name}
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
                        <div style={{display: "grid", gap: '16px'}}>
                            <div className={styles.colorPicker}>
                                <CirclePicker
                                    width={'100%'}
                                    color={{hex: props.node.styling.color}}
                                    onChangeComplete={event => {
                                        handleChange('styling',
                                            {
                                                ...props.node.styling, ...{
                                                    color: event.hex
                                                }
                                            }
                                        )
                                    }
                                    }/>
                            </div>
                            <div className={styles.fieldContainer}
                                 style={{display: props.node.shape === 'triangle' ? 'none' : undefined}}>
                                <label htmlFor={'border-radius'}>Raio borda (px):</label>
                                <input id={'border-radius'}
                                       className={[styles.input, styles.inputBody].join(' ')}
                                       style={{fontSize: '.9rem', width: 'auto', marginLeft: 'auto'}}
                                       onChange={event => {

                                           handleChange('styling',
                                               {
                                                   ...props.node.styling, ...{
                                                       border: event.target.value,
                                                   }
                                               })
                                       }}
                                       value={props.node.styling.border}
                                       placeholder={'Borda'} type={'number'}
                                />
                            </div>
                            <div className={styles.fieldContainer}>
                                <label htmlFor={'skew'}>Ângulo de enviesamento:</label>
                                <input id={'skew'}
                                       className={[styles.input, styles.inputBody].join(' ')}
                                       style={{fontSize: '.9rem', width: 'auto', marginLeft: 'auto'}}
                                       onChange={event => {
                                           handleChange('styling', {
                                               ...props.node.styling, ...{
                                                   skew: event.target.value,
                                               }
                                           })
                                       }}
                                       value={props.node.styling.skew}
                                       placeholder={'skew'} type={'number'}
                                />
                            </div>
                            <div className={styles.fieldContainer}>
                                <label htmlFor={'stroke-width'}>Largura borda (px):</label>
                                <input id={'stroke-width'}
                                       className={[styles.input, styles.inputBody].join(' ')}
                                       style={{fontSize: '.9rem', width: 'auto', marginLeft: 'auto'}}
                                       onChange={event => {
                                           handleChange('styling',
                                               {
                                                   ...props.node.styling, ...{
                                                       borderWidth: event.target.value
                                                   }
                                               })
                                       }}
                                       value={props.node.styling.borderWidth}
                                       placeholder={'Largura'} type={'number'}
                                />
                            </div>

                            <fieldset className={styles.fieldSetContainer}>
                                <legend>Tipo borda:</legend>
                                <form id={'stroke-type'} style={{display: 'flex', flexFlow: 'wrap', gap: '16px'}}>
                                    <div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>

                                        <input id={'dashed'}
                                               className={[styles.input, styles.inputBody].join(' ')}
                                               onChange={event => {
                                                   // handleChange('styling', {
                                                   //     color: node.styling.color,
                                                   //     border: event.target.value
                                                   // })
                                               }} style={{width: 'fit-content'}}
                                               value={props.node.styling.border}
                                               placeholder={'Largura'} type={'checkbox'}
                                        />
                                        <label
                                            style={{
                                                fontSize: '.85rem',
                                                color: '#333333'
                                            }}
                                            htmlFor={'dashed'}>Dashed</label>
                                    </div>
                                    <div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>

                                        <input id={'dashed'}
                                               className={[styles.input, styles.inputBody].join(' ')}
                                               onChange={event => {
                                                   // handleChange('styling', {
                                                   //     color: node.styling.color,
                                                   //     border: event.target.value
                                                   // })
                                               }} style={{width: 'fit-content'}}
                                               value={props.node.styling.border}
                                               placeholder={'Largura'} type={'checkbox'}
                                        />
                                        <label
                                            style={{
                                                fontSize: '.85rem',
                                                color: '#333333'
                                            }}
                                            htmlFor={'dashed'}>Solid</label>
                                    </div>
                                </form>

                            </fieldset>
                        </div>
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
                                               let newPlacement = {...props.node.placement}
                                               newPlacement.y = nodeRef.getBBox().y
                                               newPlacement.x = event.target.value
                                               handleChange('placement', newPlacement)
                                           }}
                                           value={props.node.placement.x} placeholder={'X'} type={'number'}
                                    />
                                </div>
                                <div className={styles.fieldContainer}>
                                    <label htmlFor={'y-placement'}>Y</label>
                                    <input
                                        id={'y-placement'}
                                        className={[styles.input, styles.inputBody].join(' ')}
                                        style={{fontSize: '.9rem'}}
                                        onChange={event => {
                                            let newPlacement = {...props.node.placement}
                                            newPlacement.x = nodeRef.getBBox().x
                                            newPlacement.y = event.target.value
                                            handleChange('placement', newPlacement)
                                        }}
                                        value={props.node.placement.y} placeholder={'Y'} type={'number'}
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

                                               let newDimensions = {...props.node.dimensions}
                                               newDimensions.width = event.target.value
                                               newDimensions.height = nodeRef.getBBox().height
                                               if (event.target.value !== '0' && event.target.value.toString().length > 0)
                                                   handleChange('dimensions', newDimensions)
                                           }}
                                           value={props.node.dimensions.width} placeholder={'Largura'} type={'number'}
                                    />
                                </div>
                                <div className={styles.fieldContainer}>
                                    <label htmlFor={'height-placement'}>Altura</label>
                                    <input id={'height-placement'}
                                           className={[styles.input, styles.inputBody].join(' ')}
                                           style={{fontSize: '.9rem'}} min={'50'} max={'999'}
                                           onChange={event => {
                                               let newDimensions = {...props.node.dimensions}
                                               newDimensions.height = event.target.value
                                               newDimensions.width = nodeRef.getBBox().width
                                               if (event.target.value !== '0' && event.target.value.toString().length > 0)
                                                   handleChange('dimensions', newDimensions)
                                           }}
                                           value={props.node.dimensions.height} placeholder={'Altura'} type={'number'}
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

Overview.propTypes = {
    node: NodeTemplate,
    setState: PropTypes.func,
    data: PropTypes.object,
    handleClose: PropTypes.func,
    root: PropTypes.object,
    nodeIndex: PropTypes.number
}