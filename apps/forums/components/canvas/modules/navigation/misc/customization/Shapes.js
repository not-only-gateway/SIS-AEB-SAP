import styles from '../../styles/Shapes.module.css'
import PropTypes from 'prop-types'
import Elements from "../Elements";
import DragNew from "../../../../methods/move/DragNew";

export default function Shapes(props) {
    const drag = (event, shape) => {
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

        <Elements {...props} label={'Fluxograma:'}>
            <div className={styles.shapes}>
                <div
                    className={styles.shapeContainer}
                    id={'rect-draggable'}
                    onMouseDown={event => drag(event, 'rect')}
                >
                    <svg overflow={'visible'} width={'100%'} height={'45px'} viewBox={'0 0 200 100'}>
                        <rect fill={'white'} x={0} y={0} width={'100%'} height={'100%'} stroke={"#0095ff"}
                              strokeWidth={2} vectorEffect="non-scaling-stroke"/>
                    </svg>
                    Rect
                </div>
                <div
                    className={styles.shapeContainer}
                    id={'square-draggable'}
                    onMouseDown={event => drag(event, 'square')}
                >
                    <svg overflow={'visible'} width={'45px'} height={'45px'} viewBox={'0 0 100 100'}>
                        <rect fill={'white'} width={'100%'} height={'100%'} stroke={"#0095ff"} strokeWidth={2} vectorEffect="non-scaling-stroke"/>
                    </svg>
                    Square
                </div>

                <div
                    className={styles.shapeContainer}
                    id={'circle-draggable'}
                    onMouseDown={event => drag(event, 'circle')}
                >
                    <svg overflow={'visible'} width={'45px'} height={'45px'} viewBox={'0 0 100 100'}>
                        <circle fill={'white'} cx={'50%'} cy={'50%'} r={'50%'} stroke={"#0095ff"}
                                strokeWidth={2} vectorEffect="non-scaling-stroke"/>
                    </svg>
                    Circle
                </div>
                <div
                    className={styles.shapeContainer}
                    id={'ellipse-draggable'}
                    onMouseDown={event => drag(event, 'ellipse')}
                >
                    <svg overflow={'visible'} width={'100%'} height={'45px'} viewBox={'0 0 200 100'}>

                        <ellipse cx={'50%'} cy={'50%'} rx={'50%'} ry={'50%'} stroke={'#0095ff'} fill={'white'}
                                 strokeWidth={2} vectorEffect="non-scaling-stroke"/>
                    </svg>
                    Ellipse
                </div>

                <div
                    className={styles.shapeContainer}
                    id={'trapezoid-draggable'}
                    onMouseDown={event => drag(event, 'trapezoid')}
                >
                    <svg overflow={'visible'} width={'100%'} height={'45px'} viewBox="0 0 200 100">
                        <polygon points={'200,100 0,100 50,0 150,0'} stroke={'#0095ff'} strokeWidth={'2px'}
                                 vectorEffect="non-scaling-stroke"
                                 fill={'white'}/>
                    </svg>
                    Trapezoid
                </div>
                <div
                    className={styles.shapeContainer}
                    id={'parallelogram-draggable'}
                    onMouseDown={event => drag(event, 'parallelogram')}
                >
                    <svg overflow={'visible'} width={'100%'} height={'45px'} viewBox={'0 0 200 100'}>
                        {/*<polygon points={'50,100 0,0 150,0 200,100'} stroke={'#0095ff'} strokeWidth={'2px'}*/}
                        {/*         vectorEffect="non-scaling-stroke" fill={'white'}/>*/}
                        <polygon points={'0,100 50,0 200,0 150,100'} stroke={'#0095ff'} strokeWidth={'2px'}
                                 vectorEffect="non-scaling-stroke" fill={'white'}/>
                    </svg>
                    <div className={styles.overflowEllipsis}>
                        Parallelogram
                    </div>
                </div>
                <div
                    className={styles.shapeContainer}
                    id={'triangle-draggable'}
                    onMouseDown={event => drag(event, 'triangle')}
                >
                    <svg overflow={'visible'} width={'100%'} height={'45px'} viewBox="0 0 100 100">
                        <polygon points={'100,100 0,100 50,0'} stroke={'#0095ff'} strokeWidth={'2px'}
                                 vectorEffect="non-scaling-stroke" fill={'white'}/>
                    </svg>
                    Triangle
                </div>
            </div>
        </Elements>
    )

}

Shapes.propTypes = {
    setData: PropTypes.func,
    data: PropTypes.object,
    scale: PropTypes.number,
    root: PropTypes.object,
    contextMenuRef: PropTypes.object
}