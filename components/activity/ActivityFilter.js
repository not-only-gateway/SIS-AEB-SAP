import PropTypes from 'prop-types'
import styles from "../../styles/activity/Activity.module.css";
import InputLayout from "../shared/layout/InputLayout";
import {Button, Checkbox, Divider, FormControlLabel} from "@material-ui/core";
import React from "react";
import fetchActivityData from "../../utils/activity/FetchData";
import {getBorder, getBoxShadow, getSecondaryColor, getTertiaryBackground} from "../../styles/shared/MainStyles";

export default function ActivityFilterComponent(props) {
    return (
        <div className={styles.options_container}
             style={{
                 ...getTertiaryBackground({dark: props.dark}),
                 ...getBorder({dark: props.dark}),
                 ...getBoxShadow({dark: props.dark}),
                 ...getSecondaryColor({dark: props.dark})
             }}>
            <InputLayout inputName={props.lang.search} dark={props.dark} handleChange={props.setPath}
                         inputType={0}
                         disabled={props.disabled} size={21} initialValue={props.path}
                         key={"path"} setChanged={props.setChanged} margin={false}
            />
            <Divider orientation={'vertical'}/>
            <InputLayout inputName={props.lang.startDate} dark={props.dark} handleChange={props.setStartDate}
                         inputType={2}
                         disabled={props.disabled} size={21} initialValue={props.startDate}
                         key={"start-date"} setChanged={props.setChanged} margin={false}
            />
            <Divider orientation={'vertical'}/>
            <InputLayout inputName={props.lang.method} dark={props.dark} handleChange={props.setMethod}
                         inputType={1} selectFields={[
                {value: 'GET', key: 'GET'},
                {value: 'POST', key: 'POST'},
                {value: 'PUT', key: 'PUT'},
                {value: 'DELETE', key: 'DELETE'},
                {value: 'Any', key: null}
            ]}
                         disabled={props.disabled} size={15} initialValue={props.method}
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
                        }
                        }
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                }
                label={props.lang.machine}
            />

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
                    startDate: props.startDate,
                    method: props.method,
                    path: props.path,
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
    setMethod: PropTypes.func,
    setStartDate: PropTypes.func,
    setResponseData: PropTypes.func,
    setLastFetchedSize: PropTypes.func,
    setMaxID: PropTypes.func,
    startDate: PropTypes.string,
    path: PropTypes.string,
    setPath: PropTypes.func,
}