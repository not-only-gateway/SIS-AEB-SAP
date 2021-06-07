import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";

import mainStyles from '../../../styles/shared/Main.module.css'

import Alert from "../../layout/Alert";
import shared from "../../../styles/shared/Shared.module.css";
import Button from "../../inputs/Button";
import TextField from "../../inputs/TextField";
import {linkage} from "../../../packages/locales/management/SimpleFormsPT";


export default function LinkageForm(props) {

    const [changed, setChanged] = useState(false)
    const lang = linkage
    const [status, setStatus] = useState({
        type: undefined,
        message: undefined
    })


    function disabled() {
        return (
            !props.data.denomination ||
            !props.data.description ||
            props.data.denomination.length === 0 ||
            props.data.description.length === 0 ||
            !changed
        )
    }

        return (
            <div className={mainStyles.displayWarp}
                 style={{justifyContent: 'center', width: '100%', position: 'relative'}}>
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
                            width={'calc(50% - 16px)'}
                        />
                        <TextField
                            dark={true}
                            placeholder={lang.description} label={lang.description}
                            handleChange={event => {
                                setChanged(true)
                                props.handleChange({name: 'description', value: event.target.value})
                            }}
                            locale={props.locale} value={props.data.description} required={true}
                            width={'calc(50% - 16px)'}
                        />

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
                                props.create ? lang.create : lang.save
                            } justification={'center'} hoverHighlight={false}
                    />
                </div>

            </div>

        )

}

LinkageForm.propTypes = {
    create: PropTypes.bool,

    data: PropTypes.object,
    handleChange: PropTypes.func
}