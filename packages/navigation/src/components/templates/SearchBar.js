import React from 'react'
import styles from '../styles/SearchBar.module.css'
import PropTypes from 'prop-types'
import {SearchRounded} from "@material-ui/icons";

export default function SearchBar(props) {
  return (
    <div className={styles.fieldsContainer}>
      <button className={styles.searchButtonContainer} onClick={() => props.applySearch()}>
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
  applySearch: PropTypes.func,
  lang: PropTypes.object,
  setSearchInput: PropTypes.func,
  searchInput: PropTypes.string,
}
