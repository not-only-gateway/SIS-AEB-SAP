import PropTypes from 'prop-types'


import {Form, FormRow, TextField} from "mfc-core";
import useData from "../../../../hooks/useData";
import submit from "../../utils/submit";

export default function PermissionForm(props) {
    const formHook = useData(props.initialData)
    return (
        <Form
            hook={formHook}
            title={!props.initialData.id ? 'Novo privilégio' : 'Privilégio'}
            handleClose={() => props.handleClose()}
            returnButton={true}
            handleSubmit={(data, clearState) => {
                submit({
                    suffix: 'privilege',
                    pk: data.id,
                    create: data.id === undefined,
                    data: {
                        ...data,
                        host: data.host + '/' + data.port
                    },
                    prefix: 'auth'
                }).then((res) => {
                    if(res) {
                        props.handleClose()
                        clearState()
                    }
                })
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
                        placeholder={'Descrição'} value={data.description}
                        label={'Descrição'} disabled={false}
                        handleChange={e => handleChange({event: e.target.value, key: 'description'})}
                        required={false} width={'calc(50% - 16px)'} variant={'area'}
                    />
                </FormRow>

            )}
        </Form>
    )
}

PermissionForm.propTypes = {
    initialData: PropTypes.object,
    handleClose: PropTypes.func
}