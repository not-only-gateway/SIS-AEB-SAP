import {Button} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import InputLayout from "../../modules/InputLayout";
import PropTypes from "prop-types";
import Selector from "../../modules/inputs/Selector";
import getComponentLanguage from "../../../utils/shared/GetComponentLanguage";
import Alert from "../../layout/Alert";
import HorizontalTabs from "../../layout/navigation/HorizontalTabs";
import TabContent from "../TabContent";
import styles from '../../../styles/component/Component.module.css'

export default function CollaborationForm(props) {

    const [lang, setLang] = useState(null)
    const [changed, setChanged] = useState(false)
    const [status, setStatus] = useState({
        type: undefined,
        message: undefined
    })
    const [openTab, setOpenTab] = useState(0)

    useEffect(() => {
        if (lang === null)
            setLang(getComponentLanguage({locale: props.locale, component: 'collaborationForm'}))
    }, [])

    function disabled() {

        return (
            props.collaboration.unit === null ||
            props.collaboration.official_publication_date === null ||
            props.collaboration.admission_date === null ||
            props.collaboration.legal_document === null ||
            props.collaboration.substitute === null ||
            props.collaboration.active_collaboration === null ||
            props.collaboration.linkage === null ||
            props.collaboration.access_profile === null ||
            !props.collaboration.unit ||
            !props.collaboration.official_publication_date ||
            !props.collaboration.admission_date ||
            !props.collaboration.legal_document ||
            props.collaboration.substitute === undefined ||
            props.collaboration.active_collaboration === undefined ||
            !props.collaboration.linkage ||
            !props.collaboration.access_profile ||
            !changed

        )
    }

    if (lang !== null)
        return (
            <div className={styles.collaborationContainer}>

                <Alert
                    type={status.type} render={status.type !== undefined}
                    handleClose={() => setStatus({type: undefined, message: undefined})} message={status.message}
                />
                <div style={{gridRow: 1, width: '100%',}}>
                    <HorizontalTabs
                        buttons={[
                            {key: 0, value: lang.placement},
                            {key: 1, value: lang.role},
                            {key: 2, value: lang.contract},
                        ]}
                        setOpenTab={setOpenTab}
                        openTab={openTab}
                        highlight={false}
                        noMargin={true}
                    />
                </div>
                <div style={{
                    display: 'inline-flex',
                    flexFlow: 'row wrap',
                    gap: '32px',
                    justifyContent: 'center',
                    width: '100%',
                    alignContent: 'center',
                    gridRow: 2,
                    padding: '22px'
                }}>


                    <TabContent
                        noContainer={true}
                        openTab={openTab}
                        tabs={[
                            {
                                buttonKey: 0, value:
                                    < >
                                        <Selector required={true}
                                                  selected={
                                                      props.collaboration.unit !== undefined && props.collaboration.unit !== null ? {
                                                          key: props.collaboration.unit && props.collaboration.unit.id ? props.collaboration.unit.id : props.collaboration.unit.key,
                                                          value: props.collaboration.unit && props.collaboration.unit.acronym ? props.collaboration.unit.acronym : props.collaboration.unit.value
                                                      } : undefined
                                                  }
                                                  handleChange={event => props.handleChange({
                                                      name: 'unit',
                                                      value: event
                                                  })}
                                                  label={lang.unit}
                                                  data={props.units} width={'calc(50% - 16px)'}
                                                  key={'collaboration-field-1'} setChanged={setChanged}
                                        />

                                        <Selector required={true}
                                                  selected={props.collaboration.linkage !== undefined && props.collaboration.linkage !== null ? {
                                                      key: props.collaboration.linkage && props.collaboration.linkage.id ? props.collaboration.linkage.id : props.collaboration.linkage.key,
                                                      value: props.collaboration.linkage && props.collaboration.linkage.denomination ? props.collaboration.linkage.denomination : props.collaboration.linkage.value
                                                  } : null}
                                                  handleChange={event => props.handleChange({
                                                      name: 'linkage',
                                                      value: event
                                                  })}
                                                  setChanged={setChanged}
                                                  label={lang.linkage} key={'collaboration-field-5'}
                                                  data={props.linkages} disabled={!props.collaboration.unit}
                                                  width={'calc(50% - 16px)'}/>

                                        <Selector required={false}
                                                  selected={props.collaboration.senior_member !== undefined && props.collaboration.senior_member !== null ? {
                                                      key: props.collaboration.senior_member && props.collaboration.senior_member.id,
                                                      value: props.collaboration.senior_member && props.collaboration.senior_member.name,
                                                  } : undefined}
                                                  handleChange={event => props.handleChange({
                                                      name: 'senior_member',
                                                      value: event !== undefined && event !== null ? {
                                                          id: event.key,
                                                          name: event.value
                                                      } : event
                                                  })}
                                                  setChanged={setChanged} disabled={props.seniors.length === 0}
                                                  label={lang.senior} key={'collaboration-field-7'}
                                                  data={props.seniors} width={'calc(50% - 16px)'}/>
                                        <Selector required={true}
                                                  selected={props.collaboration.access_profile !== undefined && props.collaboration.access_profile !== null ? {
                                                      key: props.collaboration.access_profile && props.collaboration.access_profile.id ? props.collaboration.access_profile.id : props.collaboration.access_profile.key,
                                                      value: props.collaboration.access_profile && props.collaboration.access_profile.denomination ? props.collaboration.access_profile.denomination : props.collaboration.access_profile.value
                                                  } : undefined}
                                                  handleChange={event => props.handleChange({
                                                      name: 'access_profile',
                                                      value: event
                                                  })}
                                                  setChanged={setChanged} disabled={!props.collaboration.unit}
                                                  label={lang.access} key={'collaboration-field-6'}
                                                  data={props.accessProfiles} width={'calc(50% - 16px)'}/>

                                    </>
                            },
                            {
                                buttonKey: 1, value:
                                    <>

                                        <InputLayout inputName={lang.active} dark={props.dark}
                                                     handleChange={props.handleChange}
                                                     inputType={1}
                                                     disabled={!props.collaboration.unit}
                                                     size={'calc(33.333% - 21.35px)'}
                                                     required={true}
                                                     initialValue={props.collaboration.active_collaboration}
                                                     name={'active_collaboration'}
                                                     selectFields={[{key: false, value: 'No'}, {
                                                         key: true,
                                                         value: 'Yes'
                                                     }]}
                                                     key={'collaboration-field-8'}
                                                     setChanged={setChanged}/>
                                        <Selector required={false} selected={props.collaboration.effective_role}
                                                  handleChange={event => props.handleChange({
                                                      name: 'effective_role',
                                                      value: event
                                                  })}
                                                  setChanged={setChanged} disabled={!props.collaboration.unit}
                                                  label={lang.effective} key={'collaboration-field-2'}
                                                  data={props.effectiveRoles} width={'calc(33.333% - 21.35px)'}/>

                                        <Selector required={false} selected={props.collaboration.commissioned_role}
                                                  handleChange={event => props.handleChange({
                                                      name: 'commissioned_role',
                                                      value: event
                                                  })}
                                                  setChanged={setChanged} disabled={!props.collaboration.unit}
                                                  label={lang.commissioned} key={'collaboration-field-3'}
                                                  data={props.commissionedRoles}
                                                  width={'calc(33.333% - 21.35px)'}/>

                                        <InputLayout inputName={lang.substitute} dark={props.dark}
                                                     handleChange={props.handleChange}
                                                     inputType={1}
                                                     disabled={!props.collaboration.unit} size={'calc(50% - 16px)'}
                                                     required={true}
                                                     initialValue={props.collaboration.substitute}
                                                     selectFields={[{key: false, value: 'No'}, {
                                                         key: true,
                                                         value: 'Yes'
                                                     }]}
                                                     key={'collaboration-field-10'} name={'substitute'}
                                                     setChanged={setChanged}/>
                                        <InputLayout inputName={lang.additional} dark={props.dark}
                                                     handleChange={props.handleChange}
                                                     inputType={0} name={'additional_role_information'}
                                                     disabled={!props.collaboration.unit} size={'calc(50% - 16px)'}
                                                     required={false}
                                                     initialValue={props.collaboration.additional_role_information}
                                                     key={'collaboration-field-4'}
                                                     setChanged={setChanged}/>


                                    </>
                            },
                            {
                                buttonKey: 2, value:
                                    <>
                                        <InputLayout inputName={lang.admission} dark={props.dark}
                                                     handleChange={props.handleChange}
                                                     inputType={2}
                                                     disabled={!props.collaboration.unit} size={'calc(25% - 24px)'}
                                                     required={true}
                                                     initialValue={props.collaboration.admission_date}
                                                     key={'collaboration-field-12'} name={'admission_date'}
                                                     setChanged={setChanged}/>

                                        <InputLayout inputName={lang.publication} dark={props.dark}
                                                     handleChange={props.handleChange}
                                                     inputType={2} name={'official_publication_date'}
                                                     disabled={!props.collaboration.unit} size={'calc(25% - 24px)'}
                                                     required={true}
                                                     initialValue={props.collaboration.official_publication_date}
                                                     key={'collaboration-field-13'}
                                                     setChanged={setChanged}/>

                                        <InputLayout inputName={lang.exp} dark={props.dark}
                                                     handleChange={props.handleChange}
                                                     inputType={2} name={'contract_expiration'}
                                                     disabled={!props.collaboration.unit} size={'calc(25% - 24px)'}
                                                     required={false}
                                                     initialValue={props.collaboration.contract_expiration}
                                                     key={'collaboration-field-14'}
                                                     setChanged={setChanged}/>

                                        <InputLayout inputName={lang.legalDocument} dark={props.dark}
                                                     handleChange={props.handleChange}
                                                     inputType={0} name={'legal_document'}
                                                     disabled={!props.collaboration.unit} size={'calc(25% - 24px)'}
                                                     required={true}
                                                     initialValue={props.collaboration.legal_document}
                                                     key={'collaboration-field-11'}
                                                     setChanged={setChanged}/>
                                        <InputLayout inputName={lang.start} dark={props.dark}
                                                     handleChange={props.handleChange}
                                                     inputType={3} name={'work_shift_start'}
                                                     disabled={!props.collaboration.unit} size={'calc(50% - 16px)'}
                                                     required={false}
                                                     initialValue={props.collaboration.work_shift_start}
                                                     key={'collaboration-field-15'}
                                                     setChanged={setChanged}/>

                                        <InputLayout inputName={lang.end} dark={props.dark}
                                                     handleChange={props.handleChange}
                                                     inputType={3} name={'work_shift_end'}
                                                     disabled={!props.collaboration.unit} size={'calc(50% - 16px)'}
                                                     required={false}
                                                     initialValue={props.collaboration.work_shift_end}
                                                     key={'collaboration-field-16'}
                                                     setChanged={setChanged}/>
                                    </>
                            }
                        ]}/>
                </div>
                <div style={{gridRow: 3, display: "flex", justifyContent: 'center'}}>
                    <Button
                        style={{
                            width: 'auto',
                            backgroundColor: disabled() ? 'rgba(0,0,0,0.07)' : '#0095ff',
                            color: disabled() ? '#777777' : 'white',
                            fontWeight: 550,
                        }} variant={'contained'}
                        disabled={disabled()}
                        onClick={() => props.submitChanges({
                            data: props.collaboration,
                            create: props.collaboration.id === undefined,
                            memberID: props.memberID,
                            collaborationID: props.collaborationID,
                            setStatus: setStatus
                        }).then(res => {
                            setChanged(!res)
                            if(props.collaborationID === undefined || props.collaborationID === null)
                                props.setAccepted(res)
                        })}>
                        {props.collaborationID !== undefined && props.collaborationID !== null ? lang.save : lang.create}
                    </Button>
                </div>
            </div>
        )
    else
        return null
}
CollaborationForm.propTypes = {
    memberID: PropTypes.any,
    collaboration: PropTypes.object,
    handleChange: PropTypes.func,
    submitChanges: PropTypes.func,
    units: PropTypes.array,
    seniors: PropTypes.array,
    effectiveRoles: PropTypes.array,
    commissionedRoles: PropTypes.array,
    linkages: PropTypes.array,
    collaborationID: PropTypes.any,
    setAccepted: PropTypes.func,
    locale: PropTypes.string
}
