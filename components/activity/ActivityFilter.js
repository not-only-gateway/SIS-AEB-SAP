import PropTypes from 'prop-types'
import styles from "../../styles/activity/Activity.module.css";
import InputLayout from "../shared/layout/InputLayout";
import {Button, Checkbox, Divider, FormControlLabel} from "@material-ui/core";
import React from "react";
import fetchActivityData from "../../utils/activity/FetchData";
import {
    getBorder,
    getBoxShadow,
    getPrimaryBackground,
    getSecondaryColor,
    getTertiaryBackground
} from "../../styles/shared/MainStyles";

export default function ActivityFilterComponent(props) {
    return (
        <div className={styles.options_container}
             style={{
                 ...getPrimaryBackground({dark: props.dark}),
                 ...getSecondaryColor({dark: props.dark})
             }}>
            <InputLayout inputName={props.lang.search} dark={props.dark} handleChange={props.handleChange}
                         inputType={0} name={'path'}
                         disabled={props.disabled} size={21} initialValue={props.filters.path}
                         key={"path"} setChanged={props.setChanged} margin={false}
            />
            <Divider orientation={'vertical'}/>
            <InputLayout inputName={props.lang.startDate} dark={props.dark} handleChange={props.handleChange}
                         inputType={2} name={'date'}
                         disabled={props.disabled} size={21} initialValue={props.filters.date}
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
                         disabled={props.disabled} size={15} initialValue={props.filters.method}
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
            <Divider orientation={'vertical'}/>
            <Button disabled={!props.changed} onClick={() => {
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
        </div>

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