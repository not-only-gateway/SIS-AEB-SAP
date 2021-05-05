import {Button} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import InputLayout from "../../modules/InputLayout";
import PropTypes from "prop-types";
import saveComponentChanges from "../../../utils/person/SaveChanges";
import fetchComponentData from "../../../utils/person/FetchData";
import mapToSelect from "../../../utils/person/MapToSelect";
import mainStyles from '../../../styles/shared/Main.module.css'
import Selector from "../../modules/selector/Selector";


export default function CollaborationForm(props) {


    const [changed, setChanged] = useState(false)

    function disabled() {
        return (
            props.collaboration.unit === null ||
            props.collaboration.official_publication_date === null ||
            props.collaboration.admission_date === null ||
            props.collaboration.legal_document === null ||
            props.collaboration.is_substitute === null ||
            props.collaboration.is_active_on_role === null ||
            props.collaboration.linkage === null ||
            props.collaboration.access_level_profile === null ||
            props.collaboration.unit ||
            props.collaboration.official_publication_date ||
            props.collaboration.admission_date ||
            props.collaboration.legal_document ||
            props.collaboration.substitute ||
            props.collaboration.is_active_on_role ||
            props.collaboration.linkage ||
            props.collaboration.access_level_profile ||
            !changed

        )
    }

    return (
        <div
            className={[mainStyles.displayWarp, mainStyles.displayInlineCenter].join(' ')}
            style={{marginTop: '10px'}}>
            <Selector required={true} selected={props.collaboration.unit}
                      handleChange={event => props.handleChange({name: 'unit', value: event})} label={'Unit'}
                      data={props.units} width={'calc(25% - 12px)'}
                      key={'2-1-' + props.index} setChanged={setChanged}
            />

            <Selector required={false} selected={props.collaboration.effective_role}
                      handleChange={event => props.handleChange({name: 'effective_role', value: event})}
                      setChanged={setChanged}
                      label={'Effective Role'} key={'2-4-' + props.index}
                      data={props.effectiveRoles} width={'calc(25% - 12px)'}/>

            <Selector required={false} selected={props.collaboration.commissioned_role}
                      handleChange={event => props.handleChange({name: 'commissioned_role', value: event})}
                      setChanged={setChanged}
                      label={'Commissioned Role'} key={'2-5-' + props.index}
                      data={props.commissionedRoles}
                      width={'calc(25% - 12px)'}/>
            <div style={{marginTop: 'auto', width: 'calc(25% - 12px)'}}>
                <InputLayout inputName={'Additional Role information'} dark={props.dark}
                             handleChange={props.handleChange}
                             inputType={0} name={'additional_information'}
                             disabled={!props.editable} size={'100%'} required={false}
                             initialValue={props.collaboration.additional_information}
                             key={'2-15-' + props.index}
                             setChanged={setChanged}/>
            </div>

            <Selector required={true} selected={props.collaboration.linkage}
                      handleChange={event => props.handleChange({name: 'linkage', value: event})}
                      setChanged={setChanged}
                      label={'Linkage'} key={'linkage-' + props.index}
                      data={props.linkages}
                      width={'calc(25% - 12px)'}/>

            <Selector required={true} selected={props.collaboration.access_level_profile}
                      handleChange={event => props.handleChange({name: 'access_level_profile', value: event})}
                      setChanged={setChanged}
                      label={'Access Profile'} key={'2-14-' + props.index}
                      data={props.accessProfiles} width={'calc(25% - 12px)'}/>

            <Selector required={true} selected={props.collaboration.senior_member}
                      handleChange={event => props.handleChange({name: 'senior_member', value: event})}
                      setChanged={setChanged}
                      label={'Senior'} key={'2-7-' + props.index}
                      data={props.seniors} width={'calc(50% - 8px)'}/>


            <InputLayout inputName={'Active Role'} dark={props.dark} handleChange={props.handleChange} inputType={1}
                         disabled={!props.editable} size={'calc(25% - 12px)'} required={true}
                         initialValue={props.collaboration.is_active_on_role} name={'is_active_on_role'}
                         selectFields={[{key: false, value: 'No'}, {key: true, value: 'Yes'}]}
                         key={'2-2-' + props.index}
                         setChanged={setChanged}/>

            <InputLayout inputName={'Main Collaboration'} dark={props.dark} handleChange={props.handleChange}
                         inputType={1} name={'main_collaboration'}
                         disabled={(!props.editable || !props.canBeMain) && (props.collaboration.main_collaboration === null || !props.collaboration.main_collaboration)}
                         size={'calc(25% - 12px)'} required={true}
                         initialValue={props.collaboration.main_collaboration}
                         selectFields={[{key: false, value: 'No'}, {key: true, value: 'Yes'}]}
                         key={'2-3-' + props.index}
                         setChanged={setChanged}/>

            <InputLayout inputName={'Substitute'} dark={props.dark} handleChange={props.handleChange} inputType={1}
                         disabled={!props.editable} size={'calc(25% - 12px)'} required={true}
                         initialValue={props.collaboration.is_substitute}
                         selectFields={[{key: false, value: 'No'}, {key: true, value: 'Yes'}]}
                         key={'2-6-' + props.index} name={'is_substitute'}
                         setChanged={setChanged}/>

            <InputLayout inputName={'Legal Document'} dark={props.dark} handleChange={props.handleChange}
                         inputType={0} name={'legal_document'}
                         disabled={!props.editable} size={'calc(25% - 12px)'} required={true}
                         initialValue={props.collaboration.legal_document}
                         key={'2-11-' + props.index}
                         setChanged={setChanged}/>


            <InputLayout inputName={'Admission'} dark={props.dark} handleChange={props.handleChange} inputType={2}
                         disabled={!props.editable} size={'calc(33.333% - 10.666px'} required={true}
                         initialValue={props.collaboration.admission_date}
                         key={'2-8-' + props.index} name={'admission_date'}
                         setChanged={setChanged}/>

            <InputLayout inputName={'Official Publication'} dark={props.dark} handleChange={props.handleChange}
                         inputType={2} name={'official_publication_date'}
                         disabled={!props.editable} size={'calc(33.333% - 10.666px'} required={true}
                         initialValue={props.collaboration.official_publication_date}
                         key={'2-9-' + props.index}
                         setChanged={setChanged}/>

            <InputLayout inputName={'Contract Expiration'} dark={props.dark} handleChange={props.handleChange}
                         inputType={2} name={'contract_expiration'}
                         disabled={!props.editable} size={'calc(33.333% - 10.666px'} required={false}
                         initialValue={props.collaboration.contract_expiration}
                         key={'2-10-' + props.index}
                         setChanged={setChanged}/>

            <InputLayout inputName={'Work shift start'} dark={props.dark} handleChange={props.handleChange}
                         inputType={3} name={'work_shift_start'}
                         disabled={!props.editable} size={'calc(50% - 8px)'} required={false}
                         initialValue={props.collaboration.work_shift_start}
                         key={'2-12-' + props.index}
                         setChanged={setChanged}/>

            <InputLayout inputName={'Work shift end'} dark={props.dark} handleChange={props.handleChange}
                         inputType={3} name={'work_shift_end'}
                         disabled={!props.editable} size={'calc(50% - 8px)'} required={false}
                         initialValue={props.collaboration.work_shift_end}
                         key={'2-13-' + props.index}
                         setChanged={setChanged}/>


            <Button style={{
                width: '100%', marginTop: '50px',
                backgroundColor: disabled() ? 'rgba(0,0,0,0.07)' : '#0095ff',
                color: disabled() ? '#777777' : 'white',
                fontWeight: 550,

            }} variant={'contained'}
                    disabled={disabled()}
                    onClick={() => props.submitChanges({
                        data: props.collaboration,
                        create: props.collaboration.id === undefined,
                        memberID: props.memberID
                    }).then(res => setChanged(res))}>Save</Button>
        </div>
    )
}
CollaborationForm.propTypes = {
    memberID: PropTypes.number,
    collaboration: PropTypes.object,
    handleChange: PropTypes.func,
    submitChanges: PropTypes.func,
    units: PropTypes.array,
    seniors: PropTypes.array,
    effectiveRoles: PropTypes.array,
    commissionedRoles: PropTypes.array,
    linkages: PropTypes.array,
    canBeMain: PropTypes.bool
}
