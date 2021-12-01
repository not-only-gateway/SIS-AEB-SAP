import PropTypes from 'prop-types'


import useData from "../../../../core/inputs/form/useData";
import {Form, FormRow, SelectField, TextField} from "mfc-core";
import {useMemo} from "react";
import submit from "../../utils/submit";

export default function ServiceForm(props) {
    const initialData = useMemo(() => {
        if (props.initialData !== undefined && props.initialData.host !== undefined) {
            let value = {...props.initialData}
            value.protocol = value.host.split(':')[0] + '://'
            value.port = value.host.split(':')[2]
            value.host = value.host.split(':')[1].replaceAll('/', '')
            return value
        } else
            return props.initialData
    }, [])
    const formHook = useData(initialData)
    return (
        <Form
            hook={formHook}
            title={props.create ? 'Novo serviço' : 'Serviço'}
            handleClose={() => props.handleClose()}
            returnButton={props.create}
            handleSubmit={(data, clearState) => {
                submit({
                    suffix: 'service',
                    pk: data.id,
                    create: data.id === undefined,
                    data: {
                        ...data,
                        host: data.protocol + data.host.replace('_', '') + ':' + data.port
                    },
                    prefix: 'gateway'
                }).then((res) => {
                    if (res.success && props.initialData?.id === undefined) {
                        props.redirect(res.data.id)
                        clearState()
                    } else if (res.success)
                        props.updateData(data)

                })
            }}
            create={props.initialData.id === undefined}

        >
            {(data, handleChange) => (
                <FormRow>
                    <TextField
                        placeholder={'Máscara'} value={data.mask}
                        label={'Máscara'} disabled={false}
                        handleChange={e => handleChange({event: e.target.value, key: 'mask'})}
                        required={true} width={'calc(33.333% - 21.5px)'}
                    />
                    <TextField
                        placeholder={'Host'} value={data.host}
                        label={'Host'} disabled={false}
                        handleChange={e => handleChange({event: e.target.value, key: 'host'})}
                        required={true} width={'calc(33.333% - 21.5px)'}
                    />
                    <TextField
                        placeholder={'Porta'} value={data.port}
                        label={'Porta'} disabled={false} type={'number'} maxLength={2}
                        handleChange={e => handleChange({event: e.target.value, key: 'port'})}
                        required={true} width={'calc(33.333% - 21.5px)'}
                    />

                    <SelectField
                        placeholder={'Protocolo'} value={data.protocol}
                        label={'Protocolo'} disabled={false}
                        choices={[{key: 'https://', value: 'HTTPS'}, {key: 'http://', value: 'HTTP'}]}
                        handleChange={e => handleChange({event: e, key: 'protocol'})}
                        required={true} width={'calc(33.333% - 21.5px)'}
                    />
                    <TextField
                        placeholder={'Denominação'} value={data.denomination}
                        label={'Denominação'} disabled={false}
                        handleChange={e => handleChange({event: e.target.value, key: 'denomination'})}
                        required={true} width={'calc(33.333% - 21.5px)'}
                    />
                    <TextField
                        placeholder={'Descrição'} value={data.description}
                        label={'Descrição'} disabled={false}
                        handleChange={e => handleChange({event: e.target.value, key: 'description'})}
                        required={false} width={'calc(33.333% - 21.5px)'}
                    />
                </FormRow>
            )}
        </Form>
    )
}

ServiceForm.propTypes = {
    initialData: PropTypes.object,
    handleClose: PropTypes.func
}