import React, {useState} from "react";
import PropTypes from "prop-types";
import {DateField, TextField} from "sis-aeb-inputs";
import Host from "../../utils/shared/Host";
import Cookies from "universal-cookie/lib";
import {Alert, Selector, EntityLayout} from "sis-aeb-misc";
import submitContractualLinkage from "../../utils/submit/SubmitContractualLinkage";
import ContractualLinkagePT from "../../packages/locales/person/ContractualLinkagePT";
import ContractualLinkageOverview from "../../packages/overview/ContractualLinkageOverview";
import ContractualLinkageDescription from "../../packages/descriptions/ContractualLinkageDescription";
import CorporateKeys from "../../packages/keys/CorporateKeys";


const cookies = new Cookies()

export default function ContractualLinkageForm(props) {

    const [changed, setChanged] = useState(false)
    const lang = ContractualLinkagePT
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
                fields={ContractualLinkageOverview} entityID={props.create ? undefined : props.data.id}
                rootElementID={'root'} entity={props.data}
                create={props.create} label={lang.title} entityKey={CorporateKeys.contractualLinkage} fetchToken={(new Cookies()).get('jwt')}
                fetchUrl={Host() + 'list/object'} exists={true} fetchSize={15} setVersion={() => null}
                dependencies={{
                    fields: [
                        {name: 'denomination', type: 'string'},
                        {name: 'legal_document', type: 'string'},
                        props.data === null || !props.data || props.data.effective_role === null || !props.data.effective_role || (props.data.contract !== null && props.data.contract !== undefined) ? {
                            name: 'contract',
                            type: 'object'
                        } : null,
                        props.data === null || !props.data || props.data.contract === null || !props.data.contract || (props.data.effective_role !== null && props.data.effective_role !== undefined) ? {
                            name: 'effective_role',
                            type: 'object'
                        } : null,
                        {name: 'entity', type: 'object'},
                    ],
                    changed: changed
                }} returnButton={true}
                handleSubmit={() =>
                    submitContractualLinkage({
                        pk: props.data === null ? null : props.data.id,
                        data: props.data,
                        create: props.data.id === undefined || props.data.id === null,
                        setStatus: setStatus
                    }).then(res => {
                        setChanged(!res)
                    })
                }
                handleClose={() => props.closeModal()}
                forms={
                    [
                        {
                            child: (
                                <>

                                    <TextField
                                        dark={true}
                                        placeholder={lang.denomination} label={lang.denomination}
                                        handleChange={event => {
                                            setChanged(true)
                                            props.handleChange({
                                                name: 'denomination',
                                                value: event.target.value
                                            })
                                        }}
                                        locale={props.locale}
                                        value={props.data === null ? null : props.data.denomination}
                                        required={true}
                                        width={'calc(33.333% - 21.5px)'}
                                    />

                                    <TextField
                                        dark={true}
                                        placeholder={lang.description} label={lang.description}
                                        handleChange={event => {
                                            setChanged(true)
                                            props.handleChange({
                                                name: 'description',
                                                value: event.target.value
                                            })
                                        }}
                                        locale={props.locale}
                                        value={props.data === null ? null : props.data.description}
                                        required={true}
                                        width={'calc(33.333% - 21.5px)'}
                                    />

                                    <TextField
                                        dark={true}
                                        placeholder={lang.legalDocument} label={lang.legalDocument}
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
                                        width={'calc(33.333% - 21.5px)'}
                                    />
                                </>
                            )
                        },
                        {
                            title: lang.dependencies,
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
                                            props.handleChange({name: 'effective_role', value: entity})
                                        }} selectorKey={'effective-selector'}
                                        selected={props.data === null ? null : props.data.effective_role}
                                        setChanged={setChanged} required={false} label={lang.effective}
                                        disabled={!(props.data === null || !props.data || props.data.contract === null || !props.data.contract || (props.data.effective_role !== null && props.data.effective_role !== undefined))}
                                        width={'calc(50% - 16px)'}
                                        renderEntity={entity => {
                                            if (entity !== undefined && entity !== null)
                                                return (
                                                    <div style={{display: 'flex', alignItems: 'center'}}
                                                         key={entity.id + '-effective-role'}>
                                                        {entity.denomination}
                                                        {entity.id}
                                                    </div>
                                                )
                                            else
                                                return null
                                        }} fetchUrl={Host() + 'list/role_effective'}
                                        fetchToken={(cookies).get('jwt')}
                                        elementRootID={'root'}/>


                                    <Selector
                                        getEntityKey={entity => {
                                            if (entity !== undefined && entity !== null)
                                                return entity.id
                                            else
                                                return -1
                                        }}
                                        handleChange={entity => {
                                            setChanged(true)
                                            props.handleChange({name: 'contract', value: entity})
                                        }} selectorKey={'contract-selector'}
                                        selected={props.data === null ? null : props.data.contract}
                                        setChanged={setChanged} required={false} label={lang.contract}
                                        disabled={!(props.data === null || !props.data || props.data.effective_role === null || !props.data.effective_role || (props.data.contract !== null && props.data.contract !== undefined))}
                                        width={'calc(50% - 16px)'}
                                        renderEntity={entity => {
                                            if (entity !== undefined && entity !== null)
                                                return (
                                                    <div style={{display: 'flex', alignItems: 'center'}}
                                                         key={entity.id + '-contract'}>
                                                        {entity.sei}
                                                        {entity.id}
                                                    </div>
                                                )
                                            else
                                                return null
                                        }} fetchUrl={Host() + 'list/contract'}
                                        fetchToken={(cookies).get('jwt')}
                                        elementRootID={'root'}/>


                                    <Selector
                                        getEntityKey={entity => {
                                            if (entity !== undefined && entity !== null)
                                                return entity.id
                                            else
                                                return -1
                                        }}
                                        handleChange={entity => {
                                            setChanged(true)
                                            props.handleChange({name: 'entity', value: entity})
                                        }} selectorKey={'entity-selector'}
                                        selected={props.data === null ? null : props.data.entity}
                                        setChanged={setChanged} required={true} label={lang.entity}
                                        disabled={false}
                                        width={'100%'}
                                        renderEntity={entity => {

                                            if (entity !== undefined && entity !== null)
                                                return (
                                                    <div style={{display: 'flex', alignItems: 'center'}}
                                                         key={entity.id + '-entity'}>
                                                        {entity.acronym}
                                                        {entity.id}
                                                    </div>
                                                )
                                            else
                                                return null
                                        }} fetchUrl={Host() + 'list/entity'} fetchToken={(cookies).get('jwt')}
                                        elementRootID={'root'}/>

                                </>
                            )
                        },
                        {
                            title: lang.occupancy,
                            child: (
                                <>
                                    <DateField
                                        placeholder={lang.publication} label={lang.publication}
                                        handleChange={event => {
                                            setChanged(true)
                                            props.handleChange({
                                                name: 'official_publication_date',
                                                value:
                                                event.target.value
                                            })
                                        }} locale={props.locale}
                                        value={
                                            props.data !== null && typeof (props.data.official_publication_date) === 'number' ?
                                                new Date(props.data.official_publication_date).toLocaleDateString().replaceAll('/', '-'
                                                ).replace(/(\d{2})-(\d{2})-(\d{4})/, "$3-$2-$1")
                                                :
                                                props.data === null ? null : props.data.official_publication_date
                                        }
                                        required={true} width={'calc(33.333% - 21.5px)'}/>
                                    <DateField
                                        placeholder={lang.admission} label={lang.admission}
                                        handleChange={event => {
                                            setChanged(true)
                                            props.handleChange({
                                                name: 'admission_date',
                                                value:
                                                event.target.value
                                            })
                                        }} locale={props.locale}
                                        value={
                                            props.data !== null && typeof (props.data.admission_date) === 'number' ?
                                                new Date(props.data.admission_date).toLocaleDateString().replaceAll('/', '-'
                                                ).replace(/(\d{2})-(\d{2})-(\d{4})/, "$3-$2-$1")
                                                :
                                                props.data === null ? null : props.data.admission_date
                                        }
                                        required={true} width={'calc(33.333% - 21.5px)'}/>
                                    <Selector
                                        getEntityKey={entity => {
                                            if (entity !== undefined && entity !== null)
                                                return entity.id
                                            else
                                                return -1
                                        }}
                                        handleChange={entity => {
                                            setChanged(true)
                                            props.handleChange({name: 'unit', value: entity})
                                        }}
                                        selectorKey={'unit-selector'}
                                        selected={props.data === null ? null : props.data.unit}
                                        setChanged={setChanged} required={true} label={lang.unit}
                                        disabled={false}
                                        width={'calc(33.333% - 21.5px)'}
                                        renderEntity={entity => {

                                            if (entity !== undefined && entity !== null)
                                                return (
                                                    <div style={{display: 'flex', alignItems: 'center'}}>
                                                        {entity.acronym}
                                                    </div>
                                                )
                                            else
                                                return null
                                        }} fetchUrl={Host() + 'list/unit'} fetchToken={(cookies).get('jwt')}
                                        elementRootID={'root'}/>

                                </>
                            )
                        },
                    ]}/>
        </>
    )

}

ContractualLinkageForm.propTypes = {
    create: PropTypes.bool,
    closeModal: PropTypes.func,
    data: PropTypes.object,
    handleChange: PropTypes.func,
    personID: PropTypes.number,
}
