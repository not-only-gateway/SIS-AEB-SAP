import PropTypes from 'prop-types'
import mainStyles from '../../styles/shared/Main.module.css'
import React from "react";
import {IconButton} from "@material-ui/core";
import {ClearRounded} from "@material-ui/icons";


export default function FiltersComponent(props) {

    return (

        <div className={mainStyles.displayWarp}
             style={{gap: '16px', width: '100%', height: 'auto', paddingBottom: '8px', paddingTop: '8px'}}>

            {props.activeFilters.map((filter, index) => {
                if (filter.value !== null)
                    return (
                        <div
                            key={filter.key + '-filter-' + index}
                            style={{
                                backgroundColor: '#f4f5fa',
                                width: 'clamp(50px, calc(25% - 12px), 150px)',
                                animationDelay: index * 10 + 'ms',
                                borderRadius: '32px',

                                border : '#ecedf2 .7px solid',
                                height: '37px',
                                fontSize: '.8rem',
                                textTransform: 'uppercase',
                                fontWeight: '550',

                                padding: '0 0px 0 8px',
                                display: props.changed ? 'none' : 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',

                            }}

                        >
                            <span className={mainStyles.overflowEllipsis} style={{
                                color: '#262626',
                                maxWidth: '78%',
                            }}>
                                {filter.value}
                            </span>
                            <IconButton disabled={filter.disabled}
                                        style={{padding: '8px'}}
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

FiltersComponent.propTypes ={
    activeFilters: PropTypes.array,
    active: PropTypes.bool,
    handleChange: PropTypes.func,
    applyChanges: PropTypes.func,
}