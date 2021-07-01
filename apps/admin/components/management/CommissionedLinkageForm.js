import PropTypes from "prop-types";
import {Alert, Selector,EntityLayout} from "sis-aeb-misc";
import {DateField, DropDownField, TextField} from "sis-aeb-inputs";
import React, {useState} from "react";
import Host from "../../utils/shared/Host";
import Cookies from "universal-cookie/lib";
import CommissionedLinkagePT from "../../packages/locales/management/CommissionedLinkagePT";
import submitCommissionedLinkage from "../../utils/submit/SubmitCommissionedLinkage";
import ContractualLinkageDescription from "../../packages/descriptions/ContractualLinkageDescription";
import ContractualLinkageOverview from "../../packages/overview/ContractualLinkageOverview";
import CorporateKeys from "../../packages/keys/CorporateKeys";
import CommissionedLinkageOverview from "../../packages/overview/CommissionedLinkageOverview";

export default function CommissionedLinkageForm(props) {
    const [changed, setChanged] = useState(false)
    const lang = CommissionedLinkagePT
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

            <EntityLayout
                information={ContractualLinkageDescription}
                fields={CommissionedLinkageOverview} entityID={props.create ? undefined : props.data.id}
                rootElementID={'root'} entity={props.data}
                create={props.create} label={lang.title} entityKey={CorporateKeys.commissionedLinkage} fetchToken={(new Cookies()).get('jwt')}
                fetchUrl={Host() + 'list/object'} exists={true} fetchSize={15} setVersion={() => null}
                dependencies={{
                    fields: [
                        {name: 'unit_role', type: 'object'},
                        {name: 'substitute', type: 'bool'},
                        {name: 'official_publication_date', type: 'date'},
                        {name: 'admission_date', type: 'date'},
                        {name: 'legal_document', type: 'string'}
                    ],
                    changed: changed,
                    entity: props.data
                }} returnButton={true}
                handleSubmit={() =>
                    submitCommissionedLinkage({
                        pk: props.data === null ? null : props.data.id,
                        data: props.data,
                        create: props.data.id === undefined || props.data.id === null,
                        setStatus: setStatus
                    }).then(res => {
                        setChanged(!res)
                    })
                }
                handleClose={() => props.closeModal()}
                forms={[{
                    title: lang.base,
                    child: (
                        <>
                            <Selector
                                getEntityKey={entity => {
                                    if (entity !== undefined && entity !== null)
                                        return entity.id
                                    else
                                        return -1
                                }}
                                handleChange={entity => {
                                    setChanged(true)
                                    props.handleChange({name: 'unit_role', value: entity})
                                }}
                                selectorKey={'unit_role-selector'}
                                selected={props.data === null ? null : props.data.unit_role}
                                setChanged={setChanged} required={true} label={lang.unitRole}
                                disabled={false}
                                width={'100%'}
                                renderEntity={entity => {

                                    if (entity !== undefined && entity !== null)
                                        return (
                                            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
                                                <div>
                                                    {entity.role.denomination}
                                                </div>
                                                <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
                                                    {entity.unit.name}
                                                    <div style={{borderRight: '#e0e0e0 1px solid', width: '1px', height: '20px'}}/>
                                                    {entity.unit.acronym}
                                                </div>
                                            </div>
                                        )
                                    else
                                        return null
                                }} fetchUrl={Host() + 'list/empty/vacancy'} fetchToken={(new Cookies()).get('jwt')}
                                elementRootID={'root'}/>
                            <DateField
                                placeholder={lang.officialPublication} label={lang.officialPublication}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({
                                        name: 'official_publication_date',
                                        value:
                                        event.target.value
                                    })
                                }}
                                value={
                                    props.data !== null && typeof (props.data.official_publication_date) === 'number' ?
                                        new Date(props.data.official_publication_date).toLocaleDateString().replaceAll('/', '-'
                                        ).replace(/(\d{2})-(\d{2})-(\d{4})/, "$3-$2-$1")
                                        :
                                        props.data === null ? null : props.data.official_publication_date
                                }
                                required={true} width={'calc(50% - 16px)'}/>
                            <DateField
                                placeholder={lang.admissionDate} label={lang.admissionDate}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({
                                        name: 'admission_date',
                                        value:
                                        event.target.value
                                    })
                                }}
                                value={
                                    props.data !== null && typeof (props.data.admission_date) === 'number' ?
                                        new Date(props.data.admission_date).toLocaleDateString().replaceAll('/', '-'
                                        ).replace(/(\d{2})-(\d{2})-(\d{4})/, "$3-$2-$1")
                                        :
                                        props.data === null ? null : props.data.admission_date
                                }
                                required={true} width={'calc(50% - 16px)'}/>
                        </>
                    )
                },
                    {
                        title: lang.additional,
                        child: (
                            <>
                                <DropDownField
                                    dark={true}
                                    placeholder={lang.substitute}
                                    label={lang.substitute}
                                    handleChange={event => {
                                        setChanged(true)
                                        props.handleChange({name: 'substitute', value: event})
                                    }} value={props.data === null ? null : props.data.substitute}
                                    required={true}
                                    width={'calc(33.333% - 21.5px)'} choices={lang.choices}/>
                                <TextField

                                    placeholder={lang.legalDocument} label={lang.legalDocument}
                                    handleChange={event => {
                                        setChanged(true)
                                        props.handleChange({name: 'legal_document', value: event.target.value})
                                    }}

                                    value={props.data === null ? null : props.data.legal_document}
                                    required={true}
                                    width={'calc(33.333% - 21.5px)'}
                                />

                                <TextField

                                    placeholder={lang.origin} label={lang.origin}
                                    handleChange={event => {
                                        setChanged(true)
                                        props.handleChange({name: 'origin', value: event.target.value})
                                    }}

                                    value={props.data === null ? null : props.data.origin}
                                    required={false}
                                    width={'calc(33.333% - 21.5px)'}
                                />

                            </>
                        )
                    },
                ]}/>
        </>
    )
}
CommissionedLinkageForm.propTypes = {
    create: PropTypes.bool,
    closeModal: PropTypes.func,
    data: PropTypes.object,
    handleChange: PropTypes.func
}