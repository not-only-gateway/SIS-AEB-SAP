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
                        className={styles.rect}
                        draggable={true}
                        onDragStart={() => props.onDragStart('rect')}
                    />
                    <div
                        className={styles.circle}
                        draggable={true}
                        onDragStart={() => props.onDragStart('circle')}
                    />
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
                    <div
                        className={styles.stepRhombus}
                        draggable={true}
                        onDragStart={() => props.onDragStart('step-rhombus')}
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