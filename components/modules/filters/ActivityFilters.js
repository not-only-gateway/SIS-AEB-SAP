import PropTypes from 'prop-types'
import InputLayout from "../InputLayout";
import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel} from "@material-ui/core";
import React from "react";
import fetchActivityData from "../../../utils/activity/FetchData";
import mainStyles from '../../../styles/shared/Main.module.css'
import shared from '../../../styles/shared/Shared.module.css'

export default function ActivityFilterComponent(props) {
    return (

            <div className={shared.filterContainer}>
                <p style={{marginRight: "auto", fontSize: '1.2rem'}}>{props.lang.filters}</p>
                <InputLayout inputName={props.lang.search} dark={props.dark} handleChange={props.handleChange}
                             inputType={0} name={'path'}
                             disabled={props.disabled} size={'100%'} initialValue={props.filters.path}
                             key={"path"} setChanged={props.setChanged} margin={false}
                />

                <InputLayout inputName={props.lang.startDate} dark={props.dark} handleChange={props.handleChange}
                             inputType={2} name={'startDate'}
                             disabled={props.disabled} size={'100%'} initialValue={props.filters.startDate}
                             key={"start-date-selector"} setChanged={props.setChanged} margin={false}
                />
                <InputLayout inputName={props.lang.endDate} dark={props.dark} handleChange={props.handleChange}
                             inputType={2} name={'endDate'}
                             disabled={props.disabled} size={'100%'} initialValue={props.filters.endDate}
                             key={"end-date-selector"} setChanged={props.setChanged} margin={false}
                />
                <FormControl component="fieldset" style={{marginRight: 'auto'}}>
                    <FormLabel component="legend">{props.lang.method}</FormLabel>
                    <FormGroup >
                        <FormControlLabel
                            control={<Checkbox key={'get'} checked={props.filters.method === 'GET'}
                                               onChange={() => {
                                                   props.handleChange({name: 'method', value: 'GET'})
                                                   props.setChanged(true)
                                               }}/>}
                            label="GET"
                        />
                        <FormControlLabel
                            control={<Checkbox key={'patch'} checked={props.filters.method === 'PATCH'}
                                               onChange={() => {
                                                   props.handleChange({name: 'method', value: 'PATCH'})
                                                   props.setChanged(true)
                                               }}/>}
                            label="PATCH"
                        />
                        <FormControlLabel
                            control={<Checkbox key={'put'} checked={props.filters.method === 'PUT'}
                                               onChange={() => {
                                                   props.handleChange({name: 'method', value: 'PUT'})
                                                   props.setChanged(true)
                                               }}/>}
                            label="PUT"
                        />
                        <FormControlLabel
                            control={<Checkbox key={'post'} checked={props.filters.method === 'POST'}
                                               onChange={() => {
                                                   props.handleChange({name: 'method', value: 'POST'})
                                                   props.setChanged(true)
                                               }}/>}
                            label="POST"
                        />
                        <FormControlLabel
                            control={<Checkbox key={'delete'} checked={props.filters.method === 'DELETE'}
                                               onChange={() => {
                                                   props.handleChange({name: 'method', value: 'DELETE'})
                                                   props.setChanged(true)
                                               }}/>}
                            label="DELETE"
                        />
                        <FormControlLabel
                            control={<Checkbox key={'all'} checked={props.filters.method === null}
                                               onChange={() => {
                                                   props.handleChange({name: 'method', value: null})
                                                   props.setChanged(true)
                                               }}/>}
                            label="ALL"
                        />
                    </FormGroup>
                </FormControl>

                <FormControl component="fieldset" style={{marginRight: 'auto'}}>
                    <FormLabel component="legend">{props.lang.machine}</FormLabel>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox key={'true-checkbox'}
                                    checked={props.thisMachine}
                                    onChange={() => {
                                        props.setThisMachine(!props.thisMachine)
                                        props.setChanged(true)
                                        props.setMaxID(null)
                                    }
                                    }
                                    inputProps={{'aria-label': 'primary checkbox'}}
                                />
                            }
                            label={'YES'}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox key={'false-checkbox'}
                                    checked={!props.thisMachine}
                                    onChange={() => {
                                        props.setThisMachine(!props.thisMachine)
                                        props.setChanged(true)
                                        props.setMaxID(null)
                                    }
                                    }
                                    inputProps={{'aria-label': 'primary checkbox'}}
                                />
                            }
                            label={'NO'}
                        />
                    </FormGroup>
                </FormControl>

                <div className={mainStyles.displayInlineSpaced} style={{width: '100%'}}>
                    <Button disabled={!props.changed} variant={'contained'} style={{width: '100%',
                        backgroundColor: !props.changed ? null : '#0095ff',
                        color: !props.changed ? null : 'white'
                    }} onClick={() => {
                        props.setChanged(false)
                        fetchActivityData({
                            type: 1,
                            setLastFetchedSize: props.setLastFetchedSize,
                            setData: props.setResponseData,
                            data: props.data,
                            setMaxID: props.setMaxID,
                            maxID: props.maxID,
                            setError: props.setError,
                            setErrorMessage: props.setErrorMessage,
                            thisMachine: props.thisMachine,
                            startDate: props.filters.date,
                            method: props.filters.method,
                            path: props.filters.path,
                            setPagesFetched: props.setPagesFetched
                        }).catch(error => console.log(error))

                    }}>
                        Apply
                    </Button>
                </div>
            </div>
    )
}

ActivityFilterComponent.propTypes = {
    changed: PropTypes.bool,
    dark: PropTypes.bool,
    lang: PropTypes.object,
    setChanged: PropTypes.func,
    thisMachine: PropTypes.bool,
    setThisMachine: PropTypes.func,
    method: PropTypes.string,

    setResponseData: PropTypes.func,
    setLastFetchedSize: PropTypes.func,
    setMaxID: PropTypes.func,
    startDate: PropTypes.string,
    filters: PropTypes.object,
    handleChange: PropTypes.func,

    pagesFetched: PropTypes.number,
    setPagesFetched: PropTypes.func
}