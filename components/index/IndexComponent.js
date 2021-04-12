import PropTypes from 'prop-types'
import styles from "../../styles/pages/index/Index.module.css";
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
import {searchFieldStyle} from "../../styles/components/navigation/BarMaterialStyles";
import {BackspaceRounded, MenuRounded, SearchRounded} from "@material-ui/icons";
import React, {useEffect, useState} from "react";
import Host from "../../utils/shared/Host";
import makeRequest from "../../utils/shared/Request";
import axios from "axios";
import Cookies from "universal-cookie/lib";

export default function IndexComponent(props) {
    const [search, setSearch] = useState(null)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [hovered, setHovered] = useState(false)

    async function fetchSearch() {
        props.setLoading(true)
        props.setData([])
        await makeRequest({
            package: {
                input: search
            },
            method: 'get',
            url: props.option,
            host: Host()
        }).then(response => {
            props.setData(response.data)
        })

        props.setLoading(false)
    }

    async function fetchData() {
        props.setData([])

        await axios({
            method: 'get',
            url: Host() + props.option,
            headers: (new Cookies()).get('jwt') !== undefined ? {'authorization': (new Cookies()).get('jwt')} : null,
            params: props.params
        }).then(res => {
            props.setData(res.data)
        }).catch(error => {
            console.log(error)
        })

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
                           boxShadow: !props.dark ? (hovered ? 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' : 'none') : 'none',
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
                            {props.lang.filterChoice.map(choice => (
                                <FormControlLabel value={choice.key} control={<Radio/>} label={choice.value}/>
                                ))}

                        </RadioGroup>
                    </FormControl>
                </Menu>
                <InputBase
                    style={{width: '85%', color: (props.dark ? 'white' : null), marginLeft: '10px'}}
                    placeholder={props.lang.search}
                    value={search}
                    onKeyDown={key => {
                        if (key.key === 'Enter')
                            key.preventDefault()
                    }}
                    onChange={event => setSearch(event.target.value)}
                />
                <IconButton aria-label={props.lang.search} onClick={() => fetchSearch()}

                            disabled={search === null || search.length === 0}>
                    <SearchRounded style={{color: props.dark ? 'white' : null}}/>
                </IconButton>
                <Divider orientation={'vertical'} style={{height: '70%'}}/>
                <IconButton aria-label={props.lang.search} disabled={search === null || search.length === 0}
                            onClick={() => {
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

IndexComponent.propTypes = {
    dark: PropTypes.bool,
    option: PropTypes.string,
    setValue: PropTypes.func,
    initialOption: PropTypes.number,
    setOption: PropTypes.func,
    lang: PropTypes.object,
    setData: PropTypes.func,
    canEdit: PropTypes.bool,
}