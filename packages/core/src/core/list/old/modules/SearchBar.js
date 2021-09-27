import PropTypes from 'prop-types'
import styles from '../styles/SearchInput.module.css'
import {SearchRounded} from "@material-ui/icons";
import React from 'react'

export default function SearchBar(props) {
    return (
        <div className={styles.formContainer}>
            <button disabled={props.searchInput.length === 0} onClick={() => {
                props.applySearch()
            }} className={styles.buttonContainer}>
                <SearchRounded style={{fontSize: '1.3rem'}}/>
            </button>
            <input placeholder={'Pesquisar'} id={'search'} onChange={event => props.setSearchInput(event.target.value)}
                   className={styles.searchInput}/>
        </div>
    )
}
SearchBar.propTypes = {
    applySearch: PropTypes.func,
    setSearchInput: PropTypes.func,
    searchInput: PropTypes.string
}
