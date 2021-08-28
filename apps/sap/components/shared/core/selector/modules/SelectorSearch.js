import React from 'react'
import styles from '../styles/Selector.module.css'

import PropTypes from 'prop-types'
import {ClearRounded, SearchRounded} from "@material-ui/icons";
import SelectorsPT from "../locales/SelectorsPT";

export default function SelectorSearch(props) {
    const lang = SelectorsPT
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
                placeholder={lang.search}
                value={props.searchInput}
                className={styles.inputContainer}
                onChange={event => props.setSearchInput(event.target.value)}
            />
            {props.searchInput === undefined || props.searchInput === null || props.searchInput.length === 0 ?
                null
                :
                <button className={styles.searchButtonContainer}
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

SelectorSearch.propTypes = {
    applySearch: PropTypes.func,
    lang: PropTypes.object,
    setSearchInput: PropTypes.func,
    searchInput: PropTypes.string,
    clearSearch: PropTypes.func
}
