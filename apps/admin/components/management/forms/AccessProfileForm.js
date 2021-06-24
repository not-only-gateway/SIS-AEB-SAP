import React, {useState} from "react";
import PropTypes from "prop-types";
import mainStyles from '../../../styles/shared/Main.module.css'

import {Alert} from "sis-aeb-misc";
import shared from "../../../styles/Shared.module.css";
import {Button, DropDownField, TextField} from "sis-aeb-inputs";
import AccessProfilePT from "../../../packages/locales/management/AccessProfilePT";
import FormLayout from "../../shared/component/FormLayout";

export default function AccessProfileForm(props) {
    const [changed, setChanged] = useState(false)
    const lang = AccessProfilePT
    const [status, setStatus] = useState({
        type: undefined,
        message: undefined
    })


    function disabled() {
        return (
            props.data.denomination === undefined ||

            props.data.can_create_person === undefined ||
            props.data.can_update_person === undefined ||
            props.data.can_delete_person === undefined ||

            props.data.can_manage_membership === undefined ||

            props.data.can_manage_structure === undefined ||
            !changed
        )
    }

    return (
        <>
            <Alert
                type={status.type} render={status.type !== undefined}
                handleClose={() => setStatus({type: undefined, message: undefined})} message={status.message}
            />

            <FormLayout
                formLabel={lang.title}
                dependencies={{
                    fields: [
                        {name: 'denomination', type: 'string'},
                        {name: 'hierarchy_level', type: 'string'},
                        {name: 'role_level', type: 'string'},
                        {name: 'fcpe', type: 'bool'},
                        {name: 'das', type: 'bool'},
                        {name: 'role_class', type: 'string'}

                    ],
                    changed: changed,
                    entity: props.data
                }} returnButton={true} handleSubmit={() =>
                props.handleSubmit({
                    pk: props.data === null ? null : props.data.id,
                    data: props.data,
                    create: props.create,
                    setStatus: setStatus
                }).then(res => {
                    setChanged(!res)
                })}
                handleClose={() => props.closeModal()}
                forms={[{
                    child: (
                        <>
                            <TextField
                                dark={true}
                                placeholder={lang.denomination} label={lang.denomination}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'denomination', value: event.target.value})
                                }}
                                locale={props.locale} value={props.data === null ? null : props.data.denomination} required={true}
                                width={'100%'}
                            />


                        </>
                    )
                },
                    {
                        title: lang.access,
                        child: (
                            <>
                                <DropDownField
                                    dark={true}
                                    placeholder={lang.person}
                                    label={lang.person}
                                    handleChange={event => {
                                        setChanged(true)
                                        props.handleChange({name: 'can_manage_person', value: event})
                                    }}
                                    locale={props.locale}

                                    value={props.data === null ? null : props.data.can_manage_person} required={true}
                                    width={'calc(33.333% - 21.35px)'}
                                    choices={lang.options}/>

                                <DropDownField
                                    dark={true}
                                    placeholder={lang.membership}
                                    label={lang.membership}
                                    handleChange={event => {
                                        setChanged(true)
                                        props.handleChange({name: 'can_manage_membership', value: event})
                                    }}
                                    locale={props.locale}
                                    value={props.data === null ? null : props.data.can_manage_membership} required={true}
                                    width={'calc(33.333% - 21.35px)'}
                                    choices={lang.options}/>

                                <DropDownField
                                    dark={true}
                                    placeholder={lang.structure}
                                    label={lang.structure}
                                    handleChange={event => {
                                        setChanged(true)
                                        props.handleChange({name: 'can_manage_structure', value: event})
                                    }}
                                    locale={props.locale}
                                    value={props.data === null ? null : props.data.can_manage_structure} required={true}
                                    width={'calc(33.333% - 21.35px)'}
                                    choices={lang.options}/>

                            </>
                        )
                    },
                ]}/>
        </>

    )

}

AccessProfileForm.propTypes = {
    handleSubmit: PropTypes.func,
    handleChange: PropTypes.func,
    data: PropTypes.object,

    create: PropTypes.bool,
    closeModal: PropTypes.func
}