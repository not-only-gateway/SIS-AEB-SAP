import React from "react";
import { TextField} from "mfc-core";
import PropTypes from "prop-types";
import EntitiesPT from "../../locales/EntitiesPT";
import Form from "../../../../core/inputs/form/Form";
import submit from "../../utils/requests/submit";
import useData from "../../../../core/inputs/form/useData";
import FormRow from "../../../../core/inputs/form/FormRow";


export default function TypeForm(props) {
    const lang = EntitiesPT
    const formHook = useData(props.data)
    

    return (
        <Form
            hook={formHook}
            create={props.create}
            title={props.create ? lang.newType : lang.type}
            returnButton={true}
            handleSubmit={(data, clearState) =>
                submit({
                    suffix: 'type',
                    pk: data.id,
                    data: data,

                    create: props.create
                }).then(res => {
                    if (props.create && res.success) {
                        props.handleClose()
                        clearState()
                    }
                })}
            handleClose={() => props.handleClose()}>
            {(data, handleChange) => (
                <FormRow>
                    <TextField
                        placeholder={lang.type} label={lang.type}
                        handleChange={event => {

                            handleChange({
                                event: event.target.value,
                                key: 'type'
                            })

                        }} value={data.type}
                        required={true}
                        width={'100%'}/>

                </FormRow>

            )}
        </Form>
    )

}

TypeForm.propTypes = {
    data: PropTypes.object,
    handleClose: PropTypes.func,
    create: PropTypes.bool,
    action: PropTypes.object,
}
