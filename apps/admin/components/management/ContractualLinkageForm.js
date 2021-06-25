import React, {useState} from "react";
import PropTypes from "prop-types";
import {Alert, Selector} from "sis-aeb-misc";
import {FormLayout, TextField} from "sis-aeb-inputs";
import {linkage} from "../../packages/locales/management/SimpleFormsPT";
import Host from "../../utils/shared/Host";
import Cookies from "universal-cookie/lib";



export default function ContractualLinkageForm(props) {

    const [changed, setChanged] = useState(false)
    const lang = linkage
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

                        {name: 'legal_document', type: 'string'},
                        {name: 'contract', type: 'object'},
                        {name: 'effective_role', type: 'object'},
                        {name: 'entity', type: 'object'},
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
                                dark={true}
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
                                placeholder={lang.description} label={lang.description}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'description', value: event.target.value})
                                }}
                                locale={props.locale} value={props.data === null ? null : props.data.description}
                                required={true}
                                width={'calc(50% - 16px)'}
                            />


                        </>
                    )
                },
                    {
                        title: lang.additional,
                        child: (
                            <>
                                {props.data === null || props.data === undefined || props.data.contract === null || props.data.contract === undefined || typeof props.data.effective_role === 'object' ?
                                    <Selector
                                        handleChange={entity => {
                                            setChanged(true)
                                            props.handleChange({name: 'effective_role', value: entity})
                                        }} selectorKey={'effective-selector'}
                                        selected={props.data === null ? null : props.data.effective_role}
                                        setChanged={setChanged} required={true} label={lang.effective}
                                        disabled={false} width={props.data && props.data.effective_role? 'calc(50% - 16px)' :'calc(33.333% - 21.5px)'}
                                        renderEntity={entity => {
                                            if (entity !== undefined && entity !== null)
                                                return (
                                                    <div style={{display: 'flex', alignItems: 'center'}} key={entity.id}>
                                                        {entity.denomination}
                                                    </div>
                                                )
                                            else
                                                return null
                                        }} fetchUrl={Host() + 'list/role_effective'} fetchToken={(new Cookies()).get('jwt')}
                                        elementRootID={'root'}/>
                                    :
                                    null
                                }

                                {props.data === null || props.data === undefined || props.data.effective_role === null || props.data.effective_role === undefined || typeof props.data.contract === 'object' ?
                                    <Selector
                                        handleChange={entity => {
                                            setChanged(true)
                                            props.handleChange({name: 'contract', value: entity})
                                        }} selectorKey={'contract-selector'}
                                        selected={props.data === null ? null : props.data.contract}
                                        setChanged={setChanged} required={true} label={lang.contract}
                                        disabled={false} width={props.data && props.data.contract? 'calc(50% - 16px)' :'calc(33.333% - 21.5px)'}
                                        renderEntity={entity => {
                                            if (entity !== undefined && entity !== null)
                                                return (
                                                    <div style={{display: 'flex', alignItems: 'center'}} key={entity.id}>
                                                        {entity.sei}
                                                    </div>
                                                )
                                            else
                                                return null
                                        }} fetchUrl={Host() + 'list/contract'} fetchToken={(new Cookies()).get('jwt')}
                                        elementRootID={'root'}/>
                                    :
                                    null
                                }


                                <Selector
                                    handleChange={entity => {
                                        setChanged(true)
                                        props.handleChange({name: 'entity', value: entity})
                                    }} selectorKey={'entity-selector'}
                                    selected={props.data === null ? null : props.data.entity}
                                    setChanged={setChanged} required={true} label={lang.entity}
                                    disabled={false}
                                    width={props.data && (props.data.effective_role || props.data.contract)? 'calc(50% - 16px)' :'calc(33.333% - 21.5px)'}
                                    renderEntity={entity => {
                                        console.log(entity)
                                        if (entity !== undefined && entity !== null)
                                            return (
                                                <div style={{display: 'flex', alignItems: 'center'}} key={entity.id}>
                                                    {entity.acronym}
                                                </div>
                                            )
                                        else
                                            return null
                                    }} fetchUrl={Host() + 'list/entity'} fetchToken={(new Cookies()).get('jwt')}
                                    elementRootID={'root'} />

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
    handleChange: PropTypes.func
}