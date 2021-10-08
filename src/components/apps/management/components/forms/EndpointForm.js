import PropTypes from 'prop-types'

import Form from "../../../../core/inputs/form/Form";
import FormRow from "../../../../core/inputs/form/FormRow";
import Checkbox from "../../../../core/inputs/checkbox/Checkbox";
import CheckboxGroup from "../../../../core/inputs/checkbox/CheckboxGroup";
import TextField from "../../../../core/inputs/text/TextField";
import Selector from "../../../../core/inputs/selector/Selector";
import {entity_query, service_query} from "../../queries/queries";
import {useQuery} from "sis-aeb-core";
import {endpoint, service} from "../../utils/submits";
import MultiSelectField from "../../../../core/inputs/multiselect/MultiSelectField";
import {entityKeys, serviceKeys} from "../../keys/keys";

export default function EndpointForm(props) {
    const serviceHook = useQuery(service_query)
    const entityHook = useQuery(entity_query)
    return (
        <Form
            title={!props.initialData.id ? 'Novo endpoint' : 'Endpoint'} initialData={props.initialData}
            handleClose={() => props.handleClose()}
            dependencies={[
                {name: 'require_auth', type: 'bool'},
                {name: 'url', type: 'string'},
                {name: 'service', type: 'object'},
                {name: 'methods', type: 'array'},
                {name: 'denomination', type: 'string'}
            ]} returnButton={true}
            handleSubmit={(data, clearState) => {
                endpoint({
                    pk: data.id,
                    create: props.initialData.url === undefined,
                    data: {
                        ...data,
                        service: data.service.id,
                        versioning: data.versioning !== null && data.versioning !== undefined ? data.versioning : false
                    }
                }).then((res) => {
                    if(res !== null && props.initialData.url === undefined) {
                        props.redirect(res)
                        clearState()
                    }
                    else {
                        props.updateData(data)
                    }
                })
            }}
            noHeader={props.initialData.url !== undefined}
            create={props.initialData.url === undefined}
        >

            {(data, handleChange) => (
                <>
                    <FormRow title={'Informações'}>
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
                        <CheckboxGroup label={'Requer autenticação'} width={'calc(50% - 16px)'} required={true}
                                       value={data.require_auth}>
                            <Checkbox checked={data.require_auth} label={'Sim'}
                                      handleCheck={() => handleChange({event: true, key: 'require_auth'})}/>
                            <Checkbox checked={data.require_auth === false} label={'Não'}
                                      handleCheck={() => handleChange({event: false, key: 'require_auth'})}/>
                        </CheckboxGroup>
                        <CheckboxGroup label={'Versionamento dos dados'} width={'calc(50% - 16px)'} required={true}
                                       value={data.versioning ? data.versioning : false}>
                            <Checkbox checked={data.versioning} label={'Sim'} disabled={!data.method?.includes('PUT')}
                                      handleCheck={() => handleChange({event: true, key: 'versioning'})}/>
                            <Checkbox checked={!data.versioning} label={'Não'} disabled={!data.method?.includes('PUT')}
                                      handleCheck={() => handleChange({event: false, key: 'versioning'})}/>
                        </CheckboxGroup>
                        <TextField
                            placeholder={'url'} value={data.url}
                            label={'URL'} disabled={false} maskStart={'/api/'}
                            handleChange={e => handleChange({event: e.target.value, key: 'url'})}
                            required={true} width={'calc(50% - 16px)'}
                        />
                        <MultiSelectField
                            placeholder={'Métodos HTTP'} value={data.methods}
                            label={'Método HTTP'} disabled={false} asArray={true}
                            choices={[
                                {key: 'POST', value: 'POST', color: '#fec02b'},
                                {key: 'GET', value: 'GET', color: '#20c060'},
                                {key: 'PUT', value: 'PUT', color: '#57a2ed'},
                                {key: 'DELETE', value: 'DELETE', color: '#ed4136'},
                                {key: 'PATCH', value: 'PATCH', color: '#5f5f5f'}
                            ]}
                            handleChange={e => handleChange({event: e, key: 'methods'})}
                            required={true} width={'calc(50% - 16px)'}
                        />
                        <Selector
                            hook={serviceHook}
                            keys={serviceKeys}
                            title={'Serviço'} placeholder={'Serviço'}
                            value={data.service} width={'calc(50% - 16px)'} required={true}
                            handleChange={e => handleChange({event: e, key: 'service'})}/>
                        <Selector
                            hook={entityHook}
                            keys={entityKeys}
                            title={'Entidade'} placeholder={'Entidade'}
                            value={data.entity} width={'calc(50% - 16px)'} required={false}
                            handleChange={e => handleChange({event: e, key: 'entity'})}/>
                    </FormRow>
                </>
            )}
        </Form>
    )
}

EndpointForm.propTypes = {
    initialData: PropTypes.object,
    handleClose: PropTypes.func,
}