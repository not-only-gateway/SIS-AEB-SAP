import PropTypes from "prop-types";
import styles from './styles/Loader.module.css'

export default function Loader(props) {
    return (
        <div style={{display: props.loading ? undefined : 'none'}} className={styles.wrapper}>
            <div className={styles.loading}/>
        </div>
    )
}
Loader.propTypes = {
    loading: PropTypes.bool
}