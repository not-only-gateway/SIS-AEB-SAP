import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {DateField, TextField} from "sis-aeb-inputs";
import Host from "../../utils/shared/Host";
import Cookies from "universal-cookie/lib";
import {Alert, EntityLayout} from "sis-aeb-misc";
import ContractualLinkageOverview from "../../packages/overview/ContractualLinkageOverview";
import ContractualLinkageDescription from "../../packages/descriptions/ContractualLinkageDescription";
import CorporateKeys from "../../packages/keys/CorporateKeys";
import ProgressionPT from "../../packages/locales/person/ProgressionPT";
import submitProgression from "../../utils/submit/SubmitProgression";


const cookies = new Cookies()

export default function ProgressionForm(props) {

    const [changed, setChanged] = useState(false)
    const lang = ProgressionPT
    const [status, setStatus] = useState({
        type: undefined,
        message: undefined
    })
    useEffect(() => {
        props.handleChange({
            name: 'linkage',
            value: props.linkageID
        })
    }, [])
    return (
        <>

            <Alert
                type={status.type} render={status.type !== undefined} rootElementID={'root'}
                handleClose={() => setStatus({type: undefined, message: undefined})} message={status.message}
            />
            <EntityLayout
                information={ContractualLinkageDescription}
                fields={ContractualLinkageOverview} entityID={props.create ? undefined : props.data.id}
                rootElementID={'root'} entity={props.data}
                create={props.create} label={lang.title} entityKey={CorporateKeys.contractualLinkage}
                fetchToken={(new Cookies()).get('jwt')}
                fetchUrl={Host() + 'list/object'} exists={true} fetchSize={15} setVersion={() => null}
                dependencies={{
                    fields: [
                        {name: 'legal_document', type: 'string'},
                        {name: 'role_level', type: 'string'},
                        {name: 'role_class', type: 'string'},
                        {name: 'date', type: 'date'}
                    ],
                    changed: changed
                }} returnButton={true}
                handleSubmit={() =>
                    submitProgression({
                        pk: props.data === null ? null : props.data.id,
                        data: props.data,
                        linkageID: props.linkageID,
                        create: props.data.id === undefined || props.data.id === null,
                        setStatus: setStatus
                    }).then(res => {
                        setChanged(!res)
                    })
                }
                handleClose={() => props.returnToMain()}
                forms={
                    [
                        {
                            child: (
                                <>
                                    <DateField
                                        placeholder={lang.date} label={lang.date}
                                        handleChange={event => {
                                            setChanged(true)
                                            props.handleChange({
                                                name: 'date',
                                                value:
                                                event.target.value
                                            })
                                        }} locale={props.locale}
                                        value={
                                            props.data !== null && typeof (props.data.date) === 'number' ?
                                                new Date(props.data.date).toLocaleDateString().replaceAll('/', '-'
                                                ).replace(/(\d{2})-(\d{2})-(\d{4})/, "$3-$2-$1")
                                                :
                                                props.data === null ? null : props.data.date
                                        }
                                        required={true}
                                        width={'calc(50% - 16px)'}/>

                                    <TextField
                                        dark={true}
                                        placeholder={lang.legalDocument } label={lang.legalDocument}
                                        handleChange={event => {
                                            setChanged(true)
                                            props.handleChange({
                                                name: 'legal_document',
                                                value: event.target.value
                                            })
                                        }}
                                        locale={props.locale}
                                        value={props.data === null ? null : props.data.legal_document}
                                        required={true}
                                        width={'calc(50% - 16px)'}
                                    />
                                </>
                            )
                        },
                        {
                            title: lang.info,
                            child: (
                                <>

                                    <TextField
                                        dark={true}
                                        placeholder={lang.level } label={lang.level}
                                        handleChange={event => {
                                            setChanged(true)
                                            props.handleChange({
                                                name: 'role_level',
                                                value: event.target.value
                                            })
                                        }}
                                        locale={props.locale}
                                        value={props.data === null ? null : props.data.role_level}
                                        required={true}
                                        width={'calc(50% - 16px)'}
                                    />

                                    <TextField
                                        dark={true}
                                        placeholder={lang.class} label={lang.class}
                                        handleChange={event => {
                                            setChanged(true)
                                            props.handleChange({
                                                name: 'role_class',
                                                value: event.target.value
                                            })
                                        }}
                                        locale={props.locale}
                                        value={props.data === null ? null : props.data.role_class}
                                        required={true}
                                        width={'calc(50% - 16px)'}
                                    />
                                </>
                            )
                        }
                    ]}/>
        </>
    )

}

ProgressionForm.propTypes = {
    create: PropTypes.bool,
    returnToMain: PropTypes.func,
    data: PropTypes.object,
    handleChange: PropTypes.func,
    linkageID: PropTypes.number,
}
