import PropTypes from 'prop-types'
import {
    Button, Checkbox,
    Divider,
    FormControl,
    FormControlLabel, FormGroup, FormLabel,
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
import fetchActivityData from "../../../utils/activity/FetchData";
import shared from "../../../styles/shared/Shared.module.css";
import CountryOptions from "../../../utils/person/CountryOptions";
import SelectorLayout from "../Selector";
import Selector from "../Selector";

export default function ExtensionsFilters(props) {
    useEffect(() => {
        props.setSearchInput('')
        props.setMaxID(null)
        props.setData([])
        props.fetchData(1, true)
    }, [props.option])

    return (
        <div className={shared.filterContainer}>
            <p style={{marginRight: "auto", fontSize: '1.2rem'}}>Filters</p>
            <SelectorLayout
                required={false}
                selected={undefined}
                label={'Unit'} key={'unit'}
                data={[]} width={'100%'}
            />
            <Selector
                required={false}
                selected={undefined}
                label={'Senior'} key={'senior'}
                data={[]} width={'100%'}
            />
            <Selector
                required={false}
                selected={undefined}
                label={'Role'} key={'role'}
                data={[]} width={'100%'}
            />

            <FormControl component="fieldset" style={{marginRight: 'auto'}}>
                <FormLabel component="legend">Collaborators</FormLabel>
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Checkbox key={'inactive-checkbox-collaborators'}
                                      checked={false}

                                      inputProps={{'aria-label': 'primary checkbox'}}
                            />
                        }
                        label={'Only inactive'}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox key={'active-checkbox-collaborators'}
                                      checked={true}

                                      inputProps={{'aria-label': 'primary checkbox'}}
                            />
                        }
                        label={'Only active'}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox key={'checkbox-all-collaborators'}
                                      checked={false}
                                      inputProps={{'aria-label': 'primary checkbox'}}
                            />
                        }
                        label={'All'}
                    />
                </FormGroup>
            </FormControl>

            <FormControl component="fieldset" style={{marginRight: 'auto'}}>
                <FormLabel component="legend">Role</FormLabel>
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Checkbox key={'effective-checkbox'}
                                      checked={false}

                                      inputProps={{'aria-label': 'primary checkbox'}}
                            />
                        }
                        label={'Only effective'}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox key={'commissioned-checkbox'}
                                      checked={false}

                                      inputProps={{'aria-label': 'primary checkbox'}}
                            />
                        }
                        label={'Only commissioned'}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox key={'checkbox-all'}
                                      checked={true}
                                      inputProps={{'aria-label': 'primary checkbox'}}
                            />
                        }
                        label={'All'}
                    />
                </FormGroup>
            </FormControl>

            <div className={mainStyles.displayInlineSpaced} style={{width: '100%'}}>
                <Button disabled={!props.changed} variant={'contained'} style={{
                    width: '100%',
                    backgroundColor: !props.changed ? null : '#0095ff',
                    color: !props.changed ? null : 'white'
                }}>
                    Apply
                </Button>
            </div>
        </div>
    )
}

ExtensionsFilters.propTypes = {
    option: PropTypes.string,
    setOption: PropTypes.func,
    lang: PropTypes.object,
    setData: PropTypes.func,
    setSearchInput: PropTypes.func,
    searchInput: PropTypes.string,
    fetchData: PropTypes.func,
    setMaxID: PropTypes.func
}