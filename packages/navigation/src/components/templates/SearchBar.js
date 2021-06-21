import styles from '../styles/SearchBar.module.css'
import PropTypes from 'prop-types'
import React from 'react'
import {SearchRounded} from "@material-ui/icons";

export default function SearchBar(props) {
    return (
        <div className={styles.fieldsContainer}>
            <button className={styles.searchButtonContainer}>
                <SearchRounded/>
            </button>
            <input
                placeholder={props.lang.search}
                value={props.searchInput}
                className={styles.inputContainer}
                onChange={props.setSearchInput}
            />
        </div>
    )
}

SearchBar.propTypes = {
    lang: PropTypes.object,
    setSearchInput: PropTypes.func,
    searchInput: PropTypes.string,
}