import React, {useState} from "react";
import PropTypes from 'prop-types'
import ProjectPT from "../../packages/locales/ProjectPT";
import Form from "../shared/core/form/Form";
import {DropDownField, TextField} from "sis-aeb-core";
import Selector from "../shared/core/selector/Selector";
import Host from "../../utils/shared/Host";
import Cookies from "universal-cookie/lib";
import ProjectRequests from "../../utils/requests/ProjectRequests";
import UnitForm from "../entities/unit/UnitForm";


export default function ProjectForm(props) {

    const [changed, setChanged] = useState(false)
    const lang = ProjectPT
    const [open, setOpen] = useState(false)
    return (
        <>

            <Form
                entity={props.data}
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
                        {name: 'lessons_learned', type: 'string'},
                    ],
                    changed: changed
                }} noHeader={!props.create}
                returnButton={props.create}
                handleSubmit={() =>
                    ProjectRequests.submitProject({
                        pk: props.data.id,
                        data: props.data,
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
                                }} locale={props.locale} value={props.data === null ? null : props.data.estimated_value} maskStart={'R$'}
                                required={true} currencyMask={true}
                                width={'calc(33.333% - 21.5px)'}/>
                            <DropDownField
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
                                placeholder={lang.projectObjectives}
                                label={lang.projectObjectives}
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

                            <Selector
                                getEntityKey={entity => {
                                    if (entity !== null && entity !== undefined)
                                        return entity.id
                                    else return -1
                                }} searchFieldName={'search_input'}
                                handleChange={entity => {
                                    props.handleChange({name: 'responsible', value: entity})
                                }} label={'Vincular responsável'}
                                selected={props.data === null || !props.data.responsible ? null : props.data.responsible}
                                disabled={false}
                                width={'calc(50% - 16px)'}
                                fields={[
                                    {name: 'name', type: 'string'},
                                    {name: 'acronym', type: 'string'},
                                ]} required={true}
                                labels={['nome', 'Acrônimo']}
                                fetchUrl={Host() + 'list/unit'}
                                fetchToken={(new Cookies()).get('jwt')}
                                createOption={true}
                                returnToList={!open}
                                setReturnToList={() => setOpen(true)}
                            >
                                <UnitForm create={true} returnToMain={() => setOpen(false)}/>
                            </Selector>

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

                            <TextField
                                variant={'area'}
                                placeholder={lang.learnedLessons}
                                label={lang.learnedLessons}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'lessons_learned', value: event.target.value})
                                }} locale={props.locale}
                                value={props.data === null ? null : props.data.lessons_learned}
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
