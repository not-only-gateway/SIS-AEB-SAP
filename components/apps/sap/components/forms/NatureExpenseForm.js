import React, {useState} from "react";
import {DropDownField, FormRow, TextField} from "mfc-core";
import PropTypes from "prop-types";
import ProjectPT from "../../locales/ProjectPT";
import Form from "../../../../core/inputs/form/Form";
import useDataWithDraft from "../../../../core/inputs/form/useDataWithDraft";
import Cookies from "universal-cookie/lib";
import submit from "../../utils/requests/submit";
import Host from "../../utils/shared/Host";


export default function NatureExpenseForm(props) {
    const lang = ProjectPT
        const [draftID, setDraftID] = useState(props.draftID)
    const formHook = useDataWithDraft({
        initialData: props.data,
    draftUrl: Host().replace('api', 'draft') + 'action',
        draftHeaders: {'authorization': (new Cookies()).get('jwt')},
        interval: 120000,
        parsePackage: pack => {
            return {
                ...pack,
                identifier: draftID
            }
        },
        draftMethod: draftID ? 'put' : 'post',
        onSuccess: (res) => {
            setDraftID(res.data.id)
        }
    })
    


    return (
        <Form
            hook={formHook}
            initialData={props.data}
            create={props.create} title={props.create ? lang.newNatureOfExpense : lang.natureOfExpense}
            dependencies={
                [
                    {key: 'description', type: 'string'},
                    {key: 'nature_of_expense', type: 'string'},
                    {key: 'gnd', type: 'number'},
                ]
            }
            returnButton={true}
            handleSubmit={(data, clearState) =>
                submit({
                    suffix: 'nature_of_expense',
                    pk: data.id,
                    data: data,
                    create: props.create
                }).then(res => {
                    if (props.create && res.success) {
                        props.handleClose()
                        clearState()
                    }
                })}
            handleClose={() => props.handleClose()}
            noAutoHeight={!props.asDefault}>
            {(data, handleChange) => (
                <FormRow>


                    <TextField
                        placeholder={lang.description} label={lang.description}
                        handleChange={event => {
                            handleChange({
                                event: event.target.value,
                                key: 'description'
                            })
                        }} value={data.description}
                        required={true} width={'100%'} variant={'area'}/>

                    <DropDownField
                        placeholder={'gnd'}
                        label={'gnd'}
                        handleChange={event => {
                            handleChange({
                                event: event,
                                key: 'gnd'
                            })
                        }} value={data.gnd} required={false}
                        width={'calc(50% - 16px)'} choices={[{key: 3, value: 3}, {key: 4, value: 4}]}/>
                    <TextField
                        placeholder={lang.natureOfExpense} label={lang.natureOfExpense}
                        handleChange={event => {
                            handleChange({
                                event: event.target.value,
                                key: 'nature_of_expense'
                            })
                        }} value={data.nature_of_expense}
                        required={true} width={'calc(50% - 16px)'}
                    />
                </FormRow>
            )}
        </Form>
    )

}

NatureExpenseForm.propTypes = {
    handleClose: PropTypes.func,
    create: PropTypes.bool,
    asDefault: PropTypes.bool,
    draftID: PropTypes.number,
}
