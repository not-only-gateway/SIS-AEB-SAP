import React, {useState} from "react";
import PropTypes from "prop-types";
import mainStyles from '../../styles/shared/Main.module.css'

import {Alert} from "sis-aeb-misc";
import shared from "../../styles/shared/Shared.module.css";
import {Button, DropDownField, TextField} from "sis-aeb-inputs";
import AccessProfilePT from "../../packages/locales/management/AccessProfilePT";

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
        <div className={mainStyles.displayWarp}
             style={{justifyContent: 'center', width: '100%', position: 'relative', overflow: 'auto'}}>
            <Alert
                type={status.type} render={status.type !== undefined}
                handleClose={() => setStatus({type: undefined, message: undefined})} message={status.message}
            />
            <div style={{padding: '16px 16px 8px 16px', width: '100%', display: "grid", gap: '16px'}}>
                <fieldset className={[shared.fieldsetContainer, shared.formContainer].join(' ')}>
                    <TextField
                        dark={true}
                        placeholder={lang.denomination} label={lang.denomination}
                        handleChange={event => {
                            setChanged(true)
                            props.handleChange({name: 'denomination', value: event.target.value})
                        }}
                        locale={props.locale} value={props.data.denomination} required={true}
                        width={'100%'}
                    />

                </fieldset>
                <fieldset className={[shared.fieldsetContainer, shared.formContainer].join(' ')}>
                    <legend><h4 style={{width: '100%', marginBottom: '16px'}}>{lang.person}</h4></legend>
                    <DropDownField
                        dark={true}
                        placeholder={lang.create}
                        label={lang.create}
                        handleChange={event => {
                            setChanged(true)
                            props.handleChange({name: 'can_create_person', value: event})
                        }}
                        locale={props.locale}

                        value={props.data.can_create_person} required={true}
                        width={'calc(33.333% - 21.35px)'}
                        choices={lang.options}/>

                    <DropDownField
                        dark={true}
                        placeholder={lang.update}
                        label={lang.update}
                        handleChange={event => {
                            setChanged(true)
                            props.handleChange({name: 'can_update_person', value: event})
                        }}
                        locale={props.locale}
                        value={props.data.can_update_person} required={true}
                        width={'calc(33.333% - 21.35px)'}
                        choices={lang.options}/>

                    <DropDownField
                        dark={true}
                        placeholder={lang.delete}
                        label={lang.delete}
                        handleChange={event => {
                            setChanged(true)
                            props.handleChange({name: 'can_delete_person', value: event})
                        }}
                        locale={props.locale}
                        value={props.data.can_delete_person} required={true}
                        width={'calc(33.333% - 21.35px)'}
                        choices={lang.options}/>

                </fieldset>
                <fieldset className={[shared.fieldsetContainer, shared.formContainer].join(' ')}>
                    <legend><h4 style={{width: '100%', marginBottom: '16px'}}>{lang.membership} & {lang.structure}</h4>
                    </legend>


                    <DropDownField
                        dark={true}
                        placeholder={lang.manage}
                        label={lang.manage}
                        handleChange={event => {
                            setChanged(true)
                            props.handleChange({name: 'can_manage_membership', value: event})
                        }}
                        locale={props.locale}
                        value={props.data.can_manage_membership} required={true}
                        width={'calc(50% - 16px)'}
                        choices={lang.options}/>

                    <DropDownField
                        dark={true}
                        placeholder={lang.manage}
                        label={lang.manage}
                        handleChange={event => {
                            setChanged(true)
                            props.handleChange({name: 'can_manage_structure', value: event})
                        }}
                        locale={props.locale}
                        value={props.data.can_manage_structure} required={true}
                        width={'calc(50% - 16px)'}
                        choices={lang.options}/>

                </fieldset>

            </div>
            <div className={shared.modalFooter} style={{width: '100%', padding: '24px 16px 24px 16px'}}>
                <Button width={'100%'} elevation={true} border={'none'} padding={'8px 32px 8px 32px'}
                        fontColor={'#262626'} backgroundColor={'white'}
                        handleClick={() => {
                            props.closeModal()
                        }}
                        variant={'rounded'}
                        colorVariant={'secondary'}
                        content={
                            lang.close
                        } justification={'center'} hoverHighlight={true}
                />
                <Button width={'100%'} elevation={true} border={'none'} padding={'8px 32px 8px 32px'}
                        fontColor={'white'} backgroundColor={'#0095ff'}
                        handleClick={() => {
                            props.handleSubmit({
                                pk: props.data.id,
                                data: props.data,
                                create: props.create,
                                setStatus: setStatus
                            }).then(res => {
                                setChanged(!res)
                            })
                        }}
                        disabled={disabled()} variant={'rounded'}
                        content={
                            lang.save
                        } justification={'center'} hoverHighlight={false}
                />
            </div>
        </div>

    )

}

AccessProfileForm.propTypes = {
    handleSubmit: PropTypes.func,
    handleChange: PropTypes.func,
    data: PropTypes.object,

    create: PropTypes.bool,
    closeModal: PropTypes.func
}