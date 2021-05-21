import PropTypes from 'prop-types'
import {ButtonBase, InputBase, Paper} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import mainStyles from '../../styles/shared/Main.module.css'
import {CloseRounded, SearchRounded} from "@material-ui/icons";
import shared from '../../styles/shared/Shared.module.css'
export default function SearchBox(props) {
    const [focused, setFocused] = useState(false)
    const [hovered, setHovered] = useState(false)
    const [searchHovered, setSearchHovered] = useState(false)
    const [closeHovered, setCloseHovered] = useState(false)

    useEffect(() => {
        if(props.searchInput.length === 0)
            props.applyChanges()
    }, [props.searchInput])

    return (
        <div style={{height: '56px', width: '50%', margin: 'auto'}}>

            <Paper component="form"

                   onMouseEnter={() => setHovered(true)}
                   onMouseLeave={() => setHovered(false)}
            className={shared.rowContainer}
                   style={{
                       display: 'flex',
                       justifyContent: 'space-around',
                       alignItems: 'center',
                       boxShadow: hovered || focused ? '0 0 4px 2px #0095ff' : 'unset',
                       borderRadius: '8px',

                       backgroundColor: '#f4f5fa',
                       marginLeft: 'auto',

                   }}
            >

                <ButtonBase
                    onMouseEnter={() => setSearchHovered(true)}
                    onMouseLeave={() => setSearchHovered(false)}
                    onClick={() => props.applyChanges()} style={{
                    width: '40px',
                    height: '100%'
                }} className={mainStyles.displayInlineCenter}>
                    <SearchRounded style={{
                        color: searchHovered ? '#0095ff' : '#777777',
                        transition: '300ms ease-in-out'
                    }}/>
                </ButtonBase>
                {/*<Divider orientation={'vertical'}/>*/}
                <InputBase
                    style={{
                        width: 'calc(100% - 10px)',
                        marginLeft: '10px',
                    }}
                    placeholder={props.searchLocale}
                    value={props.searchInput}
                    onKeyDown={key => {
                        if (key.key === 'Enter') {
                            props.applyChanges()
                            key.preventDefault()
                        }
                    }}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    onChange={event => {

                        props.setSearchInput(event.target.value)
                    }}
                />
                {/*<Divider orientation={'vertical'} />*/}
                <ButtonBase
                    onMouseEnter={() => setCloseHovered(true)}
                    onMouseLeave={() => setCloseHovered(false)}
                    style={{
                        width: '56px',
                        height: '100%',
                    }}
                    className={mainStyles.displayInlineCenter}
                    onClick={() => {
                        props.setSearchInput('')
                    }}>
                    <CloseRounded
                        style={{color: closeHovered ? '#ff5555' : '#777777', display: 'initial'}}/>
                </ButtonBase>
            </Paper>

        </div>
    )
}

SearchBox.propTypes = {
    searchLocale: PropTypes.string,
    setSearchInput: PropTypes.func,
    searchInput: PropTypes.string,

    applyChanges: PropTypes.func
}