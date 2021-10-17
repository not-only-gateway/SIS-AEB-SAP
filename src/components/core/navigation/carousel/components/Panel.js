import styles from '../styles/Panel.module.css'
import PropTypes from "prop-types";

export default function Panel(props) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.image}>
                <img src={props.data.image} alt={props.data.title} style={{width: '100%'}}/>
            </div>
            <div className={styles.title}>
                {props.data.title}
                <div className={[styles.description, styles.overflow].join(' ')}>
                    {props.data.details}
                </div>
            </div>
        </div>
    )
}
Panel.propTypes = {
    data: PropTypes.shape({
        image: PropTypes.string,
        title: PropTypes.string,
        details: PropTypes.string,
        onClick: PropTypes.func
    })
}