import PropTypes from 'prop-types'
import styles from "../../styles/index/Index.module.css";
import {
    Button,
    Checkbox,
    Divider,
    FormControl,
    FormControlLabel, FormGroup, FormLabel,
    IconButton,
    InputBase,
    Menu,
    Paper,
    Radio,
    RadioGroup, ThemeProvider
} from "@material-ui/core";
import {searchFieldStyle} from "../../styles/shared/BarMaterialStyles";
import {BackspaceRounded, MenuRounded, SearchRounded} from "@material-ui/icons";
import React, {useEffect, useState} from "react";
import {getBorder, getBoxShadow, getSecondaryBackground, getTertiaryBackground} from "../../styles/shared/MainStyles";
import mainStyles from '../../styles/shared/Main.module.css'
import shared from "../../styles/shared/Shared.module.css";
import fetchActivityData from "../../utils/activity/FetchData";
import InputLayout from "../shared/layout/InputLayout";

export default function IndexComponent(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [hovered, setHovered] = useState(false)

    useEffect(() => {
        props.setSearchInput('')
        props.setMaxID(null)
        props.setData([])
        props.fetchData(1, true)
    }, [props.option])

    return (

        <div className={mainStyles.displayInlineSpaced} key={'index-filter-component'} style={{
            height: '5vh',
            display: 'flex',
            width: props.width + 'vw',
            alignItems: 'center',
            textTransform: 'uppercase'
        }}>

            <Paper component="form"
                   onMouseEnter={() => setHovered(true)}
                   onMouseLeave={() => setHovered(false)}
                   style={{
                       ...getSecondaryBackground({dark: props.dark}),
                       ...searchFieldStyle,
                   }}>

                <IconButton aria-controls="menu" aria-haspopup="true"
                            onClick={event => setAnchorEl(event.currentTarget)}>
                    <MenuRounded style={{color: props.dark ? 'white' : null}}/>
                </IconButton>
                <Menu id="menu" anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={() => setAnchorEl(null)}>
                    <FormControl component="fieldset" style={{paddingLeft: '10px'}}>
                        <RadioGroup onChange={event =>
                            props.setOption(event.target.value)
                        } value={props.option}>
                            {props.lang.filterChoice.map((choice, index) => (
                                <div key={'choice-' + index}>
                                    <FormControlLabel value={choice.key} control={<Radio/>} label={choice.value}/>
                                </div>
                            ))}

                        </RadioGroup>
                    </FormControl>
                </Menu>
                <InputBase
                    style={{width: '85%', marginLeft: '10px'}}
                    placeholder={props.lang.search}
                    value={props.searchInput}
                    onKeyDown={key => {
                        if (key.key === 'Enter')
                            key.preventDefault()
                    }}
                    onChange={event => props.setSearchInput(event.target.value)}
                />
                <IconButton aria-label={props.lang.search} onClick={() => props.fetchData(1, true)}

                            disabled={props.searchInput === null || props.searchInput.length === 0}>
                    <SearchRounded/>
                </IconButton>
                <Divider orientation={'vertical'} style={{height: '70%'}}/>
                <IconButton aria-label={props.lang.search}
                            disabled={props.searchInput === null || props.searchInput.length === 0}
                            onClick={() => {
                                props.setSearchInput('')
                                props.setMaxID(null)
                                props.fetchData(1, true, false)
                            }}>
                    <BackspaceRounded/>
                </IconButton>
            </Paper>
        </div>
    )
}

IndexComponent.propTypes = {
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