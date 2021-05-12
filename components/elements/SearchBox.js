import PropTypes from 'prop-types'
import {ButtonBase, Divider, InputBase, Paper} from "@material-ui/core";
import React, {useState} from "react";
import mainStyles from '../../styles/shared/Main.module.css'
import {ArrowBackIosRounded, SearchRounded} from "@material-ui/icons";

export default function SearchBox(props) {
    const [focused, setFocused] = useState(false)
    const [hovered, setHovered] = useState(false)
    const [reduced, setReduced] = useState(true)

    return (
        <div key={'index-simple-filter-component'} className={mainStyles.displayInlineSpaced}
             style={{height: '56px', width: reduced ? 'fit-content' : '50%'}}>

            <Paper component="form"

                   onMouseEnter={() => setHovered(true)}
                   onMouseLeave={() => setHovered(false)}
                   style={{
                       display: 'flex',
                       justifyContent: 'space-around',
                       alignItems: 'center',
                       boxShadow: focused ? 'rgba(0, 0, 0, 0.1) 0 4px 6px -1px, rgba(0,0,0,0.06) 0 2px 4px -1px' :  !reduced ? 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px': 'unset',
                       border:  !reduced ? '#0095ff  .7px solid' : 'transparent .7px solid',
                       width: reduced ? '50px' : '100%',
                       borderRadius: '8px',
                       height: reduced ? '50px' : '100%',
                       transition: '300ms ease-in-out',
                       backgroundColor: !reduced ? 'white' : 'transparent', marginLeft: 'auto'
                   }}>

                <ButtonBase onClick={() => setReduced(!reduced)} style={{
                    width: '50px',
                    height: '50px',
                    borderRadius:'8px',

                }} className={mainStyles.displayInlineCenter}>
                    <SearchRounded style={{color: '#777777', display: reduced ? 'initial' : 'none'}}/>
                    <ArrowBackIosRounded style={{color: '#777777', display: reduced ? 'none' : 'initial', transform: 'rotate(180deg)'}}/>
                </ButtonBase>
                <Divider orientation={'vertical'} style={{display: reduced ? 'none' : 'initial'}}/>
                <InputBase
                    style={{width: 'calc(100% - 60px)', marginLeft: 'auto',  visibility: reduced ? 'hidden' : 'visible',transition: 'visibility 50ms ease-in',}}
                    placeholder={props.searchLocale}
                    value={props.searchInput}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
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
    searchLocale: PropTypes.string,
    setSearchInput: PropTypes.func,
    searchInput: PropTypes.string,
    setChanged: PropTypes.func
}