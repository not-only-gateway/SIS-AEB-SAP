import styles from "../../styles/form/Form.module.css";
import {Button, Grid, TextField} from "@material-ui/core";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import React, {useEffect, useState} from "react";
import {Skeleton} from "@material-ui/lab";
import PropTypes from "prop-types";
import InputLayout from "../shared/InputLayout";

export default function DocumentsForm(props) {

    const [loading, setLoading] = useState(true)
    const [changed, setChanged] = useState(false)
    const [cpf, setCpf] = useState(null)
    const [rg, setRg] = useState(null)
    const [dispatchDate, setDispatchDate] = useState(null)
    const [issuingBody, setIssuingBody] = useState(null)
    const [voterRegistration, setVoterRegistration] = useState(null)
    const [electoralZone, setElectoralZone] = useState(null)
    const [electoralSection, setElectoralSection] = useState(null)
    const [bank, setBank] = useState(null)
    const [agency, setAgency] = useState(null)
    const [workCard, setWorkCard] = useState(null)
    const [pis, setPis] = useState(null)


    useEffect(() => {
        fetchData().catch(error => console.log(error))
    }, [])

    async function fetchData() {
        await props.fetchData('person/documents', {id: props.id}).then(res => {
            if (res !== null) {
                setCpf(res.cpf)
                setRg(res.rg)
                setDispatchDate(res.dispatch_date)
                setIssuingBody(res.issuing_body)
                setVoterRegistration(res.voter_registration)
                setElectoralSection(res.electoral_section)
                setElectoralZone(res.electoral_zone)
                setBank(res.bank)
                setAgency(res.agency)
                setWorkCard(res.work_card)
                setPis(res.pis)
            }

        })
        setLoading(false)
    }

    async function saveChanges() {
        await props.saveChanges(
            'person/documents',
            {
                id: props.id,
                cpf: cpf,
                rg: rg,
                dispatch_date: dispatchDate.getDate(),
                issuing_body: issuingBody,
                voter_registration: voterRegistration,
                electoral_zone: electoralZone,
                electoral_section: electoralSection,
                bank: bank,
                agency: agency,
                work_card: workCard,
                pis: pis,
            },
            'put'
        ).then(res => res ? setChanged(false) : console.log(res))
    }


    if (!loading)
        return (
            <fieldset className={styles.form_component_container}
                      style={{border: (props.dark ? 'none' : '#e2e2e2 1px solid'), backgroundColor: props.dark ? '#3b424c' : null, marginBottom: '2vh'}}>
                <legend style={{paddingRight: '10px', paddingLeft: '10px'}}>
                    <p style={{fontSize: '1.2rem', fontWeight: 450}}>Documents</p>
                </legend>
                <InputLayout inputName={'CPF'} dark={props.dark} handleChange={setCpf} inputType={0}
                             disabled={props.disabled} size={100} required={true} initialValue={cpf}
                             key={"5-1"} setChanged={setChanged}/>

                <InputLayout inputName={'RG'} dark={props.dark} handleChange={setRg} inputType={0}
                             disabled={props.disabled} size={32} required={true} initialValue={rg}
                             key={"5-2"} setChanged={setChanged}/>

                <InputLayout inputName={'Issuing body'} dark={props.dark} handleChange={setIssuingBody} inputType={0}
                             disabled={props.disabled} size={32} required={true} initialValue={issuingBody}
                             key={"5-3"} setChanged={setChanged}/>
                <InputLayout inputName={'Dispatch Date'} dark={props.dark} handleChange={setDispatchDate} inputType={2}
                             disabled={props.disabled} size={32} required={true} initialValue={dispatchDate}
                             key={"5-4"} setChanged={setChanged}/>

                <InputLayout inputName={'Work Card'} dark={props.dark} handleChange={setWorkCard} inputType={0}
                             disabled={props.disabled} size={49} required={true} initialValue={workCard}
                             key={"5-5"} setChanged={setChanged}/>

                <InputLayout inputName={'PIS/PASEP'} dark={props.dark} handleChange={setPis} inputType={0}
                             disabled={props.disabled} size={49} required={true} initialValue={pis}
                             key={"5-6"} setChanged={setChanged}/>

                <InputLayout inputName={'Bank'} dark={props.dark} handleChange={setBank} inputType={0}
                             disabled={props.disabled} size={49} required={true} initialValue={bank}
                             key={"5-7"} setChanged={setChanged}/>
                <InputLayout inputName={'Agency'} dark={props.dark} handleChange={setAgency} inputType={0}
                             disabled={props.disabled} size={49} required={true} initialValue={agency}
                             key={"5-8"} setChanged={setChanged}/>
                <InputLayout inputName={'Voter Registration'} dark={props.dark} handleChange={setVoterRegistration} inputType={0}
                             disabled={props.disabled} size={32} required={true} initialValue={voterRegistration}
                             key={"5-9"} setChanged={setChanged}/>
                <InputLayout inputName={'Electoral Section'} dark={props.dark} handleChange={setElectoralSection} inputType={0}
                             disabled={props.disabled} size={32} required={true} initialValue={electoralSection}
                             key={"5-10"} setChanged={setChanged}/>
                <InputLayout inputName={'Electoral Zone'} dark={props.dark} handleChange={setElectoralZone} inputType={0}
                             disabled={props.disabled} size={32} required={true} initialValue={electoralZone}
                             key={"5-11"} setChanged={setChanged}/>


                <Button style={{width: '45vw'}} disabled={!changed}
                        onClick={() => saveChanges()}>Save</Button>
            </fieldset>
        )
    else
        return (
            <fieldset className={styles.form_component_container}
                 style={{border: (props.dark ? null : '#e2e2e2 1px solid'), backgroundColor: props.dark ? '#3b424c' : null}}>
                <legend>
                    <p style={{fontSize: '1.2rem', fontWeight: 450}}>Documents</p>
                </legend>
                <Skeleton variant="rect" style={{
                    borderRadius: '8px',
                    marginBottom: '2vh',
                    width: '45vw',
                    height: '6vh',
                    backgroundColor: props.dark ? '#3b424c' : '#f4f8fb'
                }}/>
                <Skeleton variant="rect" style={{
                    borderRadius: '8px',
                    marginBottom: '2vh',
                    width: '45vw',
                    height: '6vh',
                    backgroundColor: props.dark ? '#3b424c' : '#f4f8fb'
                }}/>
                <Skeleton variant="rect" style={{
                    borderRadius: '8px',
                    marginBottom: '2vh',
                    width: '45vw',
                    height: '6vh',
                    backgroundColor: props.dark ? '#3b424c' : '#f4f8fb'
                }}/>
            </fieldset>
        )
}
DocumentsForm.propTypes = {
    id: PropTypes.string,
    dark: PropTypes.bool,
    disabled: PropTypes.bool,
    saveChanges: PropTypes.func,
    fetchData: PropTypes.func,
}