import React from "react";
import PropTypes from 'prop-types'
import ProjectPT from "../../locales/ProjectPT";
import ProjectRequests from "../../utils/requests/ProjectRequests";
import {DropDownField, Form, FormRow, TextField, useQuery} from "sis-aeb-core";
import getQuery from "../../queries/getQuery";
import Selector from "../../../../core/inputs/selector/Selector";
import associativeKeys from "../../keys/associativeKeys";


export default function ProjectForm(props) {
    const lang = ProjectPT
    const unitHook = useQuery(getQuery('unit'))
    return (
        <Form
            initialData={props.data}
            create={props.create} title={lang.title}
            dependencies={[
                {key: 'name', type: 'string'},
                {key: 'sponsor', type: 'string'},
                {key: 'estimated_value', type: 'number'},
                {key: 'description', type: 'string'},
                {key: 'manager', type: 'string'},
                {key: 'public_sector_team', type: 'string'},
                {key: 'private_sector_team', type: 'string'},
                {key: 'objectives', type: 'string'},
                {key: 'stakeholders', type: 'string'},
                {key: 'scope', type: 'string'},
                {key: 'critical_factors', type: 'string'},
                {key: 'type', type: 'string'},
                {key: 'responsible', type: 'string'},
                {key: 'lessons_learned', type: 'string'}
            ]} noHeader={!props.create}
            returnButton={props.create}
            handleSubmit={(data, clearState) =>
                ProjectRequests.submitProject({
                    pk: data.id,
                    data: data,
                    create: props.create
                }).then(res => {
                    if (res !== null && props.create)
                        props.redirect(res)

                })}
            handleClose={() => props.returnToMain()}
        >
            {({data, handleChange}) => (
                <FormRow>
                    <TextField
                        placeholder={lang.name} label={lang.name}
                        value={data.name}
                        handleChange={event => handleChange({key: 'name', event: event.target.value})}
                        required={true}
                        width={'calc(33.333% - 21.5px)'}
                    />

                    <TextField
                        type={'number'}
                        placeholder={lang.estimatedValue} label={lang.estimatedValue}
                        value={data.estimated_value}
                        handleChange={event => handleChange({key: 'estimated_value', event: event.target.value})}

                        maskStart={'R$'}
                        required={true} currencyMask={true}
                        width={'calc(33.333% - 21.5px)'}/>
                    <DropDownField
                        placeholder={lang.type}
                        label={lang.type}
                        handleChange={event => handleChange({key: 'type', event: event})}
                        value={data.type} required={true}
                        width={'calc(33.333% - 21.5px)'} choices={lang.projectTypes}/>
                    <TextField
                        variant={'area'}
                        placeholder={lang.description} label={lang.description}
                        handleChange={event => handleChange({key: 'description', event: event.target.value})}
                        value={data.description}
                        required={true}
                        width={'100%'}/>
                    <TextField
                        variant={'area'}
                        placeholder={lang.projectObjectives}
                        label={lang.projectObjectives}

                        handleChange={event => handleChange({key: 'objectives', event: event.target.value})}
                        value={data.objectives}
                        required={true} width={'100%'}/>
                    <TextField
                        variant={'area'}
                        placeholder={lang.scope}
                        label={lang.scope}

                        handleChange={event => handleChange({key: 'scope', event: event.target.value})}
                        value={data.scope}
                        required={true} width={'100%'}/>

                    <TextField
                        variant={'area'}
                        placeholder={lang.criticalFactors}
                        label={lang.criticalFactors}
                        handleChange={event => handleChange({key: 'critical_factors', event: event.target.value})}
                        value={data.critical_factors}
                        required={true} width={'100%'}/>

                    <Selector
                        hook={unitHook} keys={associativeKeys.responsible}
                        width={'calc(50% - 16px)'}
                        required={true}
                        value={data.responsible}
                        title={'Responsável'}
                        placeholder={'Responsável'}
                        handleChange={entity => handleChange({key: 'responsible', event: entity})}
                    />

                    <TextField
                        placeholder={lang.manager}
                        label={lang.manager}
                        handleChange={event => handleChange({key: 'manager', event: event.target.value})}
                        value={data.manager}
                        required={true}
                        width={'calc(50% - 16px)'}/>

                    <TextField
                        variant={'area'}
                        placeholder={lang.publicTeam}
                        label={lang.publicTeam}
                        handleChange={event => handleChange({key: 'public_sector_team', event: event.target.value})}
                        value={data.public_sector_team}
                        required={true}
                        width={'100%'}/>
                    <TextField
                        variant={'area'}
                        placeholder={lang.privateTeam}
                        label={lang.privateTeam}

                        handleChange={event => handleChange({key: 'private_sector_team', event: event.target.value})}
                        value={data.private_sector_team}
                        required={true}
                        width={'100%'}/>

                    <TextField
                        variant={'area'}
                        placeholder={lang.sponsor} label={lang.sponsor}

                        handleChange={event => handleChange({key: 'sponsor', event: event.target.value})}
                        value={data.sponsor}
                        required={true}
                        width={'100%'}/>

                    <TextField
                        variant={'area'}
                        placeholder={lang.stakeholders}
                        label={lang.stakeholders}
                        handleChange={event => handleChange({key: 'stakeholders', event: event.target.value})}
                        value={data.stakeholders}
                        required={true} width={'100%'}/>

                    <TextField
                        variant={'area'}
                        placeholder={lang.learnedLessons}
                        label={lang.learnedLessons}
                        handleChange={event => handleChange({key: 'lessons_learned', event: event.target.value})}
                        value={data.lessons_learned}
                        required={true} width={'100%'}
                    />

                </FormRow>
            )}

        </Form>

    )

}

ProjectForm.propTypes = {
    id: PropTypes.number,
    data: PropTypes.object,
    handleChange: PropTypes.func,
    returnToMain: PropTypes.func,
    create: PropTypes.bool,
}
