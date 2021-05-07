import PropTypes from 'prop-types'
import {Button, InputBase, Paper} from "@material-ui/core";
import {SearchRounded} from "@material-ui/icons";
import React, {useState} from "react";
import mainStyles from '../../styles/shared/Main.module.css'

export default function ActivitySearch(props) {
    const [focused, setFocused] = useState(false)
    const [hovered, setHovered] = useState(false)

    return (

        <div key={'activity-simple-filter-component'} className={mainStyles.displayInlineSpaced}
             style={{height: '55px', gap: '10px', width: '40%'}}>

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
                       border: focused || hovered ? '#0095ff .7px solid' : 'hsla(210, 11%, 78%, 0.5)  .7px solid',
                       width: '100%',
                       borderRadius: '8px',
                       height: '100%',
                       transition: '300ms ease-in-out',
                       backgroundColor: hovered ? 'rgba(0,0,0,.03' : 'unset'
                   }}>


                <InputBase
                    style={{width: '98%'}}
                    placeholder={props.lang}
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

ActivitySearch.propTypes = {
    setSearchInput: PropTypes.func,
    searchInput: PropTypes.string,
    fetchData: PropTypes.func,
    lang: PropTypes.string,
    setChanged: PropTypes.func
}