import React from "react";
import PropTypes from 'prop-types'
import ProjectPT from "../../locales/ProjectPT";


import getQuery from "../../utils/getQuery";
import associativeKeys from "../../keys/associativeKeys";
import submit from "../../utils/submit";
import UnitForm from "./UnitForm";
import projectKeys from "../../keys/projectKeys";
import FormTemplate from "../../templates/FormTemplate";
import formOptions from "../../templates/formOptions";
import {
    useCopyToClipboard, useFile,

    Empty,
    request, Alert, ToolTip,

    Selector, Form, FormRow, DateField,
    SelectField, MultiSelectField,
    TextField, Button, Checkbox, CheckboxGroup,
    FileField,

    ThemeContext, MfcWrapper, Ripple,

    ScrollStepper, StepperWrapper,
    Tab, Tabs, VerticalTabs, Modal, Breadcrumbs,
    Carousel, DynamicRoutes, Switcher, RailActionButton,
    RailContext, NavigationRail, Dropdown, RailActionWrapper,

    List,  Feed, FeedCard, Filter,
    useInfiniteScroll, useQuery

} from 'mfc-core'

export default function ProjectForm(props) {
    const lang = ProjectPT
    const unitHook = useQuery(getQuery('unit'))


    return (
        <FormTemplate
            keys={projectKeys.project}
            endpoint={'project'}
            initialData={props.data}
        >
            {({setOpen, formHook, asDraft, asHistory}) => (
                <Form
                    hook={formHook}
                    options={formOptions({
                        asDraft: asDraft,
                        asHistory: asHistory,
                        setOpen: setOpen,
                        create: props.create
                    })}
                    create={props.create}
                    title={props.create ? 'Novo projeto / atividade' : 'Projeto / Atividade'}
                    returnButton={props.create}
                    handleSubmit={(data, clearState) =>
                        submit({
                            suffix: 'project',
                            pk: data.id,
                            data: data,
                            create: props.create
                        }).then(res => {
                            if (res.success && props.create)
                                props.handleClose()

                        })}
                    handleClose={() => props.handleClose()}
                >
                    {(data, handleChange) => (
                        <>
                            <FormRow title={'Dados do Projeto/Atividade'}>
                                <TextField
                                    placeholder={lang.name} label={lang.name}
                                    value={data.name}
                                    handleChange={event => handleChange({key: 'name', event: event.target.value})}
                                    required={true}
                                    width={'calc(33.333% - 21.5px)'}
                                />

                                <TextField
                                    type={'number'}
                                    placeholder={lang.estimatedValue}
                                    label={lang.estimatedValue}
                                    value={data.estimated_value}
                                    handleChange={event => handleChange({
                                        key: 'estimated_value',
                                        event: event.target.value
                                    })}
                                    maskStart={'R$'}
                                    required={true}
                                    floatFilter={true}
                                    width={'calc(33.333% - 21.5px)'}/>
                                <SelectField
                                    placeholder={lang.type}
                                    label={lang.type}
                                    handleChange={event => handleChange({key: 'type', event: event})}
                                    value={data.type} required={true}
                                    width={'calc(33.333% - 21.5px)'} choices={lang.projectTypes}/>
                                <TextField
                                    variant={'area'}
                                    placeholder={lang.description} label={lang.description}
                                    handleChange={event => handleChange({
                                        key: 'description',
                                        event: event.target.value
                                    })}
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
                                    handleChange={event => handleChange({
                                        key: 'critical_factors',
                                        event: event.target.value
                                    })}
                                    value={data.critical_factors}
                                    required={true} width={'100%'}/>
                            </FormRow>
                            <FormRow title={'Equipes envolvidas'}>

                                <Selector
                                    hook={unitHook} keys={associativeKeys.responsible}
                                    width={'calc(50% - 16px)'}
                                    required={true}
                                    value={data.responsible}
                                    label={'Unidade da AEB responsável'}
                                    placeholder={'Unidade da AEB responsável'}
                                    handleChange={entity => handleChange({key: 'responsible', event: entity})}
                                    createOption={true}
                                >
                                    {handleClose => (
                                        <UnitForm create={true} asDefault={true} handleClose={() => handleClose()}/>
                                    )}
                                </Selector>

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
                                    handleChange={event => handleChange({
                                        key: 'public_sector_team',
                                        event: event.target.value
                                    })}
                                    value={data.public_sector_team}
                                    required={true}
                                    width={'100%'}/>
                                <TextField
                                    variant={'area'}
                                    placeholder={lang.privateTeam}
                                    label={lang.privateTeam}

                                    handleChange={event => handleChange({
                                        key: 'private_sector_team',
                                        event: event.target.value
                                    })}
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
                                    placeholder={'Partes Interessadas'}
                                    label={'Partes Interessadas'}
                                    handleChange={event => handleChange({
                                        key: 'stakeholders',
                                        event: event.target.value
                                    })}
                                    value={data.stakeholders}
                                    required={true} width={'100%'}/>


                            </FormRow>
                            <FormRow title={'Gestão de Conhecimento'}>
                                <TextField
                                    variant={'area'}
                                    placeholder={lang.learnedLessons}
                                    label={lang.learnedLessons}
                                    handleChange={event => handleChange({
                                        key: 'lessons_learned',
                                        event: event.target.value
                                    })}
                                    value={data.lessons_learned}
                                    required={true} width={'100%'}
                                />
                            </FormRow>
                        </>
                    )}

                </Form>
            )}
        </FormTemplate>
    )

}

ProjectForm.propTypes = {
    data: PropTypes.object,
    handleClose: PropTypes.func,
    create: PropTypes.bool,
}
