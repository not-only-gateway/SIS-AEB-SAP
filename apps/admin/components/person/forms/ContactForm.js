import React, {useState} from "react";
import PropTypes from "prop-types";

import {TextField} from "sis-aeb-inputs";
import ContactFormPT from "../../../packages/locales/person/ContactFormPT";
import {Alert, EntityLayout} from "sis-aeb-misc";
import submitContact from "../../../utils/submit/SubmitContact";
import ContractualLinkageDescription from "../../../packages/descriptions/ContractualLinkageDescription";
import DocumentsOverview from "../../../packages/overview/DocumentsOverview";
import StructuralKeys from "../../../packages/keys/StructuralKeys";
import Cookies from "universal-cookie/lib";
import Host from "../../../utils/shared/Host";
import ContactsOverview from "../../../packages/overview/ContactsOverview";
import PersonalKeys from "../../../packages/keys/PersonalKeys";

export default function ContactForm(props) {

    const [changed, setChanged] = useState(false)
    const lang = ContactFormPT
    const [status, setStatus] = useState({
        error: undefined,
        message: undefined
    })


    return (
        <>
            <Alert
                type={status.type} render={status.type !== undefined} rootElementID={'root'}
                handleClose={() => setStatus({type: undefined, message: undefined})} message={status.message}
            />

            <EntityLayout
                information={ContractualLinkageDescription}
                fields={ContactsOverview} entityID={props.id}
                rootElementID={'root'} entity={props.data}
                create={props.data === null || props.data === undefined || props.data.id === undefined}
                label={lang.title} entityKey={PersonalKeys.contact} fetchToken={(new Cookies()).get('jwt')}
                fetchUrl={Host() + 'list/object'} exists={true} fetchSize={15} setVersion={() => null}
                dependencies={{
                    fields: [
                        {name: 'personal_phone', type: 'string'},
                        {name: 'personal_email', type: 'string'},
                    ],
                    changed: changed,
                    entity: props.data
                }} returnButton={true}
                handleSubmit={() =>
                    submitContact({
                        pk: props.id,
                        data: props.data,
                        setStatus: setStatus
                    }).then(res => {
                        setChanged(!res)
                    })}
                handleClose={() => props.returnToMain()}
                forms={[{
                    title: lang.emails,
                    child: (
                        <>
                            <TextField

                                placeholder={lang.email} label={lang.email} handleChange={event => {
                                setChanged(true)
                                props.handleChange({name: 'personal_email', value: event.target.value})
                            }}
                                value={props.data === null ? null : props.data.personal_email}
                                required={true} width={'calc(50% - 16px)'}/>

                            <TextField

                                placeholder={lang.altEmail} label={lang.altEmail} handleChange={event => {
                                setChanged(true)
                                props.handleChange({name: 'personal_email_alt', value: event.target.value})
                            }}
                                value={props.data === null ? null : props.data.personal_email_alt}
                                required={false} width={'calc(50% - 16px)'}/>
                        </>
                    )
                },
                    {
                        title: lang.phones,
                        child: (
                            <>
                                <TextField

                                    placeholder={lang.phone} label={lang.phone} handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'personal_phone', value: event.target.value})
                                }}
                                    value={props.data === null ? null : props.data.personal_phone}
                                    required={true} width={'calc(50% - 16px)'}
                                    maxLength={undefined} phoneMask={true}/>


                                <TextField

                                    placeholder={lang.altPhone} label={lang.altPhone} handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'personal_phone_alt', value: event.target.value})
                                }}
                                    value={props.data === null ? null : props.data.personal_phone_alt}
                                    required={false} width={'calc(50% - 16px)'}
                                    maxLength={undefined} phoneMask={true}/>
                            </>
                        )
                    },

                ]}/>
        </>
    )

}

ContactForm.propTypes = {
    id: PropTypes.number,
    data: PropTypes.object,
    handleChange: PropTypes.func,
    handleSubmit: PropTypes.func,
    editable: PropTypes.bool,
    setAccepted: PropTypes.func,
    returnToMain: PropTypes.func,
    create: PropTypes.bool,
}