import PropTypes from 'prop-types'
import {FormRow} from "mfc-core";
import Form from "../../../../core/inputs/form/Form";
import TextField from "../../../../core/inputs/text/TextField";
import useData from "../../../../core/inputs/form/useData";
import submit from "../../utils/requests/submit";

export default function EntityForm(props) {
    const formHook = useData(props.initialData)
    return (
        <Form
            hook={formHook}
            title={!props.initialData?.id ? 'Nova entidade' : 'Entidade'}
            handleClose={() => props.handleClose()}
           returnButton={true}
            handleSubmit={(data, clearState) => {
                submit({
                    suffix: 'entity',
                    pk: data.id,
                    create: data.id === undefined,
                    data: {
                        ...data,
                        host: data.host + '/' + data.port
                    },
                    prefix: 'gateway'
                }).then((res) => {
                    if(res) {
                        props.handleClose()
                        clearState()
                    }
                })
            }}
            create={!props.initialData?.id}
        >
            {(data, handleChange) => (
                <FormRow>
                    <TextField
                        placeholder={'Chave de identificação'} value={data.identification_key}
                        label={'Chave de identificação'} disabled={false}
                        handleChange={e => handleChange({event: e.target.value, key: 'identification_key'})}
                        required={true} width={'calc(50% - 16px)'}
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
                        required={false} width={'100%'}
                    />


                </FormRow>
            )}
        </Form>
    )
}

EntityForm.propTypes = {
    initialData: PropTypes.object,
    handleClose: PropTypes.func,
    asModal: PropTypes.bool
}