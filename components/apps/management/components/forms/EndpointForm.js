import PropTypes from 'prop-types'

import Form from "../../../../core/inputs/form/Form";
import FormRow from "../../../../core/inputs/form/FormRow";
import Checkbox from "../../../../core/inputs/checkbox/Checkbox";
import CheckboxGroup from "../../../../core/inputs/checkbox/CheckboxGroup";
import TextField from "../../../../core/inputs/text/TextField";
import Selector from "../../../../core/inputs/selector/Selector";
import {entity_query, service_query} from "../../queries/queries";
import {useQuery} from "mfc-core";
import {entityKeys, serviceKeys} from "../../keys/keys";
import useData from "../../../../core/inputs/form/useData";
import {useMemo} from "react";
import submit from "../../utils/requests/submit";
import EntityForm from "./EntityForm";

export default function EndpointForm(props) {
    const serviceHook = useQuery(service_query)
    const entityHook = useQuery(entity_query)
    const initialData = useMemo(() => {
        return !props.initialData.url ? {service: {id: props.service}} : props.initialData
    }, [])
    const formHook = useData(initialData)

    return (
        <Form
            hook={formHook}
            title={props.initialData.url === undefined ? 'Novo endpoint' : 'Endpoint'}
            handleClose={() => props.handleClose()}
            returnButton={true}
            handleSubmit={(data, clearState) => {
                submit({
                    suffix: 'endpoint',
                    pk: data.url,
                    create: props.initialData.url === undefined,
                    data: {
                        ...data,
                        entity: data.entity ? data.entity.id : undefined,
                        service: data.service.id,
                        versioning: data.versioning !== null && data.versioning !== undefined ? data.versioning : false
                    },
                    prefix: 'gateway'
                }).then((res) => {
                    if (props.service && res.success) {
                        props.handleClose()
                    } else {
                        if (res.success && props.initialData.url === undefined) {
                            props.redirect(res.data.id)
                            clearState()
                        } else if (res.success) {
                            props.updateData(data)
                        }
                    }
                })
            }}
            noHeader={props.initialData.url !== undefined && !props.service}
            create={props.initialData.url === undefined}
        >

            {(data, handleChange) => (
                <>
                    <FormRow title={'Informações'}>
                        <TextField
                            placeholder={'url'} value={data.url}
                            label={'URL'} disabled={false} maskStart={'/api/'}
                            handleChange={e => handleChange({event: e.target.value, key: 'url'})}
                            required={true} width={'100%'}
                        />
                        <TextField
                            placeholder={'Denominação'} value={data.denomination}
                            label={'Denominação'} disabled={false}
                            handleChange={e => handleChange({event: e.target.value, key: 'denomination'})}
                            required={true} width={'calc(50% - 16px)'}
                        />
                        <TextField
                            placeholder={'Descrição'} value={data.description}
                            label={'Descrição'} disabled={false}
                            handleChange={e => handleChange({event: e.target.value, key: 'description'})}
                            required={false} width={'calc(50% - 16px)'} variant={'area'}
                        />
                    </FormRow>
                    <FormRow title={'Acesso'}>
                        <CheckboxGroup label={'Requer autenticação'}
                                       width={props.service ? 'calc(33.333% - 21.5px)' : 'calc(50% - 16px)'}
                                       required={true}
                                       value={data.require_auth}>
                            <Checkbox checked={data.require_auth} label={'Sim'}
                                      handleCheck={() => handleChange({event: true, key: 'require_auth'})}/>
                            <Checkbox checked={data.require_auth === false} label={'Não'}
                                      handleCheck={() => handleChange({event: false, key: 'require_auth'})}/>
                        </CheckboxGroup>
                        <CheckboxGroup label={'Versionamento dos dados'}
                                       width={props.service ? 'calc(33.333% - 21.5px)' : 'calc(50% - 16px)'}
                                       required={true}
                                       value={data.versioning ? data.versioning : false}>
                            <Checkbox checked={data.versioning} label={'Sim'} disabled={!data.method?.includes('PUT')}
                                      handleCheck={() => handleChange({event: true, key: 'versioning'})}/>
                            <Checkbox checked={!data.versioning} label={'Não'} disabled={!data.method?.includes('PUT')}
                                      handleCheck={() => handleChange({event: false, key: 'versioning'})}/>
                        </CheckboxGroup>

                        {props.service ? null :
                            <Selector
                                hook={serviceHook}
                                keys={serviceKeys}
                                title={'Serviço'} placeholder={'Serviço'}
                                value={data.service} width={'calc(50% - 16px)'} required={true}
                                handleChange={e => handleChange({event: e, key: 'service'})}
                            />
                        }
                        <Selector
                            hook={entityHook}
                            keys={entityKeys}
                            title={'Entidade'} placeholder={'Entidade'}
                            value={data.entity} width={props.service ? 'calc(33.333% - 21.5px)' : 'calc(50% - 16px)'}
                            required={false}
                            handleChange={e => handleChange({event: e, key: 'entity'})}
                            createOption={true}
                        >
                            {handleClose => <EntityForm handleClose={() => handleClose()} create={true}
                                                        asModal={true}/>}
                        </Selector>
                    </FormRow>
                </>
            )}
        </Form>
    )
}

EndpointForm.propTypes = {
    initialData: PropTypes.object,
    handleClose: PropTypes.func,
    service: PropTypes.number
}