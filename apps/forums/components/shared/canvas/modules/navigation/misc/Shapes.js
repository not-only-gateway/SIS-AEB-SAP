import styles from '../../../styles/Shapes.module.css'
import PropTypes from 'prop-types'
import Elements from "./Elements";
import DragNew from "../../../methods/move/DragNew";

export default function Shapes(props) {
    return (
        <div style={{display: 'grid', gap: '16px'}}>


            <div className={styles.shapes}>
                <div
                    className={styles.shapeContainer}
                    id={'rect-draggable'}
                    onMouseDown={event => DragNew({
                        event: event,
                        scale: props.scale,
                        root: props.root,
                        element: document.getElementById('rect-draggable'),
                        contextMenuRef: props.contextMenuRef,
                        type: 'rect',
                        data: props.data,
                        setData: props.setData
                    })}
                >
                    <svg overflow={'visible'} width={'90'} height={'45'}>
                        <rect fill={'white'} width={'100%'} height={'100%'} stroke={"#0095ff"}
                              strokeWidth={2}/>
                    </svg>
                </div>
                <div
                    className={styles.shapeContainer}
                    id={'square-draggable'}
                    onMouseDown={event => DragNew({
                        event: event,
                        scale: props.scale,
                        root: props.root,
                        element: document.getElementById('square-draggable'),
                        contextMenuRef: props.contextMenuRef,
                        type: 'square',
                        data: props.data,
                        setData: props.setData
                    })}
                >
                    <svg overflow={'visible'} width={'45'} height={'45'}>
                        <rect fill={'white'} width={'100%'} height={'100%'} stroke={"#0095ff"} strokeWidth={2}/>
                    </svg>
                </div>

                <div
                    className={styles.shapeContainer}
                    id={'circle-draggable'}
                    onMouseDown={event => DragNew({
                        event: event,
                        scale: props.scale,
                        root: props.root,
                        element: document.getElementById('circle-draggable'),
                        contextMenuRef: props.contextMenuRef,
                        type: 'circle',
                        data: props.data,
                        setData: props.setData
                    })}
                >
                    <svg overflow={'visible'} width={'45'} height={'45'}>
                        <circle fill={'white'} cx={'50%'} cy={'50%'} r={'50%'} stroke={"#0095ff"}
                                strokeWidth={2}/>
                    </svg>
                </div>
                <div
                    className={styles.shapeContainer}
                    id={'ellipse-draggable'}
                    onMouseDown={event => DragNew({
                        event: event,
                        scale: props.scale,
                        root: props.root,
                        element: document.getElementById('ellipse-draggable'),
                        contextMenuRef: props.contextMenuRef,
                        type: 'ellipse',
                        data: props.data,
                        setData: props.setData
                    })}
                >
                    <svg overflow={'visible'} width={'90'} height={'45'}>

                        <ellipse cx={'50%'} cy={'50%'} rx={'50%'} ry={'50%'} stroke={'#0095ff'} fill={'white'}
                                 strokeWidth={2}/>
                    </svg>
                </div>
                {/*<div*/}
                {/*    className={styles.shapeContainer}*/}
                {/*    draggable={true}*/}
                {/*    onDragStart={() => props.onDragStart('trapezoid')}*/}
                {/*>*/}
                {/*    <svg overflow={'visible'} width={'80'} height={'80'}>*/}

                {/*        <path d={'M0,0 L 10,45 35,45 45,0 Z'} stroke={'#333333'} fill={'white'}/>*/}
                {/*    </svg>*/}
                {/*</div>*/}
                <div
                    className={styles.shapeContainer}
                    id={'trapezoid-draggable'}
                    onMouseDown={event => DragNew({
                        event: event,
                        scale: props.scale,
                        root: props.root,
                        element: document.getElementById('trapezoid-draggable'),
                        contextMenuRef: props.contextMenuRef,
                        type: 'trapezoid',
                        data: props.data,
                        setData: props.setData
                    })}
                >
                    <svg overflow={'visible'} width={'90'} height={'45'}>
                        <polygon points={'90,40 0,40 20,0, 70,0'} stroke={'#0095ff'} strokeWidth={2}
                                 fill={'white'}/>
                    </svg>
                </div>
                <div
                    className={styles.shapeContainer}
                    id={'parallelogram-draggable'}
                    onMouseDown={event => DragNew({
                        event: event,
                        scale: props.scale,
                        root: props.root,
                        element: document.getElementById('parallelogram-draggable'),
                        contextMenuRef: props.contextMenuRef,
                        type: 'parallelogram',
                        data: props.data,
                        setData: props.setData
                    })}
                >
                    <svg overflow={'visible'} width={'90'} height={'45'}>
                        <rect x="0" y="0" width="90" height="40" fill={'none'} stroke={'#0095ff'} strokeWidth={2}
                              transform="skewX(-25)"/>
                    </svg>
                </div>
                <div
                    className={styles.shapeContainer}
                    id={'triangle-draggable'}
                    onMouseDown={event => DragNew({
                        event: event,
                        scale: props.scale,
                        root: props.root,
                        element: document.getElementById('triangle-draggable'),
                        contextMenuRef: props.contextMenuRef,
                        type: 'triangle',
                        data: props.data,
                        setData: props.setData
                    })}
                >
                    <svg overflow={'visible'} width={'45'} height={'45'}>
                        <polygon points={'40,40 0,40 20,0'} stroke={'#0095ff'} strokeWidth={2} fill={'white'}/>
                    </svg>
                </div>
            </div>

            <Elements {...props} label={'Conexões:'}>
                <div className={styles.shapes}>
                    <div
                        className={styles.linkType}
                        style={{background: props.data.connectionType === 'strong-path' ? '#f4f5fa' : 'transparent'}}
                        onClick={() => props.setData({...props.data, ...{connectionType: 'strong-path'}})}
                    >
                        <svg width={'50px'} height={'50px'} overflow={'visible'}>
                            <path d="M 0, 0 C0,25 50,25 50, 50" strokeWidth={2} fill="white" stroke={'#555555'}/>
                        </svg>
                    </div>
                    <div
                        className={styles.linkType}
                        style={{background: props.data.connectionType === 'dashed-path' ? '#f4f5fa' : 'transparent'}}
                        onClick={() => props.setData({...props.data, ...{connectionType: 'dashed-path'}})}
                    >
                        <svg width={'50px'} height={'50px'} overflow={'visible'}>
                            <path d="M 0, 0 C0,25 50,25 50, 50" strokeWidth={2} fill="white" strokeDasharray={'5,5'}
                                  stroke={'#555555'}/>
                        </svg>
                    </div>
                    <div
                        className={styles.linkType}
                        style={{background: props.data.connectionType === 'dashed-line' ? '#f4f5fa' : 'transparent'}}
                        onClick={() => props.setData({...props.data, ...{connectionType: 'dashed-line'}})}
                    >
                        <svg width={'50px'} height={'50px'} overflow={'visible'}>
                            <line x1={1} y1={1} x2={50} y2={50} strokeWidth={2} fill="white" strokeDasharray={'5,5'}
                                  stroke={'#555555'}/>
                        </svg>
                    </div>
                    <div
                        className={styles.linkType}
                        style={{background: props.data.connectionType === 'strong-line' ? '#f4f5fa' : 'transparent'}}
                        onClick={() => props.setData({...props.data, ...{connectionType: 'strong-line'}})}
                    >
                        <svg width={'50px'} height={'50px'} overflow={'visible'}>
                            <line x1={1} y1={1} x2={50} y2={50} strokeWidth={2} fill="white" stroke={'#555555'}/>
                        </svg>
                    </div>
                </div>
            </Elements>

        </div>
    )

}

Shapes.propTypes = {
    onDragStart: PropTypes.func,
    setData: PropTypes.func,
    data: PropTypes.object,
    scale: PropTypes.number,
    root: PropTypes.object,
    contextMenuRef: PropTypes.object
}