import PropTypes from 'prop-types'
import {InputBase, Paper} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import mainStyles from '../../styles/shared/Main.module.css'
import {SearchRounded} from "@material-ui/icons";

export default function SearchBox(props) {
    const [focused, setFocused] = useState(false)
    const [hovered, setHovered] = useState(false)

    return (

        <div key={'index-simple-filter-component'} className={mainStyles.displayInlineSpaced}
             style={{height: '56px', width: '100%'}}>

            <Paper component="form"
                   onFocus={() => setFocused(true)}
                   onBlur={() => setFocused(false)}
                   onMouseEnter={() => setHovered(true)}
                   onMouseLeave={() => setHovered(false)}
                   style={{
                       display: 'flex',
                       justifyContent: 'space-around',
                       alignItems: 'center',
                       boxShadow: focused || hovered ? 'rgba(0, 0, 0, 0.1) 0 4px 6px -1px, rgba(0,0,0,0.06) 0 2px 4px -1px' : 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px',
                       border: focused ? 'hsla(210, 11%, 78%, 0.5)  .7px solid' : 'transparent .7px solid',
                       width: '100%',
                       borderRadius: '8px',
                       height: '100%',
                       transition: '300ms ease-in-out',
                       backgroundColor: 'white'
                   }}>

                <div style={{width: '50px', marginLeft: '5px', height: '100%'}} className={mainStyles.displayInlineCenter}>
                    <SearchRounded style={{color: '#777777'}}/>
                </div>
                <InputBase
                    style={{width: 'calc(100% - 60px)', marginLeft: 'auto'}}
                    placeholder={props.searchLocale}
                    value={props.searchInput}

                    onKeyDown={key => {
                        if (key.key === 'Enter')
                            key.preventDefault()
                    }}
                    onChange={event => {
                        props.setChanged(true)
                        props.setSearchInput(event.target.value)
                    }}
                />
            </Paper>

        </div>
    )
}

SearchBox.propTypes = {
    searchLocale: PropTypes.object,
    setSearchInput: PropTypes.func,
    searchInput: PropTypes.string,
    setChanged: PropTypes.func
}