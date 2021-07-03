import React, {useState} from "react";
import PropTypes from "prop-types";
import {TextField} from "sis-aeb-inputs";
import Host from "../../utils/shared/Host";
import Cookies from "universal-cookie/lib";
import {Alert, EntityLayout, Selector} from "sis-aeb-misc";
import LinkagePT from "../../packages/locales/person/LinkagePT";
import ContractualLinkageOverview from "../../packages/overview/ContractualLinkageOverview";
import ContractualLinkageDescription from "../../packages/descriptions/ContractualLinkageDescription";
import CorporateKeys from "../../packages/keys/CorporateKeys";
import submitLinkage from "../../utils/submit/SubmitLinkage";


const cookies = new Cookies()

export default function LinkageForm(props) {

    const [changed, setChanged] = useState(false)
    const lang = LinkagePT
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
                create={props.create} label={lang.title} entityKey={CorporateKeys.contractualLinkage}
                fetchToken={(new Cookies()).get('jwt')}
                fetchUrl={Host() + 'list/object'} exists={true} fetchSize={15} setVersion={() => null}
                dependencies={{
                    fields: [
                        {name: 'admission_type', type: 'string'},
                        {name: 'working_day', type: 'string'},
                        {name: 'legal_regime', type: 'string'}
                    ],
                    changed: changed
                }} returnButton={true}
                handleSubmit={() =>
                    submitLinkage({
                        pk: props.data === null ? null : props.data.id,
                        data: props.data,
                        collaboratorID: props.collaboratorID,
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
                                    <TextField
                                        dark={true}
                                        placeholder={lang.admissionType } label={lang.admissionType}
                                        handleChange={event => {
                                            setChanged(true)
                                            props.handleChange({
                                                name: 'admission_type',
                                                value: event.target.value
                                            })
                                        }}
                                        locale={props.locale}
                                        value={props.data === null ? null : props.data.admission_type}
                                        required={true}
                                        width={'calc(33.333% - 21.5px)'}
                                    />

                                    <TextField
                                        dark={true}
                                        placeholder={lang.workingDay } label={lang.workingDay}
                                        handleChange={event => {
                                            setChanged(true)
                                            props.handleChange({
                                                name: 'working_day',
                                                value: event.target.value
                                            })
                                        }}
                                        locale={props.locale}
                                        value={props.data === null ? null : props.data.working_day}
                                        required={true}
                                        width={'calc(33.333% - 21.5px)'}
                                    />

                                    <TextField
                                        dark={true}
                                        placeholder={lang.legalRegime } label={lang.legalRegime}
                                        handleChange={event => {
                                            setChanged(true)
                                            props.handleChange({
                                                name: 'legal_regime',
                                                value: event.target.value
                                            })
                                        }}
                                        locale={props.locale}
                                        value={props.data === null ? null : props.data.legal_regime}
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
                                                    </div>
                                                )
                                            else
                                                return null
                                        }} fetchUrl={Host() + 'list/contract'}
                                        fetchToken={(cookies).get('jwt')}
                                        elementRootID={'root'}/>

                                </>
                            )
                        },
                        {
                            title: lang.occupancy,
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
                                            props.handleChange({name: 'vacancy', value: entity})
                                        }}
                                        selectorKey={'vacancy-selector'}
                                        selected={props.data === null ? null : props.data.vacancy}
                                        setChanged={setChanged} required={false} label={lang.vacancy}
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
                                </>
                            )
                        },
                    ]}/>
        </>
    )

}

LinkageForm.propTypes = {
    create: PropTypes.bool,
    returnToMain: PropTypes.func,
    data: PropTypes.object,
    handleChange: PropTypes.func,
    collaboratorID: PropTypes.number,
}
