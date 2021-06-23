import React from 'react'
import styles from '../styles/SearchBar.module.css'
import animations from '../styles/Animations.module.css'
import PropTypes from 'prop-types'
import {ClearRounded, SearchRounded} from "@material-ui/icons";

export default function SearchBar(props) {
    return (
        <div className={styles.fieldsContainer}>
            <button className={styles.searchButtonContainer} onClick={() => props.applySearch()}>
                <SearchRounded/>
            </button>
            <input
                onKeyDown={key => {
                    if (key.keyCode === 13)
                        props.applySearch()
                }}
                placeholder={props.lang.search}
                value={props.searchInput}
                className={styles.inputContainer}
                onChange={event => props.setSearchInput(event.target.value)}
            />
            {props.searchInput === undefined || props.searchInput === null || props.searchInput.length === 0 ?
                null
                :
                <button className={[styles.searchButtonContainer, animations.fadeIn].join(' ')}
                        style={{paddingRight: '8px', color: '#ff5555'}}
                        onClick={() => {
                            props.setSearchInput('')
                        }}>
                    <ClearRounded/>
                </button>
            }
        </div>
    )
}

SearchBar.propTypes = {
    applySearch: PropTypes.func,
    lang: PropTypes.object,
    setSearchInput: PropTypes.func,
    searchInput: PropTypes.string,
    clearSearch: PropTypes.func
}
