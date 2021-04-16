import PropTypes from 'prop-types'
import styles from "../../styles/index/Index.module.css";
import {
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
import {searchFieldStyle} from "../../styles/shared/BarMaterialStyles";
import {BackspaceRounded, MenuRounded, SearchRounded} from "@material-ui/icons";
import React, {useEffect, useState} from "react";
import {getBorder, getBoxShadow, getTertiaryBackground} from "../../styles/shared/MainStyles";


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
        <div className={styles.paper_container} key={'index-filter-component'}>
            <Paper component="form"
                   onMouseEnter={() => setHovered(true)}
                   onMouseLeave={() => setHovered(false)}
                   elevation={false}
                   style={{
                       ...getTertiaryBackground({dark: props.dark}),
                       ...getBoxShadow({dark: props.dark}),
                       ...getBorder({dark: props.dark, hovered: hovered}),
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
                            {props.lang.filterChoice.map(choice => (
                                <FormControlLabel value={choice.key} control={<Radio/>} label={choice.value}/>
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
                    <SearchRounded />
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