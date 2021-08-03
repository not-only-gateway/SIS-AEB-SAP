import styles from '../../../styles/Shapes.module.css'
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
                        onDragStart={() => props.onDragStart('square')}
                    >
                        <svg overflow={'hidden'} width={'45'} height={'45'}>
                            <rect fill={'transparent'} width={45} height={45} stroke={"#333333"} strokeWidth={'1'}/>
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
                        onDragStart={() => props.onDragStart('ellipse')}
                    >
                        <svg overflow={'hidden'} width={'71.5'} height={'41.5'}>

                            <ellipse cx={'36'} cy={'21'} rx={'35'} ry={'20'} stroke={'#333333'} fill={'transparent'}/>
                        </svg>
                    </div>
                    {/*<div*/}
                    {/*    className={styles.shapeContainer}*/}
                    {/*    draggable={true}*/}
                    {/*    onDragStart={() => props.onDragStart('trapezoid')}*/}
                    {/*>*/}
                    {/*    <svg overflow={'visible'} width={'80'} height={'80'}>*/}

                    {/*        <path d={'M0,0 L 10,45 35,45 45,0 Z'} stroke={'#333333'} fill={'transparent'}/>*/}
                    {/*    </svg>*/}
                    {/*</div>*/}
                    <div
                        className={styles.shapeContainer}
                        draggable={true}
                        onDragStart={() => props.onDragStart('trapezoid')}
                    >
                        <svg overflow={'visible'} width={'90'} height={'45'}>
                            <polygon points={'90,40 0,40 20,0, 70,0'} stroke={'#333333'} strokeWidth={2} fill={'transparent'}/>
                        </svg>
                    </div>
                    <div
                        className={styles.shapeContainer}
                        draggable={true}
                        onDragStart={() => props.onDragStart('parallelogram')}
                    >
                        <svg overflow={'visible'} width={'90'} height={'45'}>
                            <rect x="0" y="0" width="90" height="40" fill={'none'} stroke={'#333333'} strokeWidth={2} transform="skewX(-25)" />
                        </svg>
                    </div>
                    <div
                        className={styles.shapeContainer}
                        draggable={true}
                        onDragStart={() => props.onDragStart('triangle')}
                    >
                        <svg overflow={'visible'} width={'45'} height={'45'}>
                            <polygon points={'40,40 0,40 20,0'} stroke={'#333333'} strokeWidth={2} fill={'transparent'}/>
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

        </div>
    )

}

Shapes.propTypes = {
    onDragStart: PropTypes.func,
    setData: PropTypes.func,
    data: PropTypes.object
}