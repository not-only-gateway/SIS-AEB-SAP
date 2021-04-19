import PropTypes from 'prop-types'
import styles from "../../styles/activity/Activity.module.css";
import InputLayout from "../shared/layout/InputLayout";
import {Button, Checkbox, createMuiTheme, Divider, FormControlLabel, ThemeProvider} from "@material-ui/core";
import React from "react";
import fetchActivityData from "../../utils/activity/FetchData";
import mainStyles from '../../styles/shared/Main.module.css'

export default function ActivityFilterComponent(props) {
    return (
        <ThemeProvider theme={createMuiTheme({
            palette: {
                type: "light"
            }
        })}>
        <div className={styles.optionsContainer}>
            <p style={{textAlign: 'left', fontWeight: '500', fontSize:'1.1rem'}}>Search</p>
            <InputLayout inputName={props.lang.search} dark={props.dark} handleChange={props.handleChange}
                         inputType={0} name={'path'}
                         disabled={props.disabled} size={90} initialValue={props.filters.path}
                         key={"path"} setChanged={props.setChanged} margin={false}
            />
            <Divider orientation={'vertical'}/>
            <InputLayout inputName={props.lang.startDate} dark={props.dark} handleChange={props.handleChange}
                         inputType={2} name={'date'}
                         disabled={props.disabled} size={90} initialValue={props.filters.date}
                         key={"start-date"} setChanged={props.setChanged} margin={false}
            />
            <Divider orientation={'vertical'}/>
            <InputLayout inputName={props.lang.method} dark={props.dark} handleChange={props.handleChange}
                         inputType={1} name={'method'}
                         selectFields={[
                             {value: 'GET', key: 'GET'},
                             {value: 'POST', key: 'POST'},
                             {value: 'PUT', key: 'PUT'},
                             {value: 'DELETE', key: 'DELETE'},
                             {value: 'Any', key: null}
                         ]}
                         disabled={props.disabled} size={90} initialValue={props.filters.method}
                         key={"method-select"} setChanged={props.setChanged} margin={false}
            />
            <Divider orientation={'vertical'}/>

            <FormControlLabel
                control={
                    <Checkbox
                        checked={props.thisMachine}
                        onChange={() => {
                            props.setThisMachine(!props.thisMachine)
                            props.setChanged(true)
                            props.setMaxID(null)}
                        }
                        inputProps={{'aria-label': 'primary checkbox'}}
                    />
                }
                label={props.lang.machine}
            />
            <div className={mainStyles.displayInlineSpaced} style={{width: '100%'}}>
                <Button disabled={!props.changed} variant={'contained'} color={'primary'} onClick={() => {
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
                    }).catch(error => console.log(error))

                }}>
                    filter
                </Button>
                <Button disabled={!props.changed} variant={'contained'} color={'secondary'} onClick={() => {
                    props.setChanged(false)
                    props.setMaxID(null)
                    props.setLastFetchedSize(null)
                    props.setThisMachine(false)
                    props.handleChange({
                        name: 'method',
                        value: null
                    })
                    props.handleChange({
                        name: 'path',
                        value: ''
                    })
                    props.handleChange({
                        name: 'date',
                        value: null
                    })
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
                    }).catch(error => console.log(error))

                }}>
                    Clear
                </Button>
            </div>
        </div>
        </ThemeProvider>
    )
}

ActivityFilterComponent.propTypes = {
    changed: PropTypes.bool,
    dark: PropTypes.bool,
    lang: PropTypes.object,
    setChanged: PropTypes.func,
    thisMachine: PropTypes.bool,
    setThisMachine: PropTypes.bool,
    method: PropTypes.string,

    setResponseData: PropTypes.func,
    setLastFetchedSize: PropTypes.func,
    setMaxID: PropTypes.func,
    startDate: PropTypes.string,
    filters: PropTypes.object,
    handleChange: PropTypes.func
}