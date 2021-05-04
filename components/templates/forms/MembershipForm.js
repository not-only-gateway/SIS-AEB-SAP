import {Button} from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types'
import InputLayout from "../../modules/InputLayout";
import mainStyles from '../../../styles/shared/Main.module.css'
import getComponentLanguage from "../../../utils/shared/GetComponentLanguage";

export default function MembershipForm(props) {

    const [changed, setChanged] = useState(false)
    const [lang, setLang] = useState(null)

    useEffect(() => {
        setLang(getComponentLanguage({locale: props.locale, component: 'membership'}))
    }, [])

    function disabled() {
        return (
            false
        )
    }


    if (lang !== null)
        return (
            <div className={mainStyles.displayWarp} style={{justifyContent: 'center'}}>

                <InputLayout inputName={lang.corporateEmail}
                             handleChange={props.handleChange} name={'corporate_email'}
                             inputType={0} disabled={!props.editable} size={'calc(25% - 12px)'} required={true}
                             initialValue={props.corporateEmail} key={"1-12"} setChanged={setChanged}/>
                <InputLayout inputName={lang.extension} handleChange={props.handleChange}
                             numeric={true} maxLength={4}
                             inputType={0} disabled={!props.editable} size={'calc(25% - 12px)'} required={true}
                             name={'extension'}
                             initialValue={props.extension} key={"1-13"} setChanged={setChanged}/>
                <InputLayout inputName={lang.registration} handleChange={props.handleChange}
                             inputType={0} disabled={!props.editable} size={'calc(50% - 8px)'} required={false}
                             name={'registration'}
                             initialValue={props.registration} key={"1-14"} setChanged={setChanged}/>

                <Button style={{
                    width: '100%', marginTop: '50px',
                    backgroundColor: disabled() ? 'rgba(0,0,0,0.07)' : '#0095ff',
                    color: 'white',
                    display: !props.editable ? 'none' : null
                }} disabled={disabled()} variant={'contained'} onClick={() => {
                    props.saveChanges()
                    if (props.setNext !== undefined)
                        props.setNext()
                }
                }>
                    {props.create ? lang.create : lang.save}
                </Button>

            </div>
        )
    else
        return null

}

MembershipForm.propTypes = {
    id: PropTypes.string,
    create: PropTypes.bool,
    editable: PropTypes.bool,
    locale: PropTypes.string,
    saveChanges: PropTypes.func
}
