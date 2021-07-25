import styles from '../../styles/Shapes.module.css'
import {ArrowBackIos, DragIndicatorRounded} from "@material-ui/icons";
import PropTypes from 'prop-types'
import Elements from "./Elements";

export default function Shapes(props) {
    return (
        <div style={{display: 'grid', gap: '16px'}}>
            <Elements {...props} label={'Elementos:'}>

                <div className={styles.shapes}>

                    <div
                        className={styles.shapeContainer}
                        draggable={true}
                        onDragStart={() => props.onDragStart('rect')}
                    >
                        <svg overflow={'hidden'} width={'90'} height={'45'}>
                            <rect fill={'transparent'} width={'90'} height={'45'} stroke={"#333333"}
                                  strokeWidth={'1'}/>
                        </svg>
                    </div>
                    <div
                        className={styles.shapeContainer}
                        draggable={true}
                        onDragStart={() => props.onDragStart('rounded-rect')}
                    >
                        <svg overflow={'hidden'} width={'90'} height={'45'}>
                            <rect fill={'transparent'} width={'90'} height={'45'} ry={'5'} rx={'5'} stroke={"#333333"}
                                  strokeWidth={'1'}/>
                        </svg>
                    </div>
                    <div
                        className={styles.shapeContainer}
                        draggable={true}
                        onDragStart={() => props.onDragStart('square')}
                    >
                        <svg overflow={'hidden'} width={'45'} height={'45'}>
                            <rect fill={'transparent'} width={45} height={45} stroke={"#333333"} strokeWidth={'1'}/>
                        </svg>
                    </div>
                    <div
                        className={styles.shapeContainer}
                        draggable={true}
                        onDragStart={() => props.onDragStart('rounded-square')}
                    >
                        <svg overflow={'hidden'} width={'45'} height={'45'}>
                            <rect fill={'transparent'} width={45} height={45} rx={'5'} ry={'5'} stroke={"#333333"} strokeWidth={'1'}/>
                        </svg>
                    </div>
                    <div
                        className={styles.shapeContainer}
                        draggable={true}
                        onDragStart={() => props.onDragStart('circle')}
                    >
                        <svg overflow={'visible'} width={'45'} height={'45'}>
                            <circle fill={'transparent'} cx={'22.5'} cy={'22.5'} r={'22.5'} stroke={"#333333"}
                                    strokeWidth={'.8'}/>
                        </svg>
                    </div>

                    <div
                        className={styles.shapeContainer}
                        draggable={true}
                        onDragStart={() => props.onDragStart('trapezoid')}
                    >
                        <svg overflow={'visible'} width={'80'} height={'80'}>


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
                            <path d="M 0, 0 C0,25 50,25 50, 50" strokeWidth={2} fill="none" stroke={'#555555'}/>
                        </svg>
                    </div>
                    <div
                        className={styles.linkType}
                        style={{background: props.data.connectionType === 'dashed-path' ? '#f4f5fa' : 'transparent'}}
                        onClick={() => props.setData({...props.data, ...{connectionType: 'dashed-path'}})}
                    >
                        <svg width={'50px'} height={'50px'} overflow={'visible'}>
                            <path d="M 0, 0 C0,25 50,25 50, 50" strokeWidth={2} fill="none" strokeDasharray={'5,5'}
                                  stroke={'#555555'}/>
                        </svg>
                    </div>
                    <div
                        className={styles.linkType}
                        style={{background: props.data.connectionType === 'dashed-line' ? '#f4f5fa' : 'transparent'}}
                        onClick={() => props.setData({...props.data, ...{connectionType: 'dashed-line'}})}
                    >
                        <svg width={'50px'} height={'50px'} overflow={'visible'}>
                            <line x1={1} y1={1} x2={50} y2={50} strokeWidth={2} fill="none" strokeDasharray={'5,5'}
                                  stroke={'#555555'}/>
                        </svg>
                    </div>
                    <div
                        className={styles.linkType}
                        style={{background: props.data.connectionType === 'strong-line' ? '#f4f5fa' : 'transparent'}}
                        onClick={() => props.setData({...props.data, ...{connectionType: 'strong-line'}})}
                    >
                        <svg width={'50px'} height={'50px'} overflow={'visible'}>
                            <line x1={1} y1={1} x2={50} y2={50} strokeWidth={2} fill="none" stroke={'#555555'}/>
                        </svg>
                    </div>
                </div>
            </Elements>
            <Elements {...props} label={'Passos:'}>
                <div className={styles.shapes}>
                    <div
                        className={styles.stepRounded}
                        draggable={true}
                        onDragStart={() => props.onDragStart('step-rounded')}
                    />
                    <div
                        className={styles.stepRect}
                        draggable={true}
                        onDragStart={() => props.onDragStart('step-rect')}
                    />
                </div>
            </Elements>
        </div>
    )

}

Shapes.propTypes = {
    onDragStart: PropTypes.func,
    setData: PropTypes.func,
    data: PropTypes.object
}