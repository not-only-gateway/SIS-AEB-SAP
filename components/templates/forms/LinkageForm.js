import {Button} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";

import mainStyles from '../../../styles/shared/Main.module.css'
import getComponentLanguage from "../../../utils/shared/GetComponentLanguage";
import saveComponentChanges from "../../../utils/person/SaveChanges";
import InputLayout from "../../modules/InputLayout";


export default function LinkageForm(props) {

    const [changed, setChanged] = useState(false)
    const [lang, setLang] = useState(null)
    const [data, setData] = useState({})

    useEffect(() => {
        if(!props.create)
            setData(props.data === undefined ? {} : props.data)
        setLang(getComponentLanguage({component: 'linkage', locale: props.locale}))
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
            data.description === null || data.description === undefined ||
            !changed
        )
    }

    async function saveChanges() {

        await saveComponentChanges({
            path: props.create ? 'linkage' : 'linkage/' + data.id,
            params: {
                denomination: data.denomination,
                description: data.description,

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
                <InputLayout inputName={lang.denomination} dark={false} handleChange={handleChange}
                             name={'description'}
                             inputType={0} size={'calc(50% - 8px)'} required={true}
                             initialValue={data.description} key={"1-2-" + data.id} setChanged={setChanged}/>


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

LinkageForm.propTypes = {
    create: PropTypes.bool,
    locale: PropTypes.string,
    data: PropTypes.object
}