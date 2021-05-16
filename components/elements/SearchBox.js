import PropTypes from 'prop-types'
import {Button, ButtonBase, Divider, InputBase, Paper} from "@material-ui/core";
import React, {useState} from "react";
import mainStyles from '../../styles/shared/Main.module.css'
import {ArrowBackIosRounded, CloseRounded, SearchRounded} from "@material-ui/icons";

export default function SearchBox(props) {
    const [focused, setFocused] = useState(false)
    const [hovered, setHovered] = useState(false)
    const [reduced, setReduced] = useState(true)
    const [searchHovered, setSearchHovered] = useState(false)
    const [closeHovered, setCloseHovered] = useState(false)

    return (
        <div key={'index-simple-filter-component'} className={mainStyles.displayInlineSpaced}
             style={{height: '56px', width: reduced ? '50px' : '50%'}}>

            <Paper component="form"

                   onMouseEnter={() => setHovered(true)}
                   onMouseLeave={() => setHovered(false)}
                   style={{
                       display: 'flex',
                       justifyContent: 'space-around',
                       alignItems: 'center',
                       boxShadow: 'unset',
                       border: focused || !reduced ? '#ecedf2 .7px solid' : 'transparent .7px solid',
                       width: '100%',
                       borderRadius: '8px',
                       height: reduced ? '50px' : '100%',
                       transition: '300ms ease-in-out',
                       backgroundColor: !focused ? 'white' : '#f4f5fa',
                       marginLeft: 'auto'
                   }}>

                <ButtonBase
                    onMouseEnter={() => setSearchHovered(true)}
                    onMouseLeave={() => setSearchHovered(false)}
                    onClick={() => {
                        if (reduced)
                            setReduced(!reduced)
                        else {
                            props.applyChanges()
                        }
                    }} style={{
                    width: reduced ? '100%' : '50px',
                    height: '100%'
                }} className={mainStyles.displayInlineCenter}>
                    <SearchRounded style={{
                        color: searchHovered ? '#0095ff' : '#777777',
                        transition: '300ms ease-in-out'
                    }}/>
                </ButtonBase>
                <Divider orientation={'vertical'} style={{display: reduced ? 'none' : 'initial'}}/>
                <InputBase
                    style={{
                        width: 'calc(100% - 100px)',
                        marginLeft: reduced ? 'unset' : '10px',
                        visibility: reduced ? 'hidden' : 'visible',
                        transition: 'visibility 300ms ease-in',
                    }}
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
                <Divider orientation={'vertical'} style={{display: reduced ? 'none' : 'initial'}}/>
                <ButtonBase
                    onMouseEnter={() => setCloseHovered(true)}
                    onMouseLeave={() => setCloseHovered(false)}
                    style={{
                        width: reduced ? '100%' : '50px',
                        height: '100%',
                        display: reduced ? 'none' : 'initial',
                    }}
                    className={mainStyles.displayInlineCenter}
                    onClick={() => {
                        props.setSearchInput('')
                        props.applyChanges()
                        setReduced(true)

                    }}>
                    <CloseRounded
                        style={{color: closeHovered ? '#ff5555' : '#777777', display: reduced ? 'none' : 'initial'}}/>
                </ButtonBase>
            </Paper>

        </div>
    )
}

SearchBox.propTypes = {
    searchLocale: PropTypes.string,
    setSearchInput: PropTypes.func,
    searchInput: PropTypes.string,
    setChanged: PropTypes.func,
    applyChanges: PropTypes.func
}