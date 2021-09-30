import PropTypes from 'prop-types'

import Form from "../../../../core/inputs/form/Form";
import DropDownField from "../../../../core/inputs/dropdown/DropDownField";
import FormRow from "../../../../core/inputs/form/FormRow";
import Checkbox from "../../../../core/inputs/checkbox/Checkbox";
import CheckboxGroup from "../../../../core/inputs/checkbox/CheckboxGroup";
import TextField from "../../../../core/inputs/text/TextField";
import Selector from "../../../../core/inputs/selector/Selector";
import {service_query} from "../../queries/queries";
import {useQuery} from "sis-aeb-core";

export default function EndpointForm(props) {
    const hook = useQuery(service_query)
    return (
        <Form
            title={!props.initialData.id ? 'Novo endpoint' : 'Endpoint'} initialData={props.initialData}
            handleClose={() => props.handleClose()}
            dependencies={[
                {name: 'host', type: 'string'},
                {name: 'denomination', type: 'string'}
            ]} returnButton={true}
            handleSubmit={data => {

            }}
            create={!props.initialData.id}

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
                        <CheckboxGroup label={'Requer autenticação'} width={'100%'} required={true} value={data.require_auth}>
                            <Checkbox checked={data.require_auth} label={'Sim'}
                                      handleCheck={() => handleChange({event: true, key: 'require_auth'})}/>
                            <Checkbox checked={!data.require_auth} label={'Não'}
                                      handleCheck={() => handleChange({event: false, key: 'require_auth'})}/>
                        </CheckboxGroup>

                        <TextField
                            placeholder={'/máscara/url'} value={data.url}
                            label={'URL'} disabled={false}
                            handleChange={e => handleChange({event: e.target.value, key: 'url'})}
                            required={true} width={'calc(33.333% - 21.5px)'}
                        />
                        <DropDownField
                            placeholder={'Método HTTP'} value={data.method}
                            label={'Método HTTP'} disabled={false}
                            choices={[
                                {key: 'POST', value: 'POST', color: '#fec02b'},
                                {key: 'GET', value: 'GET', color: '#20c060'},
                                {key: 'PUT', value: 'PUT', color: '#57a2ed'},
                                {key: 'DELETE', value: 'DELETE', color: '#ed4136'},
                                {key: 'PATCH', value: 'PATCH', color: '#5f5f5f'}
                            ]}
                            handleChange={e => handleChange({event: e, key: 'method'})}
                            required={true} width={'calc(33.333% - 21.5px)'}
                        />
                        <Selector
                            hook={hook}
                            keys={[
                                {
                                    key: 'name',
                                    label: 'Nome',
                                    type: 'string',
                                },
                                {
                                    key: 'host',
                                    label: 'Host',
                                    type: 'string',
                                }
                            ]}
                            title={'Serviço'} placeholder={'Serviço'}
                            value={data.service} width={'calc(33.333% - 21.5px)'} required={true}
                            handleChange={e => handleChange({event: e, key: 'service'})} />
                    </FormRow>
                </>
            )}
        </Form>
    )
}

EndpointForm.propTypes = {
    initialData: PropTypes.object,
    handleClose: PropTypes.func
}