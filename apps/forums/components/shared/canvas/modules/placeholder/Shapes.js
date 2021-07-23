import styles from '../../styles/Shapes.module.css'
import {DragIndicatorRounded} from "@material-ui/icons";
import PropTypes from 'prop-types'

export default function Shapes(props) {
    return (
        <>
            <div className={styles.optionsDivider}>
                Formas:
                <div className={styles.divider}/>
            </div>
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
            <div className={styles.optionsDivider}>
                Conexões:
                <div className={styles.divider}/>
            </div>
            <div className={styles.shapes} >
                <div
                    className={styles.linkType}
                    onDragStart={() => props.onDragStart('rect')}
                >
                   <svg width={'50px'} height={'50px'} overflow={'visible'}>
                       <path d="M 0, 0 C0,25 50,25 50, 50" strokeWidth={2} fill="none" stroke={'#555555'}/>
                   </svg>
                </div>
                <div
                    className={styles.linkType}
                    onDragStart={() => props.onDragStart('rect')}
                >
                    <svg width={'50px'} height={'50px'} overflow={'visible'}>
                        <path d="M 0, 0 C0,25 50,25 50, 50" strokeWidth={2} fill="none" strokeDasharray={'5,5'} stroke={'#555555'}/>
                    </svg>
                </div>
                <div
                    className={styles.linkType}
                    onDragStart={() => props.onDragStart('rect')}
                >
                    <svg width={'50px'} height={'50px'} overflow={'visible'}>
                        <line x1={1} y1={1} x2={50} y2={50} strokeWidth={2} fill="none" strokeDasharray={'5,5'} stroke={'#555555'}/>
                    </svg>
                </div>
                <div
                    className={styles.linkType}
                    onDragStart={() => props.onDragStart('rect')}
                >
                    <svg width={'50px'} height={'50px'} overflow={'visible'}>
                        <line x1={1} y1={1} x2={50} y2={50} strokeWidth={2} fill="none" stroke={'#555555'}/>
                    </svg>
                </div>
            </div>
        </>
    )

}

Shapes.propTypes = {
    onDragStart: PropTypes.func
}