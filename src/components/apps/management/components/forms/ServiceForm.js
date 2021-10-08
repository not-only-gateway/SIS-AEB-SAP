import PropTypes from 'prop-types'
import {DropDownField, FormRow} from "sis-aeb-core";
import {service} from "../../utils/submits";
import Form from "../../../../core/inputs/form/Form";
import TextField from "../../../../core/inputs/text/TextField";

export default function ServiceForm(props) {
    return (
        <Form
            title={!props.initialData.id ? 'Novo serviço' : 'Serviço'} initialData={props.initialData}
            handleClose={() => props.handleClose()}
            dependencies={[
                {name: 'protocol', type: 'string'},
                {name: 'host', type: 'string'},
                {name: 'port', type: 'number'},
                {name: 'denomination', type: 'string'}
            ]} returnButton={true}
            handleSubmit={(data, clearState) => {
                service({
                    pk: data.id,
                    create: data.id === undefined,
                    data: {
                        ...data,
                        host: data.protocol + data.host.replace('_', '') + ':' + data.port
                    }
                }).then((res) => {
                    if(res !== null && !data.id) {
                        props.redirect(res)
                        clearState()
                    }
                    else {
                        props.updateData(data)
                    }
                })
            }}
            noHeader={props.initialData.id !== undefined}
            create={props.initialData.id === undefined}

        >
            {(data, handleChange) => (
                <FormRow>
                    <DropDownField
                        placeholder={'Protocolo'} value={data.protocol}
                        label={'Protocolo'} disabled={false} choices={[{key: 'https://', value: 'HTTPS'}, {key: 'http://', value: 'HTTP'}]}
                        handleChange={e => handleChange({event: e, key: 'protocol'})}
                        required={true} width={'calc(25% - 24px)'}
                    />
                    <TextField
                        placeholder={'Host'} value={data.host}
                        label={'Host'} disabled={false} mask={'999.999.9.999'}
                        handleChange={e => handleChange({event: e.target.value, key: 'host'})}
                        required={true} width={'calc(50% - 16px)'}
                    />
                    <TextField
                        placeholder={'Porta'} value={data.port}
                        label={'Porta'} disabled={false} type={'number'} maxLength={2}
                        handleChange={e => handleChange({event: e.target.value, key: 'port'})}
                        required={true} width={'calc(25% - 24px)'}
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
                        required={false} width={'calc(50% - 16px)'}
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