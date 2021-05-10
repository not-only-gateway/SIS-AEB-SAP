import {Button} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";

import mainStyles from '../../../styles/shared/Main.module.css'
import getComponentLanguage from "../../../utils/shared/GetComponentLanguage";
import InputLayout from "../../modules/InputLayout";


export default function LinkageForm(props) {

    const [changed, setChanged] = useState(false)
    const [lang, setLang] = useState(null)

    useEffect(() => {

        setLang(getComponentLanguage({component: 'linkage', locale: props.locale}))
    }, [])

    function disabled() {
        return (
            !props.data.denomination ||
            !props.data.description ||
            props.data.denomination.length === 0 ||
            props.data.description.length === 0 ||
            !changed
        )
    }

    if (lang !== null)
        return (
            <div className={mainStyles.displayWarp} style={{justifyContent: 'center', width: '100%'}}>

                <InputLayout inputName={lang.denomination} dark={false} handleChange={props.handleChange}
                             name={'denomination'}
                             inputType={0} size={'calc(50% - 8px)'} required={true}
                             initialValue={props.data.denomination} key={'linkage-1'} setChanged={setChanged}/>
                <InputLayout inputName={lang.denomination} dark={false} handleChange={props.handleChange}
                             name={'description'}
                             inputType={0} size={'calc(50% - 8px)'} required={true}
                             initialValue={props.data.description} key={'linkage-2'} setChanged={setChanged}/>

                <Button style={{
                    width: '100%',

                    backgroundColor: disabled() ? '#f0ecec' : '#0095ff',
                    color: disabled() ? '#777777' : 'white',
                    fontWeight: 550,
                    position: 'sticky',
                    bottom: 0,
                    zIndex: 5,
                }} disabled={disabled()} variant={'contained'} onClick={() => {
                    props.handleSubmit({pk: props.data.id, data: props.data, create: props.create}).then(res => {
                        setChanged(!res)
                        props.setAccepted(res)
                    })
                }}>
                    {props.create ? lang.create : lang.save}
                </Button>
            </div>

        )
    else
        return <></>
}

LinkageForm.propTypes = {
    create: PropTypes.bool,
    locale: PropTypes.string,
    data: PropTypes.object,
    handleChange: PropTypes.func,
    setAccepted: PropTypes.func
}