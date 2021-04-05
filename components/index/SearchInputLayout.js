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
import {searchFieldStyle} from "../../styles/bar/BarMaterialStyles";
import {BackspaceRounded, HomeRounded, MenuRounded, SearchRounded} from "@material-ui/icons";
import React, {useEffect, useState} from "react";
import axios from "axios";
import Host from "../../utils/Host";

export default function SearchInputLayout(props) {
    const [search, setSearch] = useState(null)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [hovered, setHovered] = useState(false)
    async function fetchSearch(){
        props.setData([])
        props.setLoading(true)

        await axios({
            method: 'get',
            url: Host() + props.option,
            params: {
                input: search
            }
        }).then(res => {
            props.setData(res.data)
        }).catch(error => {
            console.log(error)
        })

        props.setLoading(false)
    }

    async function fetchData() {
        props.setData([])
        try {
            await axios({
                method: 'get',
                url: Host() + props.option
            }).then(res => {
                console.log("FETCHED DATA -> ")
                console.log(res.data)
                props.setData(res.data)

            }).catch(error => {
                console.log(error)
            })
        } catch (error) {
            console.log(error)
        }
        props.setLoading(false)
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    useEffect(() => {
        fetchData().catch(error => console.log(error))
    }, [props.option])

    return (
        <div className={styles.paper_container}>
            <Paper component="form"
                   onMouseEnter={() => setHovered(true)}
                   onMouseLeave={() => setHovered(false)}
                   style={{
                ...searchFieldStyle, ...{
                    backgroundColor: props.dark ? '#272e38' : '#f4f8fb',
                    boxShadow: !props.dark ? (hovered ? 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' : 'none') :  'none',
                }
            }}>
                <IconButton aria-controls="menu" aria-haspopup="true" onClick={handleClick}>
                    <MenuRounded style={{color: props.dark ? 'white' : null}}/>
                </IconButton>
                <Menu id="menu" anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}>
                    <FormControl component="fieldset" style={{paddingLeft: '10px'}}>
                        <RadioGroup onChange={event => {
                            props.setData([])
                            props.setLoading(true)
                            props.setOption(event.target.value)
                        }} value={props.option}>
                            {props.lang.filterChoice.map(choice =>{
                                if(props.canEdit && choice.key === 'people')
                                    return <FormControlLabel value={choice.key} control={<Radio/>} label={choice.value}/>
                                else if(choice.key !== 'people')
                                    return <FormControlLabel value={choice.key} control={<Radio/>} label={choice.value}/>
                                })}
                        </RadioGroup>
                    </FormControl>
                </Menu>
                <InputBase
                    style={{width: '85%', color: (props.dark ? 'white' : null), marginLeft: '10px'}}
                    placeholder={props.lang.search}
                    value={search}
                    onKeyDown={key => {
                        if(key.key === 'Enter')
                            key.preventDefault()
                    }}
                    onChange={event => setSearch(event.target.value)}
                />
                <IconButton aria-label={props.lang.search} onClick={() => fetchSearch()}

                            disabled={search === null || search.length === 0}>
                    <SearchRounded style={{color: props.dark ? 'white' : null}}/>
                </IconButton>
                <Divider orientation={'vertical'} style={{height: '70%'}}/>
                <IconButton aria-label={props.lang.search} disabled={search === null || search.length === 0 } onClick={() => {
                    props.setData([])
                    props.setLoading(true)
                    setSearch('')
                    fetchData().catch(error => console.log(error))
                }}>
                    <BackspaceRounded style={{color: props.dark ? 'white' : null}}/>
                </IconButton>
            </Paper>
        </div>
    )
}

SearchInputLayout.propTypes = {
    dark: PropTypes.bool,
    option: PropTypes.string,
    setValue: PropTypes.func,
    initialOption: PropTypes.number,
    setOption: PropTypes.func,
    lang: PropTypes.object,
    setData: PropTypes.func,
    canEdit: PropTypes.bool,
}