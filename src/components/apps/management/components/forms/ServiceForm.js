import PropTypes from 'prop-types'
import {FormRow} from "sis-aeb-core";
import {service} from "../../utils/submits";
import Form from "../../../../core/inputs/form/Form";
import TextField from "../../../../core/inputs/text/TextField";

export default function ServiceForm(props) {
    return (
        <Form
            title={!props.initialData.id ? 'Novo serviço' : 'Serviço'} initialData={props.initialData}
            handleClose={() => props.handleClose()}
            dependencies={[
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
                        host: data.host + '/' + data.port
                    }
                }).then((res) => {
                    if(res)
                        clearState()
                })
            }}
            create={!props.initialData.id}

        >
            {(data, handleChange) => (
                <FormRow>
                    <TextField
                        placeholder={'Host'} value={data.host}
                        label={'Host'} disabled={false} mask={'999.999.9.999'}
                        handleChange={e => handleChange({event: e.target.value, key: 'host'})}
                        required={true} width={'calc(75% - 8px)'}
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