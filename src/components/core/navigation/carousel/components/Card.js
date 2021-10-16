import styles from '../styles/Card.module.css'
import PropTypes from "prop-types";
import {useEffect, useRef, useState} from "react";

export default function Card(props) {
    const ref = useRef()
    const [width, setWidth] = useState(0)
    useEffect(() => {
        setWidth(ref.current.parentNode.offsetWidth * (12.5 / 100))
    }, [])
    return (
        <div className={[styles.cardWrapper, props.currentOnRender ? styles.onRender : ''].join(' ')} ref={ref}
             style={{minWidth: width + 'px'}} onDoubleClick={() => props.data.onClick()}
             onClick={() => props.onClick()}>
            <div className={styles.cardHeader}>
                <div className={styles.cardHeaderBackground}/>
                <div className={[styles.overflow, styles.cardTitle].join(' ')}>
                    {props.data.title}
                </div>
                <div className={[styles.cardDescription, styles.overflow].join(' ')}>
                    {props.data.details}
                </div>

            </div>
            <img src={props.data.image} alt={props.data.title} className={styles.cardImage}/>
        </div>
    )
}
Card.propTypes = {
    data: PropTypes.shape({
        image: PropTypes.string,
        title: PropTypes.string,
        details: PropTypes.string,
        onClick: PropTypes.func,
    }),
    currentOnRender: PropTypes.bool,
    onClick: PropTypes.func
}