import PropTypes from 'prop-types'
import styles from '../styles/SearchInput.module.css'
import {SearchRounded} from "@material-ui/icons";

export default function SearchBar(props) {
    return (
        <div className={styles.formContainer} style={{width: props.fullWidth ? '100%' : undefined}}>
            <button disabled={props.searchInput.length === 0} onClick={e => {
                props.applySearch()
            }} className={styles.buttonContainer}>
                <SearchRounded style={{fontSize: '1.3rem'}}/>
            </button>
            <input placeholder={'Pesquisar'} id={'search'} onChange={event => props.setSearchInput(event.target.value)}
                   className={styles.searchInput} style={{width: props.fullWidth ? '100%' : undefined}}/>
        </div>
    )
}
SearchBar.propTypes = {
    fullWidth: PropTypes.bool,
    applySearch: PropTypes.func,
    setSearchInput: PropTypes.func,
    searchInput: PropTypes.string
}