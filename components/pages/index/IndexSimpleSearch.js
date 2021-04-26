import PropTypes from 'prop-types'
import {
    Button,
    Divider,
    FormControl,
    FormControlLabel,
    IconButton,
    InputBase,
    Menu,
    Paper,
    Radio,
    RadioGroup
} from "@material-ui/core";
import {searchFieldStyle} from "../../../styles/shared/BarMaterialStyles";
import {BackspaceRounded, MenuRounded, SearchRounded} from "@material-ui/icons";
import React, {useEffect, useState} from "react";
import {getSecondaryBackground} from "../../../styles/shared/MainStyles";
import mainStyles from '../../../styles/shared/Main.module.css'

export default function IndexSimpleSearch(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [focused, setFocused] = useState(false)

    useEffect(() => {
        props.setSearchInput('')
        props.setMaxID(null)
        props.setData([])
        props.fetchData(1, true)
    }, [props.option])

    return (

        <div key={'index-simple-filter-component'} className={mainStyles.displayInlineSpaced} style={{height: '55px', gap: '10px'}}>

            <Paper component="form"

                   style={{
                       display: 'flex',
                       justifyContent: 'space-around',
                       alignItems: 'center',
                       boxShadow: focused ? 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' : 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px',
                       width: '100%',
                       borderRadius: '8px',
                       height: '100%'
                   }}>

                {/*<IconButton aria-controls="menu" aria-haspopup="true"*/}
                {/*            onClick={event => setAnchorEl(event.currentTarget)}>*/}
                {/*    <MenuRounded style={{color: props.dark ? 'white' : null}}/>*/}
                {/*</IconButton>*/}
                {/*<Menu id="menu" anchorEl={anchorEl}*/}
                {/*      keepMounted*/}
                {/*      open={Boolean(anchorEl)}*/}
                {/*      onClose={() => setAnchorEl(null)}>*/}
                {/*    <FormControl component="fieldset" style={{paddingLeft: '10px'}}>*/}
                {/*        <RadioGroup onChange={event =>*/}
                {/*            props.setOption(event.target.value)*/}
                {/*        } value={props.option}>*/}
                {/*            {props.lang.filterChoice.map((choice, index) => (*/}
                {/*                <div key={'choice-' + index}>*/}
                {/*                    <FormControlLabel value={choice.key} control={<Radio/>} label={choice.value}/>*/}
                {/*                </div>*/}
                {/*            ))}*/}

                {/*        </RadioGroup>*/}
                {/*    </FormControl>*/}
                {/*</Menu>*/}
                <InputBase
                    style={{width: '98%'}}
                    placeholder={props.lang.search}
                    value={props.searchInput}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    onKeyDown={key => {
                        if (key.key === 'Enter')
                            key.preventDefault()
                    }}
                    onChange={event => props.setSearchInput(event.target.value)}
                />
                {/*<Divider orientation={'vertical'} style={{height: '70%'}}/>*/}
                {/*<IconButton aria-label={props.lang.search}*/}
                {/*            disabled={props.searchInput === null || props.searchInput.length === 0}*/}
                {/*            onClick={() => {*/}
                {/*                props.setSearchInput('')*/}
                {/*                props.setMaxID(null)*/}
                {/*                props.fetchData(1, true, false)*/}
                {/*            }}>*/}
                {/*    <BackspaceRounded/>*/}
                {/*</IconButton>*/}
            </Paper>
            <Button onClick={() => props.fetchData(1, true)} style={{width: '55px', color:props.searchInput.length === 0 ? null : 'white' ,backgroundColor: props.searchInput.length === 0 ? null : 'black', borderRadius: '8px', height: '100%'}} disabled={props.searchInput.length === 0}>
                <SearchRounded/>
            </Button>
        </div>
    )
}

IndexSimpleSearch.propTypes = {
    width: PropTypes.number,
    dark: PropTypes.bool,
    option: PropTypes.string,
    setOption: PropTypes.func,
    lang: PropTypes.object,
    setData: PropTypes.func,
    setSearchInput: PropTypes.func,
    searchInput: PropTypes.string,
    fetchData: PropTypes.func,
    setMaxID: PropTypes.func
}