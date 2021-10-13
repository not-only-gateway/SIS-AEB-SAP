import PropTypes from 'prop-types'

import Form from "../../../../core/inputs/form/Form";
import FormRow from "../../../../core/inputs/form/FormRow";
import TextField from "../../../../core/inputs/text/TextField";
import {accessProfile} from "../../utils/submits";

export default function AccessProfileForm(props) {

    return (
        <Form
            title={!props.initialData?.id ? 'Novo perfil de acesso' : 'Perfil de acesso'}
            initialData={props.initialData}
            handleClose={() => props.handleClose()}
            dependencies={[
                {name: 'denomination', type: 'string'}
            ]} returnButton={true}
            handleSubmit={(data, clearState) => {
                accessProfile({
                    pk: data.id,
                    create: data.id === undefined,
                    data: data
                }).then((res) => {
                    if (res !== null && props.initialData?.id === undefined) {
                        props.redirect(res)
                        clearState()
                    } else if (res !== null) {
                        props.updateData(data)
                    }
                })
            }}
            noHeader={props.initialData && props.initialData.id}
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