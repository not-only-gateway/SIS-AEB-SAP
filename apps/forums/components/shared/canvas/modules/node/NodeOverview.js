import PropTypes from 'prop-types'
import NodeTemplate from "../../templates/NodeTemplate";
import styles from '../../styles/NodeOverview.module.css'
import {AttachFileRounded, CloseRounded, DragIndicatorRounded} from "@material-ui/icons";
import {useState} from "react";
import MoveOverview from "../../methods/move/MoveOverview";
import {ColorField} from "sis-aeb-inputs";

export default function NodeOverview(props) {
    const [node, setNode] = useState(props.node)
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
    return (
        <div className={styles.container} id={'node-overview'}>
            <div className={styles.dragHeader} onMouseDown={event => {
                if (typeof event.target.className !== 'object' && event.target.className !== 'NodeOverview_closeButtonContainer__2RYF9')
                    MoveOverview({
                        contextMenuRef: props.contextMenuRef,
                        root: props.root,
                        event: event
                    })
            }}>
                <DragIndicatorRounded/>
                <button className={styles.closeButtonContainer} onClick={() => props.handleClose()}>
                    <CloseRounded style={{fontSize: '1.3rem'}}/>
                </button>
            </div>

            <div className={styles.header}>
                <input className={[styles.input, styles.inputTitle].join(' ')} value={node.title}
                       placeholder={'Título'} onChange={event => handleChange('title', event.target.value)}/>

                <input className={[styles.input, styles.inputBody].join(' ')} value={node.description}
                       placeholder={'Descrição'} maxLength={'150'}
                       onChange={event => handleChange('description', event.target.value)}/>
            </div>

            <textarea className={[styles.input, styles.inputBody].join(' ')} maxLength={'300'} value={node.body}
                      placeholder={'Corpo'} style={{marginTop: '32px'}}
                      onChange={event => handleChange('body', event.target.value)}/>
            <ColorField
                required={false} width={'100%'}
                value={node.color}
                handleChange={event => {
                    handleChange('color', event)
                }} label={'Cor de destaque'}/>
            <button className={styles.uploadButton} disabled={true}>
                <AttachFileRounded/>
                <div>
                    Anexar arquivo
                </div>
            </button>

            <div className={styles.footer}>
                <div style={{fontFamily: 'Roboto'}}>
                    Criado em:
                </div>
                <div style={{fontSize: '.9rem', fontFamily: 'Roboto', color: '#393C44'}}>
                    {new Date(node.creationDate).toDateString()}
                </div>

            </div>
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