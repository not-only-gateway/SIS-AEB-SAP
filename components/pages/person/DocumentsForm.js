import {Button, createMuiTheme, ThemeProvider} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import PropTypes, {func} from "prop-types";
import InputLayout from "../../layout/InputLayout";
import saveComponentChanges from "../../../utils/person/SaveChanges";
import fetchComponentData from "../../../utils/person/FetchData";
import mainStyles from '../../../styles/shared/Main.module.css'
import getComponentLanguage from "../../../utils/shared/GetLanguage";
import {getSecondaryBackground} from "../../../styles/shared/MainStyles";

export default function DocumentsForm(props) {

    const [documents, setDocuments] = useState({
        cpf: '',
        rg: '',
        dispatchDate: undefined,
        issuingBody: '',
        voterRegistration: '',
        electoralZone: '',
        electoralSection: '',
        bank: '',
        agency: '',
        workCard: '',
        pis: '',
    })
    const [lang, setLang] = useState(null)
    const [loading, setLoading] = useState(true)
    const [changed, setChanged] = useState(false)

    function handleChange(props) {
        setDocuments(prevState => ({
            ...prevState,
            [props.name]:  props.value
        }))
    }

    function disabled() {
        return (
            documents.cpf.length === 0 ||
            documents.dispatchDate.length === 0 ||
            documents.rg.length === 0 ||
            documents.issuingBody.length === 0 ||
            documents.voterRegistration.length === 0 ||
            documents.electoralZone.length === 0 ||
            documents.workCard.length === 0 ||
            documents.electoralSection.length === 0 ||
            documents.pis.length === 0 ||
            changed === false
        )
    }

    useEffect(() => {
        fetchComponentData({path: 'documents/' + props.id, params: {}}).then(res => {
            if (res !== null) {
                handleChange({name: 'cpf', value: res.cpf})
                handleChange({name: 'rg', value: res.rg})
                handleChange({name: 'dispatchDate', value: res.dispatch_date})
                handleChange({name: 'issuingBody', value: res.issuing_body})
                handleChange({name: 'voterRegistration', value: res.voter_registration})
                handleChange({name: 'electoralZone', value: res.electoral_zone})
                handleChange({name: 'electoralSection', value: res.electoral_section})
                handleChange({name: 'bank', value: res.bank})
                handleChange({name: 'agency', value: res.agency})
                handleChange({name: 'workCard', value: res.work_card})
                handleChange({name: 'pis', value: res.pis})
            }
            setLoading(false)
        }).catch(() => setLoading(false))
        setLang(getComponentLanguage({locale: props.locale, component: 'documents'}))
    }, [])

    async function saveChanges() {
        await saveComponentChanges({
            path: 'documents/' + props.id,
            params: {
                cpf: documents.cpf,
                rg: documents.rg,
                dispatch_date: typeof(documents.dispatchDate) !== "number" ? new Date(documents.dispatchDate).getTime() : documents.dispatchDate,
                issuing_body: documents.issuingBody,
                voter_registration: documents.voterRegistration,
                electoral_zone: documents.electoralZone,
                electoral_section: documents.electoralSection,
                bank: documents.bank,
                agency: documents.agency,
                work_card: documents.workCard,
                pis: documents.pis,
            },
            method: 'put'
        }).then(res => res ? setChanged(false) : console.log(res))
    }


    if (!loading && lang !== null)
        return (
            <div className={mainStyles.displayWarp} style={{justifyContent: 'center'}}>
                <InputLayout inputName={'CPF'} dark={props.dark} handleChange={handleChange} inputType={0} name={'cpf'}
                             disabled={!props.editable} size={98} required={true} initialValue={documents.cpf} numeric={true} maxLength={11}
                             key={"5-1"} setChanged={setChanged}/>

                <InputLayout inputName={'RG'} dark={props.dark} handleChange={handleChange} inputType={0} name={'rg'}
                             disabled={!props.editable} size={32} required={true} initialValue={documents.rg} numeric={true} maxLength={8}
                             key={"5-2"} setChanged={setChanged}/>

                <InputLayout inputName={lang.issuing} dark={props.dark} handleChange={handleChange} inputType={0} name={'issuingBody'}
                             disabled={!props.editable} size={32} required={true} initialValue={documents.issuingBody}
                             key={"5-3"} setChanged={setChanged}/>

                <InputLayout inputName={lang.dispatch} dark={props.dark} handleChange={handleChange}
                             inputType={2} name={'dispatchDate'}
                             disabled={!props.editable} size={32} required={true} initialValue={documents.dispatchDate}
                             key={"5-4"} setChanged={setChanged}/>

                <InputLayout inputName={lang.work} dark={props.dark} handleChange={handleChange} inputType={0} name={'workCard'}
                             disabled={!props.editable} size={48.5} required={true} initialValue={documents.workCard}
                             key={"5-5"} setChanged={setChanged}/>

                <InputLayout inputName={'PIS/PASEP'} dark={props.dark} handleChange={handleChange} inputType={0} name={'pis'}
                             disabled={!props.editable} size={48.5} required={true} initialValue={documents.pis}
                             key={"5-6"} setChanged={setChanged}/>

                <InputLayout inputName={lang.bank} dark={props.dark} handleChange={handleChange} inputType={0} name={'bank'}
                             disabled={!props.editable} size={48.5} required={false} initialValue={documents.bank}
                             key={"5-7"} setChanged={setChanged}
                />
                <InputLayout inputName={lang.agency} dark={props.dark} handleChange={handleChange} inputType={0} name={'agency'}
                             disabled={!props.editable} size={48.5} required={false} initialValue={documents.agency}
                             key={"5-8"} setChanged={setChanged}/>
                <InputLayout inputName={lang.voter} dark={props.dark} handleChange={handleChange}
                             inputType={0} name={'voterRegistration'}
                             disabled={!props.editable} size={32} required={true} initialValue={documents.voterRegistration}
                             key={"5-9"} setChanged={setChanged}/>
                <InputLayout inputName={lang.section} dark={props.dark} handleChange={handleChange}
                             inputType={0} name={'electoralSection'}
                             disabled={!props.editable} size={32} required={true} initialValue={documents.electoralSection}
                             key={"5-10"} setChanged={setChanged}/>
                <InputLayout inputName={lang.zone} dark={props.dark} handleChange={handleChange}
                             inputType={0} name={'electoralZone'}
                             disabled={!props.editable} size={32} required={true} initialValue={documents.electoralZone}
                             key={"5-11"} setChanged={setChanged}/>

                <Button style={{
                    width: '98%', marginTop: '50px',
                    backgroundColor: disabled() ? null : '#39adf6',
                }}
                        variant={'contained'}
                        color={'primary'}
                        disabled={disabled()}
                        onClick={() => saveChanges()}>{lang.saveButton}</Button>

            </div>
        )
    else
        return null
}
DocumentsForm.propTypes ={
    id: PropTypes.string,
    dark: PropTypes.bool,
    visible: PropTypes.bool,
    editable: PropTypes.bool,
    locale: PropTypes.string
}