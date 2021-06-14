import PropTypes from 'prop-types'
import {Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel} from "@material-ui/core";
import React, {useEffect, useState} from "react";

import mapToSelect from "../../../utils/shared/MapToSelect";
import Selector from "../inputs/Selector";
import getComponentLanguage from "../../../utils/shared/GetComponentLanguage";
import fetchSeniors from "../../../utils/fetch/FetchSeniors";
import handleObjectChange from "../../../utils/shared/HandleObjectChange";
import fetchCommissionedRoles from "../../../utils/fetch/FetchCommissionedRoles";
import fetchEffectiveRoles from "../../../utils/fetch/FetchEffectiveRoles";
import fetchUnits from "../../../utils/fetch/FetchUnits";
import Button from "../inputs/Button";

import styles from '../../../styles/Extensions.module.css'

export default function ExtensionsFilters(props) {
    const [lang, setLang] = useState(null)
    const [entities, setEntities] = useState({
        units: [],
        effectiveRoles: [],
        commissionedRoles: [],
        seniors: [],
    })
    const [maxID, setMaxID] = useState({
        unitsMaxID: null
    })
    const [lastFetchedSize, setLastFetchedSize] = useState({
        unitsFetchedSize: 0
    })
    useEffect(() => {
        if(entities.units.length === 0)
            fetchUnits({
                setData: res => handleObjectChange({
                    event: {name: 'units', value: res},
                    setData: setEntities
                }),
                data: entities.units,
                maxID: null,
                searchInput: props.searchInput,
                setMaxID: res => handleObjectChange({
                    event: {name: 'unitsMaxID', value: res},
                    setData: setMaxID
                }),
                setLastFetchedSize: res => handleObjectChange({
                    event: {name: 'unitsFetchedSize', value: res},
                    setData: setLastFetchedSize
                })
            })
        if(entities.effectiveRoles.length === 0)
            fetchEffectiveRoles().then(res => handleObjectChange({
                event: {name: 'effectiveRoles', value: res},
                setData: setEntities
            }))
        if(entities.commissionedRoles.length === 0)
            fetchCommissionedRoles().then(res => handleObjectChange({
                event: {
                    name: 'commissionedRoles',
                    value: res
                }, setData: setEntities
            }))
        if(props.filters.unit?.key !== undefined && entities.seniors.length === 0)
            fetchSeniors({
                unitID: props.filters.unit?.key,
                memberID: null
            }).then(res => handleObjectChange({event: {name: 'seniors', value: res}, setData: setEntities}))

        if (lang === null)
            setLang(getComponentLanguage({locale: props.locale, component: 'extensionsFilter'}))
    }, [props.filters.unit])

    if (lang !== null)
        return (
            <div style={{display: 'grid', justifyItems: 'flex-start', gap: '8px', height: '85%'}}>
                <h3 style={{marginRight: "auto", marginTop: '8px'}}>{lang.title}</h3>
                <Selector
                    locale={props.locale}
                    required={false}
                    selected={props.filters.unit}

                    handleChange={event => {
                        props.handleFilterChange({name: 'unit', value: event})
                        handleObjectChange({event: {name: 'seniors', value: []}, setData: setEntities})
                        props.handleFilterChange({name: 'senior', value: undefined})
                    }}

                    label={lang.unit} key={'unit-select'}
                    data={mapToSelect({data: entities.units, option: 0})} width={'calc(100% - 4px)'}
                />
                <Selector
                    required={false}
                    locale={props.locale}
                    selected={props.filters.effectiveRole}
                    handleChange={event => {
                        props.handleFilterChange({name: 'effectiveRole', value: event})
                    }}
                    disabled={props.filters.only === 'commissioned'}

                    label={lang.effectiveRole} key={'effective-role-select'}
                    data={mapToSelect({data: entities.effectiveRoles, option: 1})} width={'calc(100% - 4px)'}
                />
                <Selector
                    required={false}
                    locale={props.locale}
                    disabled={props.filters.only === 'effective'}
                    selected={props.filters.commissionedRole}
                    handleChange={event => {
                        props.handleFilterChange({name: 'commissionedRole', value: event})
                    }}

                    label={lang.commissionedRole} key={'commissioned-role-select'}
                    data={mapToSelect({data: entities.commissionedRoles, option: 2})} width={'calc(100% - 4px)'}
                />
                <Selector
                    required={false}
                    locale={props.locale}
                    selected={props.filters.senior}
                    disabled={props.filters.unit === undefined || entities.seniors.length === 0}
                    handleChange={event => {
                        props.handleFilterChange({name: 'senior', value: event})
                    }}

                    label={lang.senior} key={'senior-select'}
                    data={mapToSelect({data: entities.seniors, option: 3})} width={'calc(100% - 4px)'}
                />

                <FormControl component="fieldset" style={{marginRight: 'auto'}}>
                    <FormLabel component="legend">{lang.role}</FormLabel>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox key={'effective-checkbox'}
                                          checked={props.filters.only === 'effective'}
                                          onChange={() => props.handleFilterChange({name: 'only', value: 'effective'})}
                                          inputProps={{'aria-label': 'primary checkbox'}}
                                />
                            }
                            label={lang.effective}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox key={'commissioned-checkbox'}

                                          checked={props.filters.only === 'commissioned'}
                                          onChange={() => props.handleFilterChange({name: 'only', value: 'commissioned'})}
                                          inputProps={{'aria-label': 'primary checkbox'}}
                                />
                            }
                            label={lang.commissioned}
                        />
                        <FormControlLabel

                            control={
                                <Checkbox key={'checkbox-all'}
                                          checked={props.filters.only === undefined }
                                          onChange={() => props.handleFilterChange({name: 'only', value: undefined})}
                                          inputProps={{'aria-label': 'primary checkbox'}}
                                />
                            }
                            label={lang.all}
                        />
                    </FormGroup>
                </FormControl>
                <div className={styles.modalFooterContainer} style={{borderBottomLeftRadius: '8px'}}>
                    <Button disabled={false} width={'fit-content'} colorVariant={'secondary'} variant={'rounded'}
                            border={'#ecedf2 .7px solid'} padding={'8px 32px 8px 32px'} fontColor={'#262626'}
                            backgroundColor={'white'} content={lang.close} hoverHighlight={true} boxShadow={'unset'}
                            handleClick={() => props.setModal()}/>
                </div>
            </div>
        )
    else
        return null
}

ExtensionsFilters.propTypes = {

    filters: PropTypes.object,
    changed: PropTypes.bool,

    locale: PropTypes.string,
    setModal: PropTypes.func
}