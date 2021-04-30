import {Button} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import InputLayout from "../InputLayout";
import fetchComponentData from "../../../utils/person/FetchData";
import saveComponentChanges from "../../../utils/person/SaveChanges";
import mainStyles from '../../../styles/shared/Main.module.css'
import getComponentLanguage from "../../../utils/shared/GetComponentLanguage";
import axios from "axios";
import Host from "../../../utils/shared/Host";
import Cookies from "universal-cookie/lib";
import CommissionedRoleList from "../../templates/CommissionedRoleList";
import EffectiveRoleList from "../../templates/EffectiveRoleList";

export default function EffectiveRoleForm(props) {

    const [changed, setChanged] = useState(false)
    const [lang, setLang] = useState(null)
    const [data, setData] = useState({})

    useEffect(() => {
        if(props.create)
            setData(props.data === undefined ? {} : props.data)

        setLang(getComponentLanguage({component: 'effective', locale: props.locale}))
    }, [])

    function handleChange(props) {

        setData(prevState => ({
            ...prevState,
            [props.name]: props.value
        }))
    }

    function disabled() {
        return (
            data.denomination === null || data.denomination === undefined ||
            data.hierarchy_level === null || data.hierarchy_level === undefined ||
            !changed
        )
    }

    async function saveChanges() {
        await saveComponentChanges({
            path: !props.create ? ('role/effective/' + data.id) : 'role/effective',
            params: {
                denomination: data.denomination,
                hierarchy_level: data.hierarchy_level,
            },
            method: props.create ? 'post' : 'put'
        }).then(res => res ? setChanged(false) : console.log(res))
    }

    if (lang !== null)
        return (
            <div className={mainStyles.displayWarp} style={{justifyContent: 'center', width: '100%'}}>

                <InputLayout inputName={lang.denomination} dark={false} handleChange={handleChange}
                             name={'denomination'}
                             inputType={0} size={'calc(50% - 8px)'} required={true}
                             initialValue={data.denomination} key={"1-1-" + data.id} setChanged={setChanged}/>

                <InputLayout inputName={lang.hierarchyLevel} dark={false} handleChange={handleChange}
                             name={'hierarchy_level'}
                             inputType={0} size={'calc(50% - 8px)'} required={true}
                             initialValue={data.hierarchy_level} key={"1-2-" + data.id} setChanged={setChanged}/>

                <Button style={{
                    width: '100%', marginTop: '50px',
                    backgroundColor: disabled() ? null : '#39adf6',

                }} variant={'contained'} color={'primary'}
                        disabled={disabled()}
                        onClick={() => saveChanges()}>{lang.save}</Button>
            </div>

        )
    else
        return <></>
}

EffectiveRoleForm.propTypes = {

    locale: PropTypes.string,
    data: PropTypes.object,
    create: PropTypes.bool
}