import {Button} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import InputLayout from "../../modules/InputLayout";
import saveComponentChanges from "../../../utils/person/SaveChanges";
import mainStyles from '../../../styles/shared/Main.module.css'
import getComponentLanguage from "../../../utils/shared/GetComponentLanguage";

export default function CommissionedRoleForm(props) {

    const [changed, setChanged] = useState(false)
    const [lang, setLang] = useState(null)
    const [data, setData] = useState({})

    useEffect(() => {
        if(!props.create)
            setData(props.data === undefined ? {} : props.data)
        setLang(getComponentLanguage({component: 'commissioned', locale: props.locale}))
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
            data.role_level === null || data.role_level === undefined ||
            data.fcpe === null || data.fcpe === undefined ||
            data.das === null || data.das === undefined ||
            data.role_class === null || data.role_class === undefined || !changed
        )
    }

    async function saveChanges() {

        await saveComponentChanges({
            path: props.create ? 'role/commissioned' : ('role/commissioned/' + data.id),
            params: {
                denomination: data.denomination,
                role_level: data.role_level,
                role_class: data.role_class,
                das: data.das,
                fcpe: data.fcpe,
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
                             inputType={0} size={'calc(25% - 12px)'} required={true}
                             initialValue={data.denomination} key={"1-1-" + data.id} setChanged={setChanged}/>
                <InputLayout inputName={lang.level} dark={false} handleChange={handleChange}
                             name={'role_level'}
                             inputType={0} size={'calc(25% - 12px)'} required={true}
                             initialValue={data.role_level} key={"1-2-" + data.id} setChanged={setChanged}/>

                <InputLayout inputName={lang.roleClass} dark={false} handleChange={handleChange}
                             name={'role_class'}
                             inputType={0} size={'calc(25% - 12px)'} required={true}
                             initialValue={data.role_class} key={"1-3-" + data.id} setChanged={setChanged}/>
                <InputLayout inputName={lang.hierarchyLevel} dark={false} handleChange={handleChange}
                             name={'hierarchy_level'}
                             inputType={0} size={'calc(25% - 12px)'} required={true}
                             initialValue={data.hierarchy_level} key={"1-4-" + data.id} setChanged={setChanged}/>


                <InputLayout inputName={'DAS'} dark={false} handleChange={handleChange}
                             name={'das'} selectFields={lang.options}
                             inputType={1} size={'calc(50% - 8px)'} required={true}
                             initialValue={data.das} key={"1-5-" + data.id} setChanged={setChanged}/>

                <InputLayout inputName={'FCPE'} dark={false} handleChange={handleChange}
                             name={'fcpe'} selectFields={lang.options}
                             inputType={1} size={'calc(50% - 8px)'} required={true}
                             initialValue={data.fcpe} key={"1-6-" + data.id} setChanged={setChanged}/>



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

CommissionedRoleForm.propTypes = {
    create: PropTypes.bool,
    locale: PropTypes.string,
    data: PropTypes.object
}