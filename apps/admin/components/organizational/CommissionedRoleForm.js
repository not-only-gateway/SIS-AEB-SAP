import React, {useState} from "react";
import PropTypes from "prop-types";

import {Alert} from "sis-aeb-misc";
import {DropDownField, FormLayout, TextField} from "sis-aeb-inputs";
import {commissioned} from "../../packages/locales/organizational/SimpleFormsPT";


export default function CommissionedRoleForm(props) {

    const [changed, setChanged] = useState(false)
    const lang = commissioned
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

            <FormLayout
                create={props.create}
                formLabel={lang.title}
                dependencies={{
                    fields: [
                        {name: 'denomination', type: 'string'},
                        {name: 'hierarchy_level', type: 'string'},
                        {name: 'role_level', type: 'string'},
                        props.data !== null && !props.data.das ? {name: 'fcpe', type: 'bool'} : null,
                        props.data !== null && !props.data.fcpe ? {name: 'das', type: 'bool'} : null,
                        {name: 'role_class', type: 'string'}

                    ],
                    changed: changed,
                    entity: props.data
                }} returnButton={true} handleSubmit={() =>
                props.handleSubmit({
                    pk: props.data === null ? null : props.data.id,
                    data: props.data,
                    create: props.data === null || props.data.id === undefined,
                    setStatus: setStatus
                }).then(res => {
                    setChanged(!res)
                })}
                handleClose={() => props.closeModal()}
                forms={[{
                    child: (
                        <>
                            <TextField

                                placeholder={lang.denomination} label={lang.denomination}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'denomination', value: event.target.value})
                                }}
                                value={props.data === null ? null : props.data.denomination}
                                required={true}
                                width={'100%'}
                            />

                        </>
                    )
                },
                    {
                        title: lang.additional,
                        child: (
                            <>
                                <TextField

                                    placeholder={lang.level} label={lang.level}
                                    handleChange={event => {
                                        setChanged(true)
                                        props.handleChange({name: 'role_level', value: event.target.value})
                                    }}
                                    value={props.data === null ? null : props.data.role_level}
                                    required={true}
                                    width={'calc(33.333%  - 21.35px)'}
                                />
                                <TextField

                                    placeholder={lang.roleClass} label={lang.roleClass}
                                    handleChange={event => {
                                        setChanged(true)
                                        props.handleChange({name: 'role_class', value: event.target.value})
                                    }}
                                    value={props.data === null ? null : props.data.role_class}
                                    required={true}
                                    width={'calc(33.333%  - 21.35px)'}
                                />
                                <TextField

                                    placeholder={lang.hierarchyLevel} label={lang.hierarchyLevel}
                                    handleChange={event => {
                                        setChanged(true)
                                        props.handleChange({name: 'hierarchy_level', value: event.target.value})
                                    }}

                                    value={props.data === null ? null : props.data.hierarchy_level} required={true}
                                    width={'calc(33.333%  - 21.35px)'}
                                />
                                <DropDownField

                                    placeholder={lang.appointment}
                                    label={lang.appointment}
                                    handleChange={event => {
                                        setChanged(true)
                                        if (event === 'DAS') {
                                            props.handleChange({name: 'das', value: true})
                                            props.handleChange({name: 'fcpe', value: false})
                                        } else {
                                            props.handleChange({name: 'das', value: false})
                                            props.handleChange({name: 'fcpe', value: true})
                                        }
                                    }}

                                    value={props.data === null ? null : props.data.das ? 'DAS' : 'FCPE'}
                                    required={true}
                                    width={'100%'}
                                    choices={lang.options}/>
                            </>
                        )
                    }
                ]}/>
        </>
    )

}

CommissionedRoleForm.propTypes = {
    handleSubmit: PropTypes.func,
    handleChange: PropTypes.func,
    create: PropTypes.bool,
    data: PropTypes.object,

    closeModal: PropTypes.func
}