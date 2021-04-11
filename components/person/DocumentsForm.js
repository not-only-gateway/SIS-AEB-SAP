import styles from "../../styles/components/form/Form.module.css";
import {Button} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import InputLayout from "../shared/layout/InputLayout";
import saveComponentChanges from "../../utils/person/SaveChanges";
import fetchComponentData from "../../utils/person/FetchData";

export default function DocumentsForm(props) {

    const [loading, setLoading] = useState(true)
    const [changed, setChanged] = useState(false)
    const [cpf, setCpf] = useState('')
    const [rg, setRg] = useState('')
    const [dispatchDate, setDispatchDate] = useState('')
    const [issuingBody, setIssuingBody] = useState('')
    const [voterRegistration, setVoterRegistration] = useState('')
    const [electoralZone, setElectoralZone] = useState('')
    const [electoralSection, setElectoralSection] = useState('')
    const [bank, setBank] = useState(null)
    const [agency, setAgency] = useState(null)
    const [workCard, setWorkCard] = useState('')
    const [pis, setPis] = useState('')

    function disabled() {
        return (
            cpf.length === 0 ||
            dispatchDate.length === 0 ||
            rg.length === 0 ||
            issuingBody.length === 0 ||
            voterRegistration.length === 0 ||
            electoralZone.length === 0 ||
            workCard.length === 0 ||
            electoralSection.length === 0 ||
            pis.length === 0 ||
            changed === false
        )
    }

    useEffect(() => {
        fetchData().catch(error => console.log(error))
    }, [])

    async function fetchData() {
        await fetchComponentData({path: 'documents/' + props.id, params: {}}).then(res => {
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
        await saveComponentChanges({
            path: 'documents/' + props.id,
            params: {
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
            method: 'put'
        }).then(res => res ? setChanged(false) : console.log(res))
    }


    if (!loading)
        return (

            <div className={styles.form_component_container}>
                {props.getTitle({
                    pageName: null,
                    pageTitle: 'Documents',
                    pageInfo: 'Basic form'
                })}
                <InputLayout inputName={'CPF'} dark={props.dark} handleChange={setCpf} inputType={0}
                             disabled={!props.editable} size={100} required={true} initialValue={cpf}
                             key={"5-1"} setChanged={setChanged}/>

                <InputLayout inputName={'RG'} dark={props.dark} handleChange={setRg} inputType={0}
                             disabled={!props.editable} size={32} required={true} initialValue={rg}
                             key={"5-2"} setChanged={setChanged}/>

                <InputLayout inputName={'Issuing body'} dark={props.dark} handleChange={setIssuingBody} inputType={0}
                             disabled={!props.editable} size={32} required={true} initialValue={issuingBody}
                             key={"5-3"} setChanged={setChanged}/>
                <InputLayout inputName={'Dispatch Date'} dark={props.dark} handleChange={setDispatchDate} inputType={2}
                             disabled={!props.editable} size={32} required={true} initialValue={dispatchDate}
                             key={"5-4"} setChanged={setChanged}/>

                <InputLayout inputName={'Work PersonCard'} dark={props.dark} handleChange={setWorkCard} inputType={0}
                             disabled={!props.editable} size={49} required={true} initialValue={workCard}
                             key={"5-5"} setChanged={setChanged}/>

                <InputLayout inputName={'PIS/PASEP'} dark={props.dark} handleChange={setPis} inputType={0}
                             disabled={!props.editable} size={49} required={true} initialValue={pis}
                             key={"5-6"} setChanged={setChanged}/>

                <InputLayout inputName={'Bank'} dark={props.dark} handleChange={setBank} inputType={0}
                             disabled={!props.editable} size={49} required={false} initialValue={bank}
                             key={"5-7"} setChanged={setChanged}/>
                <InputLayout inputName={'Agency'} dark={props.dark} handleChange={setAgency} inputType={0}
                             disabled={!props.editable} size={49} required={false} initialValue={agency}
                             key={"5-8"} setChanged={setChanged}/>
                <InputLayout inputName={'Voter Registration'} dark={props.dark} handleChange={setVoterRegistration}
                             inputType={0}
                             disabled={!props.editable} size={32} required={true} initialValue={voterRegistration}
                             key={"5-9"} setChanged={setChanged}/>
                <InputLayout inputName={'Electoral Section'} dark={props.dark} handleChange={setElectoralSection}
                             inputType={0}
                             disabled={!props.editable} size={32} required={true} initialValue={electoralSection}
                             key={"5-10"} setChanged={setChanged}/>
                <InputLayout inputName={'Electoral Zone'} dark={props.dark} handleChange={setElectoralZone}
                             inputType={0}
                             disabled={!props.editable} size={32} required={true} initialValue={electoralZone}
                             key={"5-11"} setChanged={setChanged}/>


                <Button style={{
                    width: '43vw', margin: '2vh auto',
                    backgroundColor: disabled() ? null : '#39adf6',
                    color: disabled() ? null : 'white'
                }}
                        variant={'contained'}
                        disableElevation
                        disabled={disabled()}
                        onClick={() => saveChanges()}>Save</Button>

            </div>
        )
    else
        return null
}
DocumentsForm.propTypes = {
    id: PropTypes.string,
    dark: PropTypes.bool,
    visible: PropTypes.bool,
    editable: PropTypes.bool,
    getTitle: PropTypes.func
}