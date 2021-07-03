import React, {useState} from 'react';
import PropTypes from 'prop-types'
import CountryOptions from "../../../packages/options/CountryOptions";
import StateOptions from "../../../packages/options/StateSelector";
import {DateField, DropDownField, ImageField, TextField} from "sis-aeb-inputs"
import {Alert, EntityLayout} from "sis-aeb-misc";
import BaseFormPT from "../../../packages/locales/person/BaseFormPT";
import submitPerson from "../../../utils/submit/SubmitPerson";
import ContractualLinkageDescription from "../../../packages/descriptions/ContractualLinkageDescription";
import Cookies from "universal-cookie/lib";
import Host from "../../../utils/shared/Host";
import PersonalKeys from "../../../packages/keys/PersonalKeys";
import PersonOverview from "../../../packages/overview/PersonOverview";

export default function BaseForm(props) {


    const [changed, setChanged] = useState(false)
    const lang = BaseFormPT
    const [status, setStatus] = useState({
        type: undefined,
        message: undefined
    })

    return (
        <>
            <Alert
                type={status.type} render={status.type !== undefined} rootElementID={'root'}
                handleClose={() => setStatus({type: undefined, message: undefined})} message={status.message}
            />

            <EntityLayout
                information={ContractualLinkageDescription}
                fields={PersonOverview} entityID={props.create ? undefined : props.data.id}
                rootElementID={'root'} entity={props.data}
                create={props.create} label={lang.title} entityKey={PersonalKeys.person} fetchToken={(new Cookies()).get('jwt')}
                fetchUrl={Host() + 'list/object'} exists={true} fetchSize={15} setVersion={() => null}
                dependencies={{
                    fields: [
                        {name: 'name', type: 'string'},
                        {name: 'nationality', type: 'string'},
                        {name: 'birth_place', type: 'string'},
                        {name: 'birth', type: 'number'},
                        {name: 'disabled_person', type: 'bool'},
                        {name: 'education', type: 'object'},
                        {name: 'gender', type: 'object'},
                        {name: 'marital_status', type: 'object'},
                    ],
                    changed: changed,
                    entity: props.data
                }} returnButton={true}
                handleSubmit={() =>
                    submitPerson({
                        pk: props.data === null ? null : props.data.id,
                        data: props.data,
                        setStatus: setStatus
                    }).then(res => {
                        if (props.data !== null && props.data !== undefined && res.status && (props.data.id === undefined || props.data.id === null))
                            props.redirect(res.id)
                        setChanged(!res.status)
                    })
                }
                handleClose={() => props.returnToMain()}
                forms={[{
                    title: lang.personal,
                    child: (
                        <>
                            <ImageField
                                dark={true}
                                initialImage={props.data.image !== null ? props.data.image : null}
                                size={'100px'}
                                setImage={event => props.handleChange({
                                    name: 'image',
                                    value: event !== null ? event.target.files[0] : null
                                })} label={lang.personImage}
                                width={'calc(25% - 24px)'} setChanged={setChanged}/>

                            <TextField
                                dark={true}
                                placeholder={lang.name} label={lang.name}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'name', value: event.target.value})
                                }}
                                value={props.data === null ? null : props.data.name} required={true}
                                width={'calc(75% - 12px)'}
                                maxLength={undefined}/>

                            <DateField
                                dark={true}
                                placeholder={lang.birth} label={lang.birth}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'birth', value: event.target.value})
                                }}
                                value={
                                    typeof (props.data === null ? null : props.data.birth) === 'number' ?
                                        new Date(props.data === null ? null : props.data.birth).toLocaleDateString().replaceAll('/', '-'
                                        ).replace(/(\d{2})-(\d{2})-(\d{4})/, "$3-$2-$1")
                                        :
                                        props.data === null ? null : props.data.birth
                                }
                                required={true} width={'calc(50% - 16px)'}/>


                            <DropDownField
                                dark={true}
                                placeholder={lang.disabledPerson}
                                label={lang.disabledPerson}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'disabled_person', value: event})
                                }} value={props.data === null ? null : props.data.disabled_person}
                                required={true}
                                width={'calc(50% - 16px)'} choices={lang.choice}/>
                        </>
                    )
                },
                    {
                        title: lang.life,
                        child: (
                            <>
                                <DropDownField
                                    dark={true}
                                    placeholder={lang.gender}
                                    label={lang.gender}
                                    handleChange={event => {
                                        setChanged(true)
                                        props.handleChange({name: 'gender', value: event})
                                    }} value={props.data === null ? null : props.data.gender} required={true}
                                    width={'calc(33.333% - 21.35px)'} choices={lang.genderChoice}/>

                                <DropDownField
                                    dark={true}
                                    placeholder={lang.education}
                                    label={lang.education}
                                    handleChange={event => {
                                        setChanged(true)
                                        props.handleChange({name: 'education', value: event})
                                    }} value={props.data === null ? null : props.data.education} required={true}
                                    width={'calc(33.333% - 21.35px)'} choices={lang.educationChoice}/>

                                <DropDownField
                                    dark={true}
                                    placeholder={lang.marital}
                                    label={lang.marital}
                                    handleChange={event => {
                                        setChanged(true)
                                        props.handleChange({name: 'marital_status', value: event})
                                    }}

                                    value={props.data === null ? null : props.data.marital_status} required={true}
                                    width={'calc(33.333% - 21.35px)'}
                                    choices={lang.maritalChoice}/>
                            </>
                        )
                    },
                    {
                        title: lang.parents,
                        child: (
                            <>
                                <TextField
                                    dark={true}
                                    placeholder={lang.father} label={lang.father}
                                    handleChange={event => {
                                        setChanged(true)
                                        props.handleChange({
                                            name: 'father_name',
                                            value: event.target.value
                                        })
                                    }} value={props.data === null ? null : props.data.father_name}
                                    required={false}
                                    width={'calc(50% - 16px)'}/>

                                <TextField
                                    dark={true}
                                    placeholder={lang.mother}
                                    label={lang.mother}
                                    handleChange={event => {
                                        setChanged(true)
                                        props.handleChange({name: 'mother_name', value: event.target.value})
                                    }}

                                    value={props.data === null ? null : props.data.mother_name}
                                    required={false}
                                    width={'calc(50% - 16px)'}/>


                                <DropDownField

                                    placeholder={lang.birthPlace}
                                    label={lang.birthPlace}
                                    handleChange={event => {
                                        setChanged(true)
                                        props.handleChange({name: 'birth_place', value: event})
                                    }}

                                    value={props.data === null ? null : props.data.birth_place} required={true}
                                    width={'calc(50% - 16px)'}
                                    choices={StateOptions}/>
                                <DropDownField

                                    placeholder={lang.nationality}
                                    label={lang.nationality}
                                    handleChange={event => {
                                        setChanged(true)
                                        props.handleChange({name: 'nationality', value: event})
                                    }}

                                    value={props.data === null ? null : props.data.nationality} required={true}
                                    width={'calc(50% - 16px)'}
                                    choices={CountryOptions}/>


                            </>
                        )
                    },
                ]}/>
        </>
    )

}

BaseForm.propTypes = {
    id: PropTypes.number,
    data: PropTypes.object,
    handleChange: PropTypes.func,
    editable: PropTypes.bool,
    returnToMain: PropTypes.func,
    create: PropTypes.bool,
    redirect: PropTypes.func
}
