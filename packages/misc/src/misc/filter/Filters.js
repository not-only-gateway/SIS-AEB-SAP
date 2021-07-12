import PropTypes from 'prop-types'
import styles from './styles/Filter.module.css'
import React from "react";
import {IconButton} from "@material-ui/core";
import {ClearRounded} from "@material-ui/icons";


export default function Filters(props) {
    return (
        <div className={styles.displayWarp}
             style={{gap: '16px', width: '100%', height: 'auto', paddingBottom: '8px', paddingTop: '8px'}}>

            {props.activeFilters.map((filter, index) => {
                if (filter.value !== null)
                    return (
                        <div
                            key={filter.key + '-filter-' + index}
                            className={styles.filterContainer} style={{display: props.changed ? 'none' : 'flex'}}
                        >
                            <span className={styles.overflowEllipsis} style={{
                                color: '#262626',
                                maxWidth: '78%',
                            }}>
                                {filter.value}
                            </span>
                            <IconButton disabled={filter.disabled}
                                        style={{padding: '8px', visibility: filter.disabled ? 'hidden' : 'visible'}}
                                        onClick={() => {
                                            if (filter.type !== 'text') {
                                                props.handleChange({name: filter.key, value: undefined})
                                                props.applyChanges()
                                            }
                                            else {
                                                props.handleChange({name: filter.key, value: ''})
                                                props.applyChanges()
                                            }
                                        }}>
                                <ClearRounded style={{fontSize: '1.3rem', color: '#777777'}}/>
                            </IconButton>
                        </div>
                    )
                else
                    return null
            })}

        </div>)
}

Filters.propTypes ={
    activeFilters: PropTypes.array,
    active: PropTypes.bool,
    handleChange: PropTypes.func,
    applyChanges: PropTypes.func,
}
