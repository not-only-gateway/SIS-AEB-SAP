import React, {useState} from "react";
import PropTypes from "prop-types";

import {FormLayout, TextField} from "sis-aeb-inputs";
import {effective} from "../../packages/locales/management/SimpleFormsPT";
import {Alert} from "sis-aeb-misc";


export default function EffectiveRoleForm(props) {

    const [changed, setChanged] = useState(false)
    const lang = effective
    const [status, setStatus] = useState({
        type: undefined,
        message: undefined
    })

    return (
        <>
            <Alert type={status.type} rootElementID={'root'} render={status.type !== undefined}
                   handleClose={() => setStatus({type: undefined, message: undefined})} message={status.message}/>

            <FormLayout
                create={props.create}
                formLabel={lang.title}
                dependencies={{
                    fields: [
                        {name: 'denomination', type: 'string'},
                        {name: 'hierarchy_level', type: 'string'},
                        {name: 'hierarchy_level', type: 'string'}
                    ],
                    changed: changed,
                    entity: props.data
                }} returnButton={true}
                handleSubmit={() =>
                props.handleSubmit({
                    pk: props.data === null ? null : props.data.id,
                    data: props.data,
                    create:  props.data === null || props.data.id === undefined,
                    setStatus: setStatus
                }).then(res => {
                    setChanged(!res)
                })
            }
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
                                locale={props.locale} value={props.data === null ? null : props.data.denomination}
                                required={true}
                                width={'calc(50% - 16px)'}
                            />
                            <TextField
                                dark={true}
                                placeholder={lang.hierarchyLevel} label={lang.hierarchyLevel}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'hierarchy_level', value: event.target.value})
                                }}
                                locale={props.locale}
                                value={props.data === null ? null : props.data.hierarchy_level}
                                required={true}
                                width={'calc(50% - 16px)'}
                            />
                        </>
                    )
                }]}/>
        </>
    )

}

EffectiveRoleForm.propTypes = {
    data: PropTypes.object,
    create: PropTypes.bool,
    closeModal: PropTypes.func
}