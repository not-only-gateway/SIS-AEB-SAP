import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types'
import {Button, DropDownField, Selector, TextField} from "sis-aeb-inputs";
import shared from "../../../styles/shared/Shared.module.css";
import {Alert} from "sis-aeb-alert";

import handleObjectChange from "../../../utils/shared/HandleObjectChange";
import mapToSelect from "../../../utils/shared/MapToSelect";
import UnitFormPT from "../../../packages/locales/unit/UnitFormPT";


export default function UnitForm(props) {

    const [changed, setChanged] = useState(false)
    const lang = UnitFormPT
    const [status, setStatus] = useState({
        error: false,
        message: undefined
    })

    const [dependencies, setDependencies] = useState({
        entities: [],
        units: []
    })

    const [maxID, setMaxID] = useState({
        unitsMaxID: null,
        entitiesMaxID: null
    })
    const [lastFetchedSize, setLastFetchedSize] = useState({
        unitsFetchedSize: 0,
        entityLastFetchedSize: 0
    })

    useEffect(() => {
        fetchUnits({
            setData: res => {

                const data = !props.create ?
                    res.filter(obj => {
                        if (obj.id !== props.data.id) {
                            return obj

                        }
                    }) : res
                handleObjectChange({
                    event: {name: 'units', value: mapToSelect({data: data, option: 5})},
                    setData: setDependencies
                })
            },
            data: dependencies.units,
            maxID: null,
            searchInput: props.searchInput,
            setMaxID: res => handleObjectChange({
                event: {name: 'unitsMaxID', value: res},
                setData: setMaxID
            }),
            setLastFetchedSize: res => handleObjectChange({
                event: {name: 'unitsFetchedSize', value: res},
                setData: setLastFetchedSize
            })
        })
        fetchEntities({
            setData: res => {
                alert(JSON.stringify(res))
                handleObjectChange({
                    event: {name: 'entities', value: mapToSelect({data: res, option: 1})},
                    setData: setDependencies
                })
            },
            data: dependencies.entities,
            maxID: null,
            searchInput: props.searchInput,
            setMaxID: res => handleObjectChange({
                event: {name: 'entitiesMaxID', value: res},
                setData: setMaxID
            }),
            setLastFetchedSize: res => handleObjectChange({
                event: {name: 'entitiesFetchedSize', value: res},
                setData: setLastFetchedSize
            })
        })
    }, [])

    function disabled() {
        return (
            props.data === null ||
            props.data.acronym === null ||
            props.data.denomination === null ||
            props.data.is_decentralized === null ||
            props.data.sphere === null ||
            props.data.power === null ||
            props.data.legal_nature === null ||
            props.data.change_type === null ||
            props.data.category === null ||
            props.data.parent_entity === null ||

            !props.data.acronym ||
            !props.data.denomination ||
            props.data.is_decentralized === undefined ||
            !props.data.sphere ||
            !props.data.power ||
            !props.data.legal_nature ||
            !props.data.change_type ||
            !props.data.category ||

            !props.data.parent_entity ||
            !changed
        )
    }

    return (
        <div style={{
            display: 'grid',
            gap: '32px',
            width: '100%',
        }}>
            <Alert
                type={'error'} message={status.message}
                handleClose={() => setStatus({
                    error: false,
                    message: undefined
                })} render={status.error}/>

            <fieldset className={[shared.fieldsetContainer, shared.formContainer].join(' ')}>
                <legend><h4 style={{width: '100%', marginBottom: '16px'}}>{lang.basic}</h4></legend>

                <TextField
                    dark={true}
                    placeholder={lang.acronym} label={lang.acronym}
                    handleChange={event => {
                        setChanged(true)
                        props.handleChange({name: 'acronym', value: event.target.value})
                    }} locale={props.locale} value={props.data === null ? null : props.data.acronym}
                    required={true}
                    width={'calc(33.333% - 21.35px)'}/>

                <TextField
                    dark={true}
                    placeholder={lang.denomination} label={lang.denomination}
                    handleChange={event => {
                        setChanged(true)
                        props.handleChange({name: 'name', value: event.target.value})
                    }} locale={props.locale} value={props.data === null ? null : props.data.name}
                    required={true}
                    width={'calc(33.333% - 21.35px)'}/>

                <DropDownField
                    dark={true}
                    placeholder={lang.decentralized}
                    label={lang.decentralized}
                    handleChange={event => {
                        setChanged(true)
                        props.handleChange({name: 'is_decentralized', value: event})
                    }} locale={props.locale} value={props.data.is_decentralized}
                    required={true}
                    width={'calc(33.333% - 21.35px)'} choices={lang.choice}/>

            </fieldset>

            <fieldset className={[shared.fieldsetContainer, shared.formContainer].join(' ')}>
                <legend><h4 style={{width: '100%', marginBottom: '16px'}}>{lang.information}</h4></legend>


                <Selector
                    dark={true}
                    required={true}
                    locale={props.locale}
                    selected={{
                        key: props.data.parent_entity.key ? props.data.parent_entity.key : props.data.parent_entity.id,
                        value: props.data.parent_entity.value ? props.data.parent_entity.value : props.data.parent_entity.denomination
                    }}
                    handleChange={event => props.handleChange({name: 'parent_unit', value: event})
                    }
                    label={lang.parentEntity} setChanged={setChanged}
                    data={dependencies.entities} width={'calc(50% - 16px)'}/>


                <Selector
                    dark={true}
                    required={false}
                    locale={props.locale}
                    selected={{
                        key: props.data.parent_unit !== null ? (props.data.parent_unit.key ? props.data.parent_unit.key : props.data.parent_unit.id) : null,
                        value: props.data.parent_unit !== null ? (props.data.parent_unit.value ? props.data.parent_unit.value : props.data.parent_unit.acronym) : null
                    }}
                    handleChange={event => {
                        props.handleChange({name: 'parent_unit', value: event})

                        dependencies.units.filter(obj => {
                            if (obj.id === event.key)
                                dependencies.entities.filter(entityObj => {
                                    if (entityObj.id === obj.parent_entity.id)
                                        props.handleChange({
                                            name: 'parent_entity', value: {
                                                key: obj.parent_entity.id,
                                                value: obj.parent_entity.denomination
                                            }
                                        })
                                })
                        })
                    }}
                    label={lang.parentUnit} setChanged={setChanged}
                    data={dependencies.units} width={'calc(50% - 16px)'}/>
                <TextField
                    dark={true}
                    placeholder={lang.sphere}
                    label={lang.sphere}
                    handleChange={event => {
                        setChanged(true)
                        props.handleChange({name: 'sphere', value: event.target.value})
                    }} locale={props.locale} value={props.data === null ? null : props.data.sphere}
                    required={true} width={'calc(33.333% - 21.35px)'}/>

                <TextField
                    dark={true}
                    placeholder={lang.power}
                    label={lang.power}
                    handleChange={event => {
                        setChanged(true)
                        props.handleChange({name: 'power', value: event.target.value})
                    }} locale={props.locale} value={props.data === null ? null : props.data.power}
                    required={true}
                    width={'calc(33.333% - 21.35px)'}/>
                <TextField
                    dark={true}
                    placeholder={lang.legalNature}
                    label={lang.legalNature}
                    handleChange={event => {
                        setChanged(true)
                        props.handleChange({name: 'legal_nature', value: event.target.value})
                    }} locale={props.locale} value={props.data === null ? null : props.data.legal_nature}
                    required={true} width={'calc(33.333% - 21.35px)'}/>
                <TextField
                    dark={true}
                    placeholder={lang.changeType}
                    label={lang.changeType}
                    handleChange={event => {
                        setChanged(true)
                        props.handleChange({name: 'change_type', value: event.target.value})
                    }} locale={props.locale} value={props.data === null ? null : props.data.change_type}
                    required={true} width={'calc(50% - 16px)'}/>
                <TextField
                    dark={true}
                    placeholder={lang.category}
                    label={lang.category}
                    handleChange={event => {
                        setChanged(true)
                        props.handleChange({name: 'category', value: event.target.value})
                    }} locale={props.locale} value={props.data === null ? null : props.data.category}
                    required={true} width={'calc(50% - 16px)'}/>


            </fieldset>
            <fieldset className={[shared.fieldsetContainer, shared.formContainer].join(' ')}>
                <legend><h4 style={{width: '100%', marginBottom: '16px'}}>{lang.additionalInformation}</h4></legend>
                <TextField
                    dark={true}
                    placeholder={lang.competence}
                    label={lang.competence}
                    handleChange={event => {
                        setChanged(true)
                        props.handleChange({name: 'competence', value: event.target.value})
                    }} locale={props.locale} value={props.data === null ? null : props.data.competence}
                    required={false} width={'calc(33.333% - 21.35px)'}/>
                <TextField
                    dark={true}
                    placeholder={lang.finality}
                    label={lang.finality}
                    handleChange={event => {
                        setChanged(true)
                        props.handleChange({name: 'finality', value: event.target.value})
                    }} locale={props.locale} value={props.data === null ? null : props.data.finality}
                    required={false} width={'calc(33.333% - 21.35px)'}/>

                <TextField
                    dark={true}
                    placeholder={lang.mission}
                    label={lang.mission}
                    handleChange={event => {
                        setChanged(true)
                        props.handleChange({name: 'mission', value: event.target.value})
                    }} locale={props.locale} value={props.data === null ? null : props.data.mission}
                    required={false} width={'calc(33.333% - 21.35px)'}/>


                <TextField
                    dark={true}
                    placeholder={lang.strategicObjective}
                    label={lang.strategicObjective}
                    handleChange={event => {
                        setChanged(true)
                        props.handleChange({name: 'strategic_objective', value: event.target.value})
                    }} locale={props.locale} value={props.data === null ? null : props.data.strategic_objective}
                    required={false} width={'calc(50% - 16px)'}/>

                <TextField
                    dark={true}
                    placeholder={lang.standardization}
                    label={lang.standardization}
                    handleChange={event => {
                        setChanged(true)
                        props.handleChange({name: 'standardization', value: event.target.value})
                    }} locale={props.locale} value={props.data === null ? null : props.data.standardization}
                    required={false} width={'calc(50% - 16px)'}/>

            </fieldset>

            <div className={shared.formSubmitContainer}>
                <Button width={'100%'} elevation={true} border={'none'} padding={'8px 32px 8px 32px'}
                        fontColor={'white'} backgroundColor={'#0095ff'}
                        handleClick={() => {
                            setChanged(false)
                            props.handleSubmit({
                                subjectID: props.id,
                                data: props.data,
                                setStatus: setStatus
                            }).then(res => {
                                setChanged(!res)
                                if (props.setAccepted !== undefined)
                                    props.setAccepted(res)
                            })
                        }}
                        disabled={disabled()} variant={'rounded'}
                        content={
                            props.create ? lang.create : lang.save
                        } justification={'center'} hoverHighlight={false}
                />
            </div>
        </div>
    )

}

UnitForm.propTypes = {
    id: PropTypes.number,
    data: PropTypes.object,
    handleChange: PropTypes.func,
    handleSubmit: PropTypes.func,
    setAccepted: PropTypes.func,
    create: PropTypes.bool,
}
