import styles from '../../styles/ActiveFilters.module.css'
import {AddRounded} from "@material-ui/icons";
import PropTypes from 'prop-types'
export default function ActiveFilters(props){
    return (
        <div className={styles.activeFiltersContainer}>
            <button className={styles.addFilterButton} onClick={() => props.setOpenFilters(true)}>
                <AddRounded/> Adicionar filtro
            </button>
        </div>
    )
}

ActiveFilters.propTypes={
    setOpenFilters: PropTypes.func
}