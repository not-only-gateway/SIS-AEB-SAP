import styles from '../../styles/ActiveFilters.module.css'
import {AddRounded, CloseRounded} from "@material-ui/icons";
import PropTypes from 'prop-types'
import ToolTip from "../../../../tooltip/ToolTip";

export default function ActiveFilters(props) {
    return (
        <div className={styles.activeFiltersContainer}>
            <button className={styles.filter} onClick={() => props.setOpenFilters(true)}>
                <AddRounded/>
                <div className={styles.overflow}>
                    Adicionar filtro
                </div>
            </button>
            {
                props.filters.map(e => (
                    <div className={[styles.filter, styles.notActive].join(' ')}>
                        {/*<div className={styles.overflow} style={{fontSize: '.75rem'}}>*/}
                        {/*    {e.label}:*/}
                        {/*</div>*/}
                        <div className={styles.overflow} style={{fontWeight: 'normal', fontSize: '.75rem'}}>
                            {e.type === 'date' ? new Date(e.value).toDateString() : e.value}
                        </div>
                        <ToolTip>
                            <div className={styles.overflow} style={{fontSize: '.75rem'}}>
                                {e.label}:
                            </div>
                            <div className={styles.overflow} style={{fontWeight: 'normal', fontSize: '.75rem'}}>
                                {e.type === 'date' ? new Date(e.value).toDateString() : e.value}
                            </div>

                        </ToolTip>
                        <button className={[styles.filter, styles.removeButton].join(' ')}>
                            <CloseRounded style={{fontSize: '1.1rem'}}/>
                        </button>
                    </div>
                ))
            }
        </div>
    )
}

ActiveFilters.propTypes = {
    setOpenFilters: PropTypes.func,
    filters: PropTypes.array
}