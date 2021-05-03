import PropTypes from 'prop-types'
import mainStyles from '../../styles/shared/Main.module.css'
import animations from '../../styles/shared/Animations.module.css'
import React, {useState} from "react";
import {Button, createMuiTheme, ThemeProvider} from "@material-ui/core";
import {CheckRounded} from "@material-ui/icons";

export default function ActiveFiltersComponent(props) {

    return (

        <div className={mainStyles.displayWarp}
             style={{gap: '16px', width: '75%', marginTop: '10px'}}>
            <Button onClick={() => props.applyChanges()} style={{
                backgroundColor: '#0095ff',
                color: 'white',
                display: props.changed ? null : 'none'
            }} variant={"contained"}>
                <CheckRounded/>
            </Button>
            {props.activeFilters.map((filter, index) => {
                if (filter.value !== null)
                    return (
                        <div
                            key={filter.key + '-filter-' + index}
                            className={[animations.popInAnimation, mainStyles.overflowEllipsis, mainStyles.displayInlineCenter].join(' ')}
                            style={{
                                backgroundColor: 'black',
                                width: 'calc(12.5% - 16px)',
                                animationDelay: index * 10 + 'ms',
                                borderRadius: '5px',
                                boxShadow: 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px',
                                height: '37px',
                                cursor: filter.disabled ? null : 'pointer',
                                fontSize: '.8rem',
                                textTransform: 'uppercase',
                                fontWeight: '550',
                                color: 'white',
                            }}
                            onClick={() => {
                                if (!filter.disabled) {
                                    if (filter.type !== 'text')
                                        props.handleChange({name: filter.key, value: undefined})
                                    else
                                        props.handleChange({name: filter.key, value: ''})

                                    props.setChanged(true)
                                }
                            }}>
                            {filter.value}
                        </div>
                    )
                else
                    return null
            })}

        </div>)
}

ActiveFiltersComponent.propTypes = {
    activeFilters: PropTypes.array,
    active: PropTypes.bool,
    handleChange: PropTypes.func,
    applyChanges: PropTypes.func,
    changed: PropTypes.bool,
    setChanged: PropTypes.func
}