import PropTypes from 'prop-types'
import {InputBase, Paper} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import mainStyles from '../../styles/shared/Main.module.css'

export default function ExtensionsSearch(props) {
    const [focused, setFocused] = useState(false)

    useEffect(() => {
        props.setSearchInput('')
        props.setMaxID(null)
        props.setData([])
        props.fetchData(1, true)
    }, [props.option])

    return (

        <div key={'index-simple-filter-component'} className={mainStyles.displayInlineSpaced}
             style={{height: '56px', width: '100%'}}>

            <Paper component="form"

                   style={{
                       display: 'flex',
                       justifyContent: 'space-around',
                       alignItems: 'center',
                       boxShadow: focused ? 'rgba(0, 0, 0, 0.1) 0 4px 6px -1px, rgba(0,0,0,0.06) 0 2px 4px -1px' : 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px',
                       width: '100%',
                       borderRadius: '8px',
                       height: '100%'
                   }}>


                <InputBase
                    style={{width: '98%'}}
                    placeholder={props.lang}
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
            {/*<Button onClick={() => {*/}
            {/*    props.setChanged(false)*/}
            {/*    props.fetchData(1, true)*/}
            {/*}} style={{*/}
            {/*    width: '55px',*/}
            {/*    color: props.searchInput.length === 0 ? '#777777' : 'white',*/}
            {/*    backgroundColor: props.searchInput.length === 0 ? null : 'black',*/}
            {/*    boxShadow:  props.searchInput.length === 0 ? null : 'rgba(0, 0, 0, 0.1) 0 4px 6px -1px, rgba(0,0,0,0.06) 0 2px 4px -1px',*/}
            {/*    borderRadius: '8px',*/}
            {/*    height: '100%'*/}
            {/*}} disabled={props.searchInput.length === 0}>*/}
            {/*    <SearchRounded/>*/}
            {/*</Button>*/}
        </div>
    )
}

ExtensionsSearch.propTypes = {
    width: PropTypes.number,
    dark: PropTypes.bool,

    lang: PropTypes.object,
    setData: PropTypes.func,
    setSearchInput: PropTypes.func,
    searchInput: PropTypes.string,
    fetchData: PropTypes.func,
    setMaxID: PropTypes.func
}