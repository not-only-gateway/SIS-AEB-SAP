import PropTypes from "prop-types";
import styles from '../styles/Frame.module.css'

export default function Header(props) {
    return (
        <div className={styles.header}>
            <div className={styles.headerContent}>
                <div style={{fontSize: '1.5rem'}}>
                    {props.title}
                </div>
                <div style={{fontSize: '.9rem', color: '#777777'}}>
                    {props.description}
                </div>
            </div>
        </div>
    )
}
Header.propTypes = {

    title: PropTypes.string,
    description: PropTypes.string,
    collaborators: PropTypes.arrayOf(
        PropTypes.object
    )

}