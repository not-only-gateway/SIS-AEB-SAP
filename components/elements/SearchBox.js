import PropTypes from 'prop-types'
import {Button, ButtonBase, Divider, InputBase, Paper} from "@material-ui/core";
import React, {useState} from "react";
import mainStyles from '../../styles/shared/Main.module.css'
import {ArrowBackIosRounded, CloseRounded, SearchRounded} from "@material-ui/icons";

export default function SearchBox(props) {
    const [focused, setFocused] = useState(false)
    const [hovered, setHovered] = useState(false)
    const [searchHovered, setSearchHovered] = useState(false)
    const [closeHovered, setCloseHovered] = useState(false)

    return (
        <div style={{height: '56px', width: '50%', margin: 'auto'}}>

            <Paper component="form"

                   onMouseEnter={() => setHovered(true)}
                   onMouseLeave={() => setHovered(false)}
                   style={{
                       display: 'flex',
                       justifyContent: 'space-around',
                       alignItems: 'center',
                       boxShadow: 'unset',
                       border: focused || hovered ? '#0095ff .7px solid' :  '#ecedf2 .7px solid' ,
                       width: '100%',
                       borderRadius: '8px',
                       height: '100%',
                       transition: '300ms ease-in-out',
                       backgroundColor: '#f4f5fa',
                       marginLeft: 'auto',

                   }}>

                <ButtonBase
                    onMouseEnter={() => setSearchHovered(true)}
                    onMouseLeave={() => setSearchHovered(false)}
                    onClick={() => props.applyChanges()} style={{
                    width: '56px',
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
                        width: 'calc(100% - 112px)',
                        marginLeft: '10px',
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
                        props.applyChanges()
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
    setChanged: PropTypes.func,
    applyChanges: PropTypes.func
}