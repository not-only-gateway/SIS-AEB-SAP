import React from "react";
import {DropDownField, Form, FormRow, TextField} from "sis-aeb-core";
import PropTypes from "prop-types";
import ProjectRequests from "../../utils/requests/ProjectRequests";
import ProjectPT from "../../locales/ProjectPT";

export default function NatureExpenseForm(props) {
    const lang = ProjectPT

    const content = (
        <>

            <Form
                initialData={props.data}
                create={props.create} title={props.create ? lang.newNatureOfExpense : lang.natureOfExpense}
                dependencies={
                  [
                        {name: 'description', type: 'string'},
                        {name: 'nature_of_expense', type: 'string'},
                        {name: 'gnd', type: 'number'},
                    ]
                }
                returnButton={true}
                handleSubmit={(data, clearState) =>
                    ProjectRequests.submitNatureOfExpense({
                        pk: data.id,
                        data: data,
                        create: props.create
                    }).then(res => {
                        if (props.create && res){
                            props.returnToMain()
                            clearState()
                        }
                    })}
                handleClose={() => props.returnToMain()}
                noAutoHeight={!props.asDefault}>
                {(data, handleChange) => (
                    <FormRow>


                            <TextField
                                placeholder={lang.description} label={lang.description}
                                handleChange={event => {
                                    handleChange({
                                        event:event.target.value,
                                        key: 'description'
                                    })
                                }} value={ data.description}
                                required={true} width={'100%'} variant={'area'}/>

                            <DropDownField
                                placeholder={'gnd'}
                                label={'gnd'}
                                handleChange={event => {
                                    handleChange({
                                        event:event,
                                        key: 'gnd'
                                    })
                                }} value={ data.gnd} required={false}
                                width={'calc(50% - 16px)'} choices={[{key: 3, value: 3}, {key: 4, value: 4}]}/>
                            <TextField
                                placeholder={lang.natureOfExpense} label={lang.natureOfExpense}
                                handleChange={event => {
                                    handleChange({
                                        event:event.target.value,
                                        key: 'nature_of_expense'
                                    })
                                }} value={ data.nature_of_expense}
                                required={true} width={'calc(50% - 16px)'}
                            />
                    </FormRow>
                )}
            </Form>
        </>
    )
    return (
        content
    )

}

NatureExpenseForm.propTypes = {
    returnToMain: PropTypes.func,
    create: PropTypes.bool,
    asDefault: PropTypes.bool
}
