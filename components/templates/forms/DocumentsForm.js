import {Button} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import InputLayout from "../../modules/InputLayout";
import getComponentLanguage from "../../../utils/shared/GetComponentLanguage";

export default function DocumentsForm(props) {

    const [lang, setLang] = useState(null)
    const [changed, setChanged] = useState(false)
    function disabled() {
        return (
            props.documents.cpf === null ||
            props.documents.dispatch_date === null ||
            props.documents.rg === null ||
            props.documents.issuing_body === null ||
            props.documents.voter_registration === null ||
            props.documents.electoral_zone === null ||
            props.documents.work_card === null ||
            props.documents.electoral_section === null ||
            props.documents.pis === null ||

            !props.documents.cpf ||
            !props.documents.dispatch_date ||
            !props.documents.rg ||
            !props.documents.issuing_body ||
            !props.documents.voter_registration ||
            !props.documents.electoral_zone ||
            !props.documents.work_card ||
            !props.documents.electoral_section ||
            !props.documents.pis ||
            !changed
        )
    }

    useEffect(() => {
        setLang(getComponentLanguage({locale: props.locale, component: 'documents'}))
    }, [])

    if (lang !== null)
        return (
            <div style={{
                display: 'inline-flex',
                flexFlow: 'row wrap',
                gap: '32px',
                justifyContent: 'center',
                width: '75%',
            }}>
                <h4 style={{width: '100%', marginTop: 'auto', marginBottom: 'auto'}}>
                    Registration
                </h4>
                <InputLayout inputName={'CPF'} dark={props.dark} handleChange={props.handleChange} inputType={0} name={'cpf'}
                             disabled={!props.editable} size={'100%'} required={true}
                             initialValue={props.documents.cpf} numeric={true} maxLength={11}
                             key={"5-1"} setChanged={setChanged}/>

                <InputLayout inputName={'RG'} dark={props.dark} handleChange={props.handleChange} inputType={0} name={'rg'}
                             disabled={!props.editable} size={'calc(50% - 16px)'} required={true}
                             initialValue={props.documents.rg} numeric={true} maxLength={8}
                             key={"5-2"} setChanged={setChanged}/>

                <InputLayout inputName={lang.issuing} dark={props.dark} handleChange={props.handleChange} inputType={0}
                             name={'issuing_body'}
                             disabled={!props.editable} size={'calc(25% - 24px)'} required={true}
                             initialValue={props.documents.issuing_body}
                             key={"5-3"} setChanged={setChanged}/>

                <InputLayout inputName={lang.dispatch} dark={props.dark} handleChange={props.handleChange}
                             inputType={2} name={'dispatch_date'}
                             disabled={!props.editable} size={'calc(25% - 24px)'} required={true}
                             initialValue={props.documents.dispatch_date}
                             key={"5-4"} setChanged={setChanged}/>

                <h4 style={{width: '100%',marginBottom: 'auto'}}>
                    Work Card
                </h4>
                <InputLayout inputName={lang.work} dark={props.dark} handleChange={props.handleChange} inputType={0}
                             name={'work_card'}
                             disabled={!props.editable} size={'calc(75% - 12px)'} required={true}
                             initialValue={props.documents.work_card}
                             key={"5-5"} setChanged={setChanged}/>

                <InputLayout inputName={'PIS/PASEP'} dark={props.dark} handleChange={props.handleChange} inputType={0}
                             name={'pis'}
                             disabled={!props.editable} size={'calc(25% - 24px)'} required={true}
                             initialValue={props.documents.pis}
                             key={"5-6"} setChanged={setChanged}/>

                <h4 style={{width: '100%', marginBottom: 'auto'}}>
                    Bank
                </h4>
                <InputLayout inputName={lang.bank} dark={props.dark} handleChange={props.handleChange} inputType={0}
                             name={'bank'}
                             disabled={!props.editable} size={'calc(50% - 16px)'} required={false}
                             initialValue={props.documents.bank}
                             key={"5-7"} setChanged={setChanged}
                />
                <InputLayout inputName={lang.agency} dark={props.dark} handleChange={props.handleChange} inputType={0}
                             name={'agency'}
                             disabled={!props.editable} size={'calc(50% - 16px)'} required={false}
                             initialValue={props.documents.agency}
                             key={"5-8"} setChanged={setChanged}/>
                <h4 style={{width: '100%', marginBottom: 'auto'}}>
                    Voter
                </h4>
                <InputLayout inputName={lang.voter} dark={props.dark} handleChange={props.handleChange}
                             inputType={0} name={'voter_registration'}
                             disabled={!props.editable} size={'calc(33.333% - 21.4px)'} required={true}
                             initialValue={props.documents.voter_registration}
                             key={"5-9"} setChanged={setChanged}/>
                <InputLayout inputName={lang.section} dark={props.dark} handleChange={props.handleChange}
                             inputType={0} name={'electoral_section'}
                             disabled={!props.editable} size={'calc(33.333% - 21.4px)'} required={true}
                             initialValue={props.documents.electoral_section}
                             key={"5-10"} setChanged={setChanged}/>
                <InputLayout inputName={lang.zone} dark={props.dark} handleChange={props.handleChange}
                             inputType={0} name={'electoral_zone'}
                             disabled={!props.editable} size={'calc(33.333% - 21.4px)'} required={true}
                             initialValue={props.documents.electoral_zone}
                             key={"5-11"} setChanged={setChanged}/>


                {!props.editable ? null :
                    <Button style={{
                        width: '100%',
                        backgroundColor: disabled() ? 'rgba(0,0,0,0.07)' : '#0095ff',
                        color:  disabled() ? '#777777' : 'white',
                        fontWeight: 550,

                    }} disabled={disabled()} variant={'contained'} onClick={() => {
                        props.handleSubmit({data: props.documents, personID: props.id}).then(res => {
                            console.log('THIS IS RESPONSE -> ' + JSON.stringify(res))
                            setChanged(!res)
                            if (props.setAccepted !== undefined)
                                props.setAccepted(res)
                        })
                    }}>
                        {props.create ? lang.create : lang.save}
                    </Button>
                }
            </div>
        )
    else
        return null
}
DocumentsForm.propTypes = {
    id: PropTypes.number,
    documents: PropTypes.object,
    handleChange: PropTypes.func,
    handleSubmit: PropTypes.func,
    editable: PropTypes.bool,
    locale: PropTypes.string,
    setAccepted: PropTypes.func,
    create: PropTypes.bool,
}