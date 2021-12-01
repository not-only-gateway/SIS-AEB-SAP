import PropTypes from 'prop-types'


import {Form, FormRow, TextField} from "mfc-core";
import useData from "../../../../core/inputs/form/useData";
import submit from "../../utils/submit";

export default function AccessProfileForm(props) {
    const formHook = useData(props.initialData)
    return (
        <Form
            hook={formHook}
            title={!props.initialData?.id ? 'Novo perfil de acesso' : 'Perfil de acesso'}
            handleClose={() => props.handleClose()}
            returnButton={true}
            handleSubmit={(data, clearState) => {
                submit({
                    suffix: 'access_profile',
                    pk: data.id,
                    create: data.id === undefined,
                    data: data,
                    prefix: 'auth'
                }).then((res) => {
                    if (res.success && props.initialData?.id === undefined) {
                        props.redirect(res)
                        clearState()
                    } else if (res.success) {
                        props.updateData(data)
                    }
                })
            }}
            create={!props.initialData?.id}

        >
            {(data, handleChange) => (
                <FormRow>
                    <TextField
                        placeholder={'Denominação'} value={data.denomination}
                        label={'Denominação'} disabled={false}
                        handleChange={e => handleChange({event: e.target.value, key: 'denomination'})}
                        required={true} width={'100%'}
                    />
                </FormRow>

            )}
        </Form>
    )
}

AccessProfileForm.propTypes = {
    initialData: PropTypes.object,
    handleClose: PropTypes.func,
    redirect: PropTypes.func,
    updateData: PropTypes.func
}