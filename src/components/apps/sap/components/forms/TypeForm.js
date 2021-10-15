import React from "react";
import {FormRow, TextField} from "sis-aeb-core";
import PropTypes from "prop-types";
import EntitiesPT from "../../locales/EntitiesPT";
import Form from "../../../../core/inputs/form/Form";
import useDataWithDraft from "../../../../core/inputs/form/useDataWithDraft";
import Cookies from "universal-cookie/lib";
import submit from "../../utils/requests/submit";

export default function TypeForm(props) {
    const lang = EntitiesPT
    const formHook = useDataWithDraft({
        initialData: props.data,
        draftUrl: '',
        draftHeaders: {'authorization': (new Cookies()).get('jwt')},
        interval: 120000
    })

    return (
        <Form
            hook={formHook}
            initialData={props.data}
            create={props.create}
            noAutoHeight={props.create}
            title={props.create ? lang.newType : lang.type}
            dependencies={
                [
                    {key: 'type', type: 'string'},
                ]
            }
            returnButton={true}
            handleSubmit={(data, clearState) =>
                submit({
                    suffix: 'type',
                    pk: data.id,
                    data: data,

                    create: props.create
                }).then(res => {
                    if (props.create && res.success) {
                        props.returnToMain()
                        clearState()
                    }
                })}
            handleClose={() => props.returnToMain()}>
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
    returnToMain: PropTypes.func,
    create: PropTypes.bool,
    action: PropTypes.object
}
