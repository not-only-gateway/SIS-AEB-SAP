import React, {useState} from 'react';
import PropTypes from 'prop-types'

import {Alert, EntityLayout, Selector} from "sis-aeb-misc";
import {DropDownField, TextField} from "sis-aeb-inputs";

import MembershipPT from "../../../packages/locales/person/MembershipPT";

import submitCollaborator from "../../../utils/submit/SubmitCollaborator";
import Host from "../../../utils/shared/Host";
import Cookies from "universal-cookie/lib";
import CommissionedLinkageOverview from "../../../packages/overview/CommissionedLinkageOverview";
import ContractualLinkageDescription from "../../../packages/descriptions/ContractualLinkageDescription";
import OrganizationalKeys from "../../../packages/keys/OrganizationalKeys";
import CorporateKeys from "../../../packages/keys/CorporateKeys";
import CollaboratorOverview from "../../../packages/overview/CollaboratorOverview";

const cookies = new Cookies()

export default function CollaboratorForm(props) {

    const lang = MembershipPT
    const [changed, setChanged] = useState(false)
    const [status, setStatus] = useState({
        error: undefined,
        message: undefined
    })


    return (
        <>
            <Alert
                type={status.type} render={status.type !== undefined} rootElementID={'root'}
                handleClose={() => setStatus({type: undefined, message: undefined})} message={status.message}
            />

            <EntityLayout
                fields={CollaboratorOverview} entityID={props.create ? undefined : props.data.person}
                rootElementID={'root'} entity={props.data} information={ContractualLinkageDescription}
                create={props.create} label={lang.title} entityKey={CorporateKeys.collaborator}
                fetchToken={(new Cookies()).get('jwt')}
                fetchUrl={Host() + 'list/object'} exists={true} fetchSize={15} setVersion={() => null}


                dependencies={{
                    fields: [
                        {name: 'extension', type: 'string'},
                        {name: 'corporate_email', type: 'string'},
                        {name: 'home_office', type: 'bool'}
                    ],
                    changed: changed,
                    entity: props.data
                }} returnButton={true}

                handleSubmit={() => {
                    submitCollaborator({
                        pk: props.id,
                        data: props.data,
                        setStatus: setStatus,
                        create: props.create
                    }).then(res => {
                        setChanged(!res)
                    })
                }}
                handleClose={() => props.returnToMain()}
                forms={[

                    {
                        title: lang.general,
                        child: (
                            <>
                                <TextField
                                    dark={true}
                                    placeholder={lang.registration} label={lang.registration}
                                    handleChange={event => {
                                        setChanged(true)
                                        props.handleChange({name: 'registration', value: event.target.value})
                                    }} locale={props.locale}
                                    value={props.data === null ? null : props.data.registration}
                                    required={false}
                                    width={'calc(33.333% - 21.5px)'} maxLength={undefined}/>


                                <TextField
                                    dark={true}
                                    placeholder={lang.corporateEmail} label={lang.corporateEmail}
                                    handleChange={event => {
                                        setChanged(true)
                                        props.handleChange({
                                            name: 'corporate_email',
                                            value: event.target.value
                                        })
                                    }} locale={props.locale}
                                    value={props.data === null ? null : props.data.corporate_email}
                                    required={true}
                                    width={'calc(33.333% - 21.5px)'}
                                    maxLength={undefined}/>
                                <Selector
                                    getEntityKey={entity => {
                                        if (entity !== null && entity !== undefined)
                                            return entity.id
                                        else return -1
                                    }}
                                    handleChange={entity => {
                                        setChanged(true)
                                        props.handleChange({name: 'access_profile', value: entity})
                                    }}
                                    selected={props.data === null ? null : props.data.access_profile}
                                    setChanged={setChanged} required={true} label={lang.access}
                                    disabled={false} width={'calc(33.333% - 21.5px)'}
                                    renderEntity={entity => {
                                        if (entity !== undefined && entity !== null)
                                            return (
                                                <div style={{display: 'flex', alignItems: 'center'}}>
                                                    {entity.denomination}
                                                </div>
                                            )
                                        else
                                            return null
                                    }} fetchUrl={Host() + 'list/access'} fetchToken={(new Cookies()).get('jwt')}
                                    elementRootID={'root'} selectorKey={'access_profile-selector'}
                                />
                                <TextField
                                    dark={true}
                                    placeholder={lang.extension} label={lang.extension}
                                    handleChange={event => {
                                        setChanged(true)
                                        props.handleChange({name: 'extension', value: event.target.value})
                                    }} locale={props.locale}
                                    value={props.data === null ? null : props.data.extension}
                                    required={true}
                                    width={'calc(50% - 16px)'}
                                    maxLength={undefined} phoneMask={true}/>

                                <TextField
                                    dark={true}
                                    placeholder={lang.altPhone} label={lang.altPhone}
                                    handleChange={event => {
                                        setChanged(true)
                                        props.handleChange({
                                            name: 'alternative_phone',
                                            value: event.target.value
                                        })
                                    }} locale={props.locale}
                                    value={props.data === null ? null : props.data.alternative_phone}
                                    required={false}
                                    width={'calc(50% - 16px)'}
                                    maxLength={undefined} phoneMask={true}/>


                            </>
                        )
                    },
                    {
                        title: lang.linkages,
                        child: (
                            <>
                                <Selector
                                    getEntityKey={entity => {
                                        if (entity !== undefined && entity !== null)
                                            return entity.id
                                        else
                                            return -1
                                    }}
                                    handleChange={entity => {

                                        setChanged(true)
                                        props.handleChange({name: 'occupancy', value: entity})
                                    }} selectorKey={'occupancy-selector'}
                                    selected={props.data === null ? null : props.data.occupancy}
                                    setChanged={event => {

                                        setChanged(event)
                                    }}
                                    required={false} label={lang.contractualLinkage}
                                    disabled={false}
                                    width={'100%'}
                                    renderEntity={entity => {
                                        if (entity !== undefined && entity !== null)
                                            return (
                                                <div style={{display: 'flex', alignItems: 'center'}}>
                                                    {entity.denomination}
                                                </div>
                                            )
                                        else
                                            return <div/>
                                    }} fetchUrl={Host() + 'list/empty/occupancy'}
                                    fetchToken={(cookies).get('jwt')}
                                    elementRootID={'root'}/>

                                <Selector
                                    getEntityKey={entity => {
                                        if (entity !== undefined && entity !== null)
                                            return entity.id
                                        else
                                            return -1
                                    }}
                                    handleChange={entity => {

                                        setChanged(true)
                                        props.handleChange({name: 'main_commissioned_linkage', value: entity})
                                    }} selectorKey={'vacancy-selector'}
                                    selected={props.data === null ? null : props.data.main_commissioned_linkage}
                                    setChanged={event => {

                                        setChanged(event)
                                    }}
                                    required={false} label={lang.commissionedLinkage}
                                    disabled={false}
                                    width={'100%'}
                                    renderEntity={entity => {

                                        if (entity !== undefined && entity !== null)
                                            return (
                                                <div style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between',
                                                    width: '100%'
                                                }}>
                                                    <div>
                                                        {entity.unit_role.role.denomination}
                                                    </div>
                                                    <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
                                                        {entity.unit_role.unit.name}
                                                        <div style={{
                                                            borderRight: '#e0e0e0 1px solid',
                                                            width: '1px',
                                                            height: '20px'
                                                        }}/>
                                                        {entity.unit_role.unit.acronym}
                                                    </div>
                                                </div>
                                            )
                                        else
                                            return <div/>
                                    }} fetchUrl={Host() + 'list/empty/linkages/commissioned'}
                                    fetchToken={(cookies).get('jwt')}
                                    elementRootID={'root'}/>
                            </>
                        )
                    },
                    {
                        title: lang.work,
                        child: (
                            <>
                                <DropDownField
                                    dark={true}
                                    placeholder={lang.homeOffice}
                                    label={lang.homeOffice}
                                    handleChange={event => {
                                        setChanged(true)
                                        props.handleChange({name: 'home_office', value: event})
                                    }} locale={props.locale}
                                    value={props.data === null ? null : props.data.home_office}
                                    required={true}
                                    width={'calc(33.333% - 21.5px)'} choices={lang.options}/>

                                <TextField

                                    placeholder={lang.workShiftStart} label={lang.workShiftStart}
                                    handleChange={event => {
                                        setChanged(true)
                                        props.handleChange({name: 'work_shift_start', value: event.target.value})
                                    }} type={'time'}
                                    value={props.data === null ? null : props.data.work_shift_start}
                                    required={false} width={'calc(33.333% - 21.5px)'}
                                />


                                <TextField

                                    placeholder={lang.workShiftEnd} label={lang.workShiftEnd}
                                    handleChange={event => {
                                        setChanged(true)
                                        props.handleChange({name: 'work_shift_end', value: event.target.value})
                                    }} type={'time'}
                                    value={props.data === null ? null : props.data.work_shift_end}
                                    required={false} width={'calc(33.333% - 21.5px)'}
                                />
                            </>
                        )
                    }

                ]}/>
        </>
    )


}

CollaboratorForm.propTypes = {
    id: PropTypes.number,
    data: PropTypes.object,
    handleChange: PropTypes.func,
    editable: PropTypes.bool,

    create: PropTypes.bool,
    returnToMain: PropTypes.func
}
