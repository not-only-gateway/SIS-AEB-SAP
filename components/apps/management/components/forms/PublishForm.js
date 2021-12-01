import PropTypes from 'prop-types'


import {Form, FormRow, TextField} from "mfc-core";
import useData from "../../../../core/inputs/form/useData";
import submit from "../../utils/submit";

export default function PublishForm(props) {
    const formHook = useData(props.initialData)
    return (
        <Form
            hook={formHook}
            title={'Nova Publicação'}
            handleClose={() => props.handleClose()}
            returnButton={true}
            handleSubmit={(data, clearState) => {
                submit({
                    suffix: 'publish',
                    create: true,
                    data: data,
                    prefix: 'gateway'
                }).then((res) => {
                    if (res) {
                        props.handleClose()
                        clearState()
                    }
                })
            }}
            create={true}
        >
            {(data, handleChange) => (
                <FormRow>
                    <TextField
                        placeholder={'Rota roteamento'} value={data.routing}
                        label={'Rota roteamento'} disabled={false}
                        handleChange={e => handleChange({event: e.target.value, key: 'routing'})}
                        required={true} width={'calc(50% - 16px)'}
                    />
                    <TextField
                        placeholder={'Método'} value={data.method}
                        label={'Método'} disabled={false}
                        handleChange={e => handleChange({event: e.target.value, key: 'method'})}
                        required={true} width={'calc(50% - 16px)'}
                    />
                </FormRow>
            )}
        </Form>
    )
}

PublishForm.propTypes = {
    initialData: PropTypes.object,
    handleClose: PropTypes.func
}