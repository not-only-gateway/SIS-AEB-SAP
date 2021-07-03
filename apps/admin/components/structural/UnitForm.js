import React, {useState} from "react";
import PropTypes from 'prop-types'
import {DropDownField, TextField} from "sis-aeb-inputs";
import {Alert, EntityLayout, Selector} from "sis-aeb-misc";
import UnitFormPT from "../../packages/locales/unit/UnitFormPT";
import Host from "../../utils/shared/Host";
import Cookies from "universal-cookie/lib";
import submitUnit from "../../utils/submit/SubmitUnit";
import ContractualLinkageDescription from "../../packages/descriptions/ContractualLinkageDescription";
import UnitOverview from "../../packages/overview/UnitOverview";
import StructuralKeys from "../../packages/keys/StructuralKeys";


export default function UnitForm(props) {

    const [changed, setChanged] = useState(false)
    const lang = UnitFormPT
    const [status, setStatus] = useState({
        type: undefined, message: undefined
    })

    return (
        <>
            <Alert
                type={status.type} render={status.type !== undefined} rootElementID={'root'}
                handleClose={() => setStatus({type: undefined, message: undefined})} message={status.message}
            />

            <EntityLayout
                information={ContractualLinkageDescription}
                fields={UnitOverview} entityID={props.create ? undefined : props.data.id}
                rootElementID={'root'} entity={props.data}
                create={props.create} label={lang.title} entityKey={StructuralKeys.unit} fetchToken={(new Cookies()).get('jwt')}
                fetchUrl={Host() + 'list/object'} exists={true} fetchSize={15} setVersion={() => null}
                dependencies={{
                    fields: [
                        {name: 'acronym', type: 'string'},
                        {name: 'name', type: 'string'},
                        {name: 'is_decentralized', type: 'bool'},
                        {name: 'sphere', type: 'string'},
                        {name: 'power', type: 'string'},
                        {name: 'legal_nature', type: 'string'},
                        {name: 'change_type', type: 'string'},
                        {name: 'category', type: 'string'},
                        {name: 'parent_entity', type: 'object'},
                    ],
                    changed: changed,
                    entity: props.data
                }} returnButton={true}
                handleSubmit={() =>
                    submitUnit({
                        pk: props.id,
                        data: props.data,
                        setStatus: setStatus,
                        create: props.create
                    }).then(res => {
                        setChanged(!res)
                    })}
                handleClose={() => props.returnToMain()}
                forms={[{
                    title: lang.basic,
                    child: (
                        <>
                            <TextField

                                placeholder={lang.acronym} label={lang.acronym}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'acronym', value: event.target.value})
                                }} locale={props.locale} value={props.data === null ? null : props.data.acronym}
                                required={true}
                                width={'calc(33.333% - 21.35px)'}/>

                            <TextField

                                placeholder={lang.denomination} label={lang.denomination}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'name', value: event.target.value})
                                }} locale={props.locale} value={props.data === null ? null : props.data.name}
                                required={true}
                                width={'calc(33.333% - 21.35px)'}/>

                            <DropDownField

                                placeholder={lang.decentralized}
                                label={lang.decentralized}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'is_decentralized', value: event})
                                }} locale={props.locale}
                                value={props.data === null ? null : props.data.is_decentralized}
                                required={true}
                                width={'calc(33.333% - 21.35px)'} choices={lang.choice}/>

                        </>
                    )
                },
                    {
                        title: lang.information,
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
                                        props.handleChange({name: 'parent_entity', value: entity})
                                    }} selectorKey={'parent-entity-selector'}
                                    selected={props.data === null ? null : props.data.parent_entity}
                                    setChanged={setChanged} required={false} label={lang.parentEntity}
                                    disabled={false}
                                    width={'calc(50% - 16px)'}
                                    renderEntity={entity => {
                                        if (entity !== undefined && entity !== null)
                                            return (
                                                <div>
                                                    {entity.denomination}
                                                </div>
                                            )
                                        else
                                            return null
                                    }} fetchUrl={Host() + 'list/entity'}
                                    fetchToken={(new Cookies()).get('jwt')}
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
                                        props.handleChange({name: 'parent_unit', value: entity})
                                    }} selectorKey={'parent-unit-selector'}
                                    selected={props.data === null ? null : props.data.parent_unit}
                                    setChanged={setChanged} required={false} label={lang.parentUnit}
                                    disabled={false}
                                    width={'calc(50% - 16px)'}
                                    renderEntity={entity => {
                                        if (entity !== undefined && entity !== null)
                                            return (
                                                <div>
                                                    {entity.name}
                                                </div>
                                            )
                                        else
                                            return null
                                    }} fetchUrl={Host() + 'list/unit'}
                                    fetchToken={(new Cookies()).get('jwt')}
                                    elementRootID={'root'}/>


                                <TextField

                                    placeholder={lang.sphere}
                                    label={lang.sphere}
                                    handleChange={event => {
                                        setChanged(true)
                                        props.handleChange({name: 'sphere', value: event.target.value})
                                    }} locale={props.locale} value={props.data === null ? null : props.data.sphere}
                                    required={true} width={'calc(33.333% - 21.35px)'}/>

                                <TextField

                                    placeholder={lang.power}
                                    label={lang.power}
                                    handleChange={event => {
                                        setChanged(true)
                                        props.handleChange({name: 'power', value: event.target.value})
                                    }} locale={props.locale} value={props.data === null ? null : props.data.power}
                                    required={true}
                                    width={'calc(33.333% - 21.35px)'}/>
                                <TextField

                                    placeholder={lang.legalNature}
                                    label={lang.legalNature}
                                    handleChange={event => {
                                        setChanged(true)
                                        props.handleChange({name: 'legal_nature', value: event.target.value})
                                    }} locale={props.locale}
                                    value={props.data === null ? null : props.data.legal_nature}
                                    required={true} width={'calc(33.333% - 21.35px)'}/>
                                <TextField

                                    placeholder={lang.changeType}
                                    label={lang.changeType}
                                    handleChange={event => {
                                        setChanged(true)
                                        props.handleChange({name: 'change_type', value: event.target.value})
                                    }} locale={props.locale} value={props.data === null ? null : props.data.change_type}
                                    required={true} width={'calc(50% - 16px)'}/>
                                <TextField

                                    placeholder={lang.category}
                                    label={lang.category}
                                    handleChange={event => {
                                        setChanged(true)
                                        props.handleChange({name: 'category', value: event.target.value})
                                    }} locale={props.locale} value={props.data === null ? null : props.data.category}
                                    required={true} width={'calc(50% - 16px)'}/>
                            </>
                        )
                    },
                    {
                        title: lang.additionalInformation,
                        child: (
                            <>
                                <TextField

                                    placeholder={lang.competence}
                                    label={lang.competence}
                                    handleChange={event => {
                                        setChanged(true)
                                        props.handleChange({name: 'competence', value: event.target.value})
                                    }} locale={props.locale} value={props.data === null ? null : props.data.competence}
                                    required={false} width={'calc(33.333% - 21.35px)'}/>
                                <TextField

                                    placeholder={lang.finality}
                                    label={lang.finality}
                                    handleChange={event => {
                                        setChanged(true)
                                        props.handleChange({name: 'finality', value: event.target.value})
                                    }} locale={props.locale} value={props.data === null ? null : props.data.finality}
                                    required={false} width={'calc(33.333% - 21.35px)'}/>

                                <TextField

                                    placeholder={lang.mission}
                                    label={lang.mission}
                                    handleChange={event => {
                                        setChanged(true)
                                        props.handleChange({name: 'mission', value: event.target.value})
                                    }} locale={props.locale} value={props.data === null ? null : props.data.mission}
                                    required={false} width={'calc(33.333% - 21.35px)'}/>


                                <TextField

                                    placeholder={lang.strategicObjective}
                                    label={lang.strategicObjective}
                                    handleChange={event => {
                                        setChanged(true)
                                        props.handleChange({name: 'strategic_objective', value: event.target.value})
                                    }} locale={props.locale}
                                    value={props.data === null ? null : props.data.strategic_objective}
                                    required={false} width={'calc(50% - 16px)'}/>

                                <TextField

                                    placeholder={lang.standardization}
                                    label={lang.standardization}
                                    handleChange={event => {
                                        setChanged(true)
                                        props.handleChange({name: 'standardization', value: event.target.value})
                                    }} locale={props.locale}
                                    value={props.data === null ? null : props.data.standardization}
                                    required={false} width={'calc(50% - 16px)'}/>

                            </>)
                    }
                ]}/>
        </>
    )

}

UnitForm.propTypes = {
    id: PropTypes.number,
    data: PropTypes.object,
    handleChange: PropTypes.func,
    returnToMain: PropTypes.func,
    create: PropTypes.bool,
}
