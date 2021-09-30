import PropTypes from 'prop-types'
import {Form, FormRow, TextField} from "sis-aeb-core";

export default function ServiceForm(props) {
    return (
        <Form
            title={!props.initialData.id ? 'Novo serviço' : 'Serviço'} initialData={props.initialData}
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
                <FormRow>
                    <TextField
                        placeholder={'Denominação'} value={data.denomination}
                        label={'Denominação'} disabled={false}
                        handleChange={e => handleChange({event: e.target.value, key: 'denomination'})}
                        required={true} width={'calc(50% - 16px)'}
                    />
                    <TextField
                        placeholder={'Host'} value={data.host}
                        label={'Host'} disabled={false}
                        handleChange={e => handleChange({event: e.target.value, key: 'host'})}
                        required={true} width={'calc(50% - 16px)'}
                    />
                    <TextField
                        placeholder={'Descrição'} value={data.description}
                        label={'Descrição'} disabled={false}
                        handleChange={e => handleChange({event: e.target.value, key: 'description'})}
                        required={false} width={'100%'} variant={'area'}
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