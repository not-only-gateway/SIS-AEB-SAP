import PropTypes from 'prop-types'
import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import shared from "../../../styles/shared/Shared.module.css";

import mapToSelect from "../../../utils/shared/MapToSelect";
import Selector from "../selector/Selector";
import FetchExtensionsFilter from "../../../utils/fetch/FetchExtensionsFilter";
import getComponentLanguage from "../../../utils/shared/GetComponentLanguage";
import {CloseRounded} from "@material-ui/icons";


export default function ExtensionsFilters(props) {
    const [lang, setLang] = useState(null)
    const [entities, setEntities] = useState({
        units: [],
        effectiveRoles: [],
        commissionedRoles: [],
        seniors: [],
    })
    useEffect(() => {
        if (props.option !== 'people')
            FetchExtensionsFilter({
                setResponse: setEntities,
                selectedUnit: props.filters.unit !== undefined ? props.filters.unit.key : undefined
            })
        if(lang === null)
            setLang(getComponentLanguage({locale: props.locale, component: 'extensionsFilter'}))
    }, [props.filters.unit])

    if (lang !== null)
        return (
            <div className={shared.filterContainer}>
                <h3 style={{marginRight: "auto", marginTop: '8px'}}>{lang.title}</h3>
                <Selector
                    required={false}
                    selected={props.filters.unit}
                    disabled={props.option === 'member'}
                    handleChange={event => props.handleFilterChange({name: 'unit', value: event})}
                    setChanged={() => props.setChanged(true)}
                    label={lang.unit} key={'unit-select'}
                    data={mapToSelect({data: entities.units, option: 0})} width={'calc(100% - 4px)'}
                />
                <Selector
                    required={false}
                    selected={props.filters.effectiveRole}
                    handleChange={event => props.handleFilterChange({name: 'effectiveRole', value: event})}
                    disabled={props.filters.commissionedRoleOnly || props.option === 'member'}
                    setChanged={() => props.setChanged(true)}
                    label={lang.effectiveRole} key={'effective-role-select'}
                    data={mapToSelect({data: entities.effectiveRoles, option: 1})} width={'calc(100% - 4px)'}
                />
                <Selector
                    required={false}
                    disabled={props.filters.effectiveRoleOnly || props.option === 'member'}
                    selected={props.filters.commissionedRole}
                    handleChange={event => props.handleFilterChange({name: 'commissionedRole', value: event})}
                    setChanged={() => props.setChanged(true)}
                    label={lang.commissionedRole} key={'commissioned-role-select'}
                    data={mapToSelect({data: entities.commissionedRoles, option: 2})} width={'calc(100% - 4px)'}
                />
                <Selector
                    required={false}
                    selected={props.filters.senior}
                    disabled={props.option === 'member' || props.filters.unit === undefined || entities.seniors.length === 0}
                    handleChange={event => props.handleFilterChange({name: 'senior', value: event})}
                    setChanged={() => props.setChanged(true)}
                    label={lang.senior} key={'senior-select'}
                    data={mapToSelect({data: entities.seniors, option: 3})} width={'calc(100% - 4px)'}
                />

                <FormControl component="fieldset" style={{marginRight: 'auto'}}>
                    <FormLabel component="legend">{lang.collaborators}</FormLabel>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox key={'active-checkbox-collaborators'}
                                          checked={props.option === 'collaborators'}
                                          onChange={() => {
                                              props.setOption('collaborators')
                                              props.setChanged(true)
                                          }}
                                          inputProps={{'aria-label': 'primary checkbox'}}
                                />
                            }
                            label={lang.active}
                        />
                        <FormControlLabel
                            disabled={props.accessProfile === null || !props.accessProfile.canManageStructure}
                            control={
                                <Checkbox key={'checkbox-all-collaborators'}
                                          checked={props.option === 'member'}

                                          onChange={() => {
                                              props.setOption('member')
                                              props.setChanged(true)
                                              props.handleFilterChange({name: 'unit', value: undefined})
                                              props.handleFilterChange({name: 'commissionedRole', value: undefined})
                                              props.handleFilterChange({name: 'effectiveRole', value: undefined})
                                              props.handleFilterChange({name: 'senior', value: undefined})
                                          }}
                                          inputProps={{'aria-label': 'primary checkbox'}}
                                />
                            }
                            label={lang.all}
                        />
                    </FormGroup>
                </FormControl>

                <FormControl component="fieldset" style={{marginRight: 'auto'}}>
                    <FormLabel component="legend">{lang.role}</FormLabel>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox key={'effective-checkbox'}
                                          checked={props.filters.effectiveRoleOnly === true}
                                          disabled={props.option === 'people'}
                                          onChange={() => {
                                              props.handleFilterChange({name: 'commissionedRoleOnly', value: undefined})
                                              props.handleFilterChange({name: 'effectiveRoleOnly', value: true})
                                              props.setChanged(true)
                                          }}
                                          inputProps={{'aria-label': 'primary checkbox'}}
                                />
                            }
                            label={lang.effective}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox key={'commissioned-checkbox'}
                                          checked={props.filters.commissionedRoleOnly === true}
                                          disabled={props.option === 'people'}
                                          onChange={() => {
                                              props.handleFilterChange({name: 'commissionedRoleOnly', value: true})
                                              props.handleFilterChange({name: 'effectiveRoleOnly', value: undefined})
                                              props.setChanged(true)

                                          }}
                                          inputProps={{'aria-label': 'primary checkbox'}}
                                />
                            }
                            label={lang.commissioned}
                        />
                        <FormControlLabel

                            control={
                                <Checkbox key={'checkbox-all'}
                                          checked={props.filters.commissionedRoleOnly === undefined && props.filters.effectiveRoleOnly === undefined}
                                          onChange={() => {
                                              props.handleFilterChange({name: 'commissionedRoleOnly', value: undefined})
                                              props.handleFilterChange({name: 'effectiveRoleOnly', value: undefined})
                                              props.setChanged(true)

                                          }}
                                          inputProps={{'aria-label': 'primary checkbox'}}
                                />
                            }
                            label={lang.all}
                        />
                    </FormGroup>
                </FormControl>

                <Button disabled={!props.changed} variant={'contained'} style={{
                    width: '100%',
                    backgroundColor: !props.changed ? 'rgba(0, 0,0, 0.07)' : '#0095ff',
                    color: !props.changed ? '#777777' : 'white',

                }} onClick={() => {
                    props.setChanged(false)
                    props.fetchData(1, true, false)
                    props.handleFilterChange({name: 'changed', value: false})
                }}>
                    {lang.apply}
                </Button>

            </div>
        )
    else
        return null
}

ExtensionsFilters.propTypes = {
    option: PropTypes.string,
    setOption: PropTypes.func,
    lang: PropTypes.object,
    fetchData: PropTypes.func,
    filters: PropTypes.object,
    setLoading: PropTypes.func,
    setChanged: PropTypes.func,
    changed: PropTypes.bool,
    accessProfile: PropTypes.object,
    locale: PropTypes.string
}