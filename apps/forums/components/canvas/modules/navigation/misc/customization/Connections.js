import Elements from "../Elements";
import styles from "../../styles/Shapes.module.css";
import PropTypes from "prop-types";

export default function Connections(props){
    return(
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

    )
}
Connections.propTypes = {
    setData: PropTypes.func,
    data: PropTypes.object,
}