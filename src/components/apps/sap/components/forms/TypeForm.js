import React, {useEffect, useState} from "react";
import {Form, FormRow, TextField} from "sis-aeb-core";
import PropTypes from "prop-types";
import ProjectRequests from "../../utils/requests/ProjectRequests";
import EntitiesPT from "../../locales/EntitiesPT";

export default function TypeForm(props) {
    const lang = EntitiesPT

    return (
        <>
            <Form
                initialData={props.data}
                create={props.create}
                noAutoHeight={props.create}
                title={props.create ? lang.newType : lang.type}
                dependencies={
                    [
                        {name: 'type', type: 'string'},
                    ]
                }
                returnButton={true}
                handleSubmit={(data) =>
                    ProjectRequests.submitType({
                        pk: data.id,
                        data: data,

                        create: props.create
                    }).then(res => {
                        if (props.create && res)
                            props.returnToMain()
                    })}
                handleClose={() => props.returnToMain()}>
                {(data, handleChange) => (
                    <FormRow>
                        <TextField
                            placeholder={lang.type} label={lang.type}
                            handleChange={event => {

                                handleChange({
                                    event:event.target.value,
                                    key: 'type'
                                })

                            }} value={ data.type}
                            required={true}
                            width={'100%'}/>

                    </FormRow>

                )}
            </Form>
        </>
    )

}

TypeForm.propTypes = {
    returnToMain: PropTypes.func,
    create: PropTypes.bool,
    action: PropTypes.object
}