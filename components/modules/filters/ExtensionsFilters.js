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
import mapToSelect from "../../../utils/person/MapToSelect";
import FetchFilterData from "../../../utils/extensions/FetchFilterData";

export default function ExtensionsFilters(props) {
    const [entities, setEntities] = useState({
        units: [],
        effectiveRoles: [],
        commissionedRoles: [],
        seniors: [],
    })
    useEffect(() => {
        if (props.option !== 'people')
            FetchFilterData({
                setResponse: setEntities,
                selectedUnit: props.filters.unit !== undefined? props.filters.unit.key : undefined
            })
    }, [props.filters.unit])

    return (
        <div className={shared.filterContainer}>
            <p style={{marginRight: "auto", fontSize: '1.2rem'}}>Filters</p>
            <SelectorLayout
                required={false}
                selected={props.filters.unit}
                disabled={props.option === 'people'}
                handleChange={event => props.handleFilterChange({name: 'unit', value: event})}
                setChanged={() => props.handleFilterChange({name: 'changed', value: true})}
                label={'Unit'} key={'unit-select'}
                data={mapToSelect({units: entities.units, option: 0})} width={'100%'}
            />
            <Selector
                required={false}
                selected={props.filters.effectiveRole}
                handleChange={event => props.handleFilterChange({name: 'effectiveRole', value: event})}
                disabled={props.filters.commissionedRoleOnly || props.option === 'people'}
                setChanged={() => props.handleFilterChange({name: 'changed', value: true})}
                label={'Effective Role'} key={'effective-role-select'}
                data={mapToSelect({effectiveRoles: entities.effectiveRoles, option: 1})} width={'100%'}
            />
            <Selector
                required={false}
                disabled={props.filters.effectiveRoleOnly || props.option === 'people'}
                selected={props.filters.commissionedRole}
                handleChange={event => props.handleFilterChange({name: 'commissionedRole', value: event})}
                setChanged={() => props.handleFilterChange({name: 'changed', value: true})}
                label={'Commissioned Role'} key={'commissioned-role-select'}
                data={mapToSelect({commissionedRoles: entities.commissionedRoles, option: 2})} width={'100%'}
            />
            <Selector
                required={false}
                selected={props.filters.senior}
                disabled={props.option === 'people' || props.filters.unit === undefined }
                handleChange={event => props.handleFilterChange({name: 'senior', value: event})}
                setChanged={() => props.handleFilterChange({name: 'changed', value: true})}
                label={'Senior'} key={'senior-select'}
                data={mapToSelect({seniors: entities.seniors, option: 3})} width={'100%'}
            />

            <FormControl component="fieldset" style={{marginRight: 'auto'}}>
                <FormLabel component="legend">Collaborators</FormLabel>
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Checkbox key={'active-checkbox-collaborators'}
                                      checked={props.option === 'collaborators'}
                                      onChange={() => {
                                          props.setOption('collaborators')
                                          props.handleFilterChange({name: 'changed', value: true})
                                      }}
                                      inputProps={{'aria-label': 'primary checkbox'}}
                            />
                        }
                        label={'Only active'}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox key={'checkbox-all-collaborators'}
                                      checked={props.option === 'people'}

                                      onChange={() => {
                                          props.setOption('people')
                                          props.handleFilterChange({name: 'changed', value: true})
                                          props.handleFilterChange({name: 'unit', value: undefined})
                                          props.handleFilterChange({name: 'commissionedRole', value: undefined})
                                          props.handleFilterChange({name: 'effectiveRole', value: undefined})
                                          props.handleFilterChange({name: 'senior', value: undefined})
                                      }}
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
                                      checked={props.filters.effectiveRoleOnly}
                                      disabled={props.option === 'people'}
                                      onChange={() => {
                                          props.handleFilterChange({name: 'commissionedRoleOnly', value: undefined})
                                          props.handleFilterChange({name: 'effectiveRoleOnly', value: true})
                                          props.handleFilterChange({name: 'changed', value: true})
                                      }}
                                      inputProps={{'aria-label': 'primary checkbox'}}
                            />
                        }
                        label={'Only effective'}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox key={'commissioned-checkbox'}
                                      checked={props.filters.commissionedRoleOnly}
                                      disabled={props.option === 'people'}
                                      onChange={() => {
                                          props.handleFilterChange({name: 'commissionedRoleOnly', value: true})
                                          props.handleFilterChange({name: 'effectiveRoleOnly', value: undefined})
                                          props.handleFilterChange({name: 'changed', value: true})

                                      }}
                                      inputProps={{'aria-label': 'primary checkbox'}}
                            />
                        }
                        label={'Only commissioned'}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox key={'checkbox-all'}
                                      checked={props.filters.commissionedRoleOnly === undefined && props.filters.effectiveRoleOnly === undefined}
                                      onChange={() => {
                                          props.handleFilterChange({name: 'commissionedRoleOnly', value: undefined})
                                          props.handleFilterChange({name: 'effectiveRoleOnly', value: undefined})
                                          props.handleFilterChange({name: 'changed', value: true})

                                      }}
                                      inputProps={{'aria-label': 'primary checkbox'}}
                            />
                        }
                        label={'All'}
                    />
                </FormGroup>
            </FormControl>

            <div className={mainStyles.displayInlineSpaced} style={{width: '100%'}}>
                <Button disabled={!props.filters.changed} variant={'contained'} style={{
                    width: '100%',
                    backgroundColor: !props.filters.changed ? undefined : '#0095ff',
                    color: !props.filters.changed ? undefined : 'white'
                }} onClick={() => {
                    props.fetchData(1, true, false)
                    props.handleFilterChange({name: 'changed', value: false})
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
    setMaxID: PropTypes.func,
    filters: PropTypes.object,
    setFilters: PropTypes.func,
    setLoading: PropTypes.func
}