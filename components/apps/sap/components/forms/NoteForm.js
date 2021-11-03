import React, {useMemo, useState} from "react";
import {TextField} from "mfc-core";
import PropTypes from "prop-types";
import ExecutionPT from "../../locales/ExecutionPT";
import Form from "../../../../core/inputs/form/Form";
import useDataWithDraft from "../../../../core/inputs/form/useDataWithDraft";
import Cookies from "universal-cookie/lib";
import submit from "../../utils/requests/submit";
import Host from "../../utils/shared/Host";
import FormRow from "../../../../core/inputs/form/FormRow";


export default function NoteForm(props) {
    const lang = ExecutionPT
    const initialData = useMemo(() => {
        return {
            ...props.data,
            ...{
                operation_phase: props.operation
            }
        }
    }, [])
        const [draftID, setDraftID] = useState(props.draftID)
    const formHook = useDataWithDraft({
        initialData: initialData,
    draftUrl: Host().replace('api', 'draft') + 'commitment_note',
        draftHeaders: {'authorization': (new Cookies()).get('jwt')},
        interval: 5000,
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
            create={props.create} title={props.create ? lang.newNote : lang.note}
            returnButton={true}
            handleSubmit={(data, clearState) =>
                submit({
                    suffix: 'commitment_note',
                    pk: data.id,
                    data: data,
                    create: props.create
                }).then(res => {
                    if (props.create && res.success) {
                        props.handleClose()
                        clearState()
                    }
                })

            }
            handleClose={() => props.handleClose()}>
            {(data, handleChange) => (
                <FormRow>

                    <TextField

                        placeholder={lang.number} label={lang.number}
                        handleChange={event => {

                            handleChange({key: 'number', event: event.target.value})

                        }}
                        value={data.number}
                        required={true}
                        width={'calc(50% - 16px)'}/>


                    <TextField
                        placeholder={lang.value} label={lang.value} maskStart={'R$'} currencyMask={true}
                        handleChange={event => {

                            handleChange({key: 'value', event: event.target.value})
                        }} value={data.value}
                        required={true} type={'number'}
                        width={'calc(50% - 16px)'}/>

                </FormRow>
            )}
        </Form>
    )

}

NoteForm.propTypes = {
    id: PropTypes.number,
    data: PropTypes.object,
    handleChange: PropTypes.func,
    handleClose: PropTypes.func,
    create: PropTypes.bool,
    operation: PropTypes.object,
}
