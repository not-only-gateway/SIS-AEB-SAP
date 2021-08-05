import styles from '../styles/Shapes.module.css'
import PropTypes from 'prop-types'
import Elements from "./Elements";
import DragNew from "../../../methods/move/DragNew";

export default function Shapes(props) {
    const drag = (event, shape) => {
        props.setOpenNodeOverview(null)
        DragNew({
            event: event,
            scale: props.scale,
            root: props.root,
            element: document.getElementById(shape + '-draggable'),
            contextMenuRef: props.contextMenuRef,
            type: shape,
            data: props.data,
            setData: props.setData
        })
    }
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                Formas
            </div>
            <Elements {...props} label={'Formas:'}>
                <div className={styles.shapes}>
                    <div
                        className={styles.shapeContainer}
                        id={'rect-draggable'}
                        onMouseDown={event => drag(event, 'rect')}
                    >
                        <svg overflow={'visible'} width={'90'} height={'45'}>
                            <rect fill={'white'} width={'100%'} height={'100%'} stroke={"#0095ff"}
                                  strokeWidth={2}/>
                        </svg>
                    </div>
                    <div
                        className={styles.shapeContainer}
                        id={'square-draggable'}
                        onMouseDown={event => drag(event, 'square')}
                    >
                        <svg overflow={'visible'} width={'45'} height={'45'}>
                            <rect fill={'white'} width={'100%'} height={'100%'} stroke={"#0095ff"} strokeWidth={2}/>
                        </svg>
                    </div>

                    <div
                        className={styles.shapeContainer}
                        id={'circle-draggable'}
                        onMouseDown={event => drag(event, 'circle')}
                    >
                        <svg overflow={'visible'} width={'45'} height={'45'}>
                            <circle fill={'white'} cx={'50%'} cy={'50%'} r={'50%'} stroke={"#0095ff"}
                                    strokeWidth={2}/>
                        </svg>
                    </div>
                    <div
                        className={styles.shapeContainer}
                        id={'ellipse-draggable'}
                        onMouseDown={event => drag(event, 'ellipse')}
                    >
                        <svg overflow={'visible'} width={'90'} height={'45'}>

                            <ellipse cx={'50%'} cy={'50%'} rx={'50%'} ry={'50%'} stroke={'#0095ff'} fill={'white'}
                                     strokeWidth={2}/>
                        </svg>
                    </div>

                    <div
                        className={styles.shapeContainer}
                        id={'trapezoid-draggable'}
                        onMouseDown={event => drag(event, 'trapezoid')}
                    >
                        <svg overflow={'visible'} width={'90px'} height={'45px'} viewBox="0 0 100 100">
                            <polygon points={'100,100 0,100 25,0 75,0'} stroke={'#0095ff'} strokeWidth={'2px'}
                                     vectorEffect="non-scaling-stroke"
                                     fill={'white'}/>
                        </svg>
                    </div>
                    <div
                        className={styles.shapeContainer}
                        id={'parallelogram-draggable'}
                        onMouseDown={event => drag(event, 'parallelogram')}
                    >
                        <svg overflow={'visible'} width={'90'} height={'45'}>
                            <rect x="25" y="0" width="100%" height="100%" fill={'white'} stroke={'#0095ff'}
                                  strokeWidth={2}
                                  transform="skewX(-25)"/>
                        </svg>
                    </div>
                    <div
                        className={styles.shapeContainer}
                        id={'triangle-draggable'}
                        onMouseDown={event => drag(event, 'triangle')}
                    >
                        <svg overflow={'visible'} width={'45'} height={'45'} viewBox="0 0 100 100">
                            <polygon points={'100,100 0,100 50,0'} stroke={'#0095ff'} strokeWidth={'2px'}
                                     vectorEffect="non-scaling-stroke" fill={'white'}/>
                        </svg>
                    </div>
                </div>
            </Elements>
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
    setOpenNodeOverview: PropTypes.func,

    onDragStart: PropTypes.func,
    setData: PropTypes.func,
    data: PropTypes.object,
    scale: PropTypes.number,
    root: PropTypes.object,
    contextMenuRef: PropTypes.object
}