import React, {useState} from "react";
import PropTypes from 'prop-types'
import {DropDownField, TextField} from "sis-aeb-inputs";
import {Alert} from "sis-aeb-misc";
import ProjectPT from "../../packages/locales/ProjectPT";
import submitProject from "../../utils/submit/SubmitProject";
import EntityLayout from "../shared/misc/form/EntityLayout";


export default function ProjectForm(props) {

    const [changed, setChanged] = useState(false)
    const lang = ProjectPT
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
                rootElementID={'root'} entity={props.data}
                create={props.create} label={lang.title}
                dependencies={{
                    fields: [
                        {name: 'name', type: 'string'},
                        {name: 'sponsor', type: 'string'},
                        {name: 'estimated_value', type: 'number'},
                        {name: 'description', type: 'string'},
                        {name: 'manager', type: 'string'},
                        {name: 'public_sector_team', type: 'string'},
                        {name: 'private_sector_team', type: 'string'},
                        {name: 'objectives', type: 'string'},
                        {name: 'stakeholders', type: 'string'},
                        {name: 'scope', type: 'string'},
                        {name: 'critical_factors', type: 'string'},
                        {name: 'type', type: 'string'},
                        {name: 'responsible', type: 'string'},
                    ],
                    changed: changed
                }} noHeader={!props.create}
                returnButton={props.create}
                handleSubmit={() =>
                    submitProject({
                        pk: props.id,
                        data: props.data,
                        setStatus: setStatus,
                        create: props.create
                    }).then(res => {
                        if (res !== null && props.create)
                            props.redirect(res)

                        if (!props.create && res)
                            setChanged(false)
                    })}
                handleClose={() => props.returnToMain()}
                forms={[{
                    child: (
                        <>
                            <TextField

                                placeholder={lang.name} label={lang.name}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'name', value: event.target.value})
                                }} locale={props.locale} value={props.data === null ? null : props.data.name}
                                required={true}
                                width={'calc(33.333% - 21.5px)'}/>


                            <TextField
                                type={'number'}
                                placeholder={lang.estimatedValue} label={lang.estimatedValue}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'estimated_value', value: event.target.value})
                                }} locale={props.locale} value={props.data === null ? null : props.data.estimated_value}
                                required={true}
                                width={'calc(33.333% - 21.5px)'}/>
                            <DropDownField
                                dark={true}
                                placeholder={lang.type}
                                label={lang.type}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'type', value: event})
                                }} value={props.data === null ? null : props.data.type} required={true}
                                width={'calc(33.333% - 21.5px)'} choices={lang.projectTypes}/>
                            <TextField
                                variant={'area'}
                                placeholder={lang.description} label={lang.description}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'description', value: event.target.value})
                                }} locale={props.locale} value={props.data === null ? null : props.data.description}
                                required={true}
                                width={'100%'}/>
                            <TextField
                                variant={'area'}
                                placeholder={lang.objectives}
                                label={lang.objectives}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'objectives', value: event.target.value})
                                }} locale={props.locale} value={props.data === null ? null : props.data.objectives}
                                required={true} width={'100%'}/>
                            <TextField
                                variant={'area'}
                                placeholder={lang.scope}
                                label={lang.scope}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'scope', value: event.target.value})
                                }} locale={props.locale} value={props.data === null ? null : props.data.scope}
                                required={true} width={'100%'}/>

                            <TextField
                                variant={'area'}
                                placeholder={lang.criticalFactors}
                                label={lang.criticalFactors}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'critical_factors', value: event.target.value})
                                }} locale={props.locale}
                                value={props.data === null ? null : props.data.critical_factors}
                                required={true} width={'100%'}/>

                            <DropDownField
                                dark={true}
                                placeholder={lang.responsible}
                                label={lang.responsible}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'responsible', value: event})
                                }} value={props.data === null ? null : props.data.responsible} required={true}
                                width={'calc(50% - 16px)'} choices={lang.responsibleOptions}/>


                            <TextField
                                placeholder={lang.manager}
                                label={lang.manager}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'manager', value: event.target.value})
                                }} locale={props.locale} value={props.data === null ? null : props.data.manager}
                                required={true} width={'calc(50% - 16px)'}/>


                            <TextField
                                variant={'area'}
                                placeholder={lang.publicTeam}
                                label={lang.publicTeam}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'public_sector_team', value: event.target.value})
                                }} locale={props.locale}
                                value={props.data === null ? null : props.data.public_sector_team}
                                required={true}
                                width={'100%'}/>
                            <TextField
                                variant={'area'}
                                placeholder={lang.privateTeam}
                                label={lang.privateTeam}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'private_sector_team', value: event.target.value})
                                }} locale={props.locale}
                                value={props.data === null ? null : props.data.private_sector_team}
                                required={true}
                                width={'100%'}/>

                            <TextField
                                variant={'area'}
                                placeholder={lang.sponsor} label={lang.sponsor}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'sponsor', value: event.target.value})
                                }} locale={props.locale} value={props.data === null ? null : props.data.sponsor}
                                required={true}
                                width={'100%'}/>

                            <TextField
                                variant={'area'}
                                placeholder={lang.stakeholders}
                                label={lang.stakeholders}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'stakeholders', value: event.target.value})
                                }} locale={props.locale}
                                value={props.data === null ? null : props.data.stakeholders}
                                required={true} width={'100%'}/>


                        </>
                    )
                }
                ]}/>
        </>
    )

}

ProjectForm.propTypes = {
    id: PropTypes.number,
    data: PropTypes.object,
    handleChange: PropTypes.func,
    returnToMain: PropTypes.func,
    create: PropTypes.bool,
}
