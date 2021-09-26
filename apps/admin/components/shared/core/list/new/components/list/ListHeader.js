import PropTypes from 'prop-types'
import styles from '../../styles/Header.module.css'
import ActiveFilters from "../filters/ActiveFilters";

export default function ListHeader(props){
    return (
        <div className={styles.container}>
            {props.title}
            <ActiveFilters {...props}/>
        </div>
    )
}

ListHeader.propTypes={
    title: PropTypes.any,
    setOpenFilters: PropTypes.func,
    filters: PropTypes.array
}