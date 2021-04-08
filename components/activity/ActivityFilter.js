import PropTypes from 'prop-types'
import shared from "../../styles/Shared.module.css";
import styles from "../../styles/Activity.module.css";
import InputLayout from "../shared/InputLayout";
import {Button, Divider} from "@material-ui/core";
import React from "react";

export default function ActivityFilterComponent(props){
    return(
            <div className={styles.options_container}
                 style={{border: props.dark ? null : '#e2e2e2 1px solid'}}>
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
                <InputLayout inputName={props.lang.machine} dark={props.dark} handleChange={props.setThisMachine}
                             inputType={1} selectFields={[
                    {value: 'Yes', key: true},
                    {value: 'No', key: false}
                ]}
                             disabled={props.disabled} size={15} initialValue={props.thisMachine}
                             key={"machine-select"} setChanged={props.setChanged} margin={false}
                />
                <Button disabled={!props.changed} onClick={() => {
                    props.setChanged(false)
                    props.fetchData()
                }}>
                    filter
                </Button>
            </div>

    )
}

ActivityFilterComponent.propTypes={
    changed: PropTypes.bool,
    dark: PropTypes.bool,
    lang: PropTypes.object,
    fetchData: PropTypes.func,
    setChanged: PropTypes.func,
    thisMachine: PropTypes.bool,
    setThisMachine: PropTypes.bool,
    method: PropTypes.string,
    setMethod: PropTypes.func,
    setStartDate: PropTypes.func,
    startDate: PropTypes.string,
    path: PropTypes.string,
    setPath: PropTypes.func
}