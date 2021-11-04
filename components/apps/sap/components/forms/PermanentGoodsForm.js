import React, {useEffect, useState} from "react";

import {DateField, DropDownField, TextField} from "mfc-core";
import PropTypes from "prop-types";
import Form from "../../../../core/inputs/form/Form";
import PermanentGoodsPT from "../../locales/PermanentGoodsPT";
import useDataWithDraft from "../../../../core/inputs/form/useDataWithDraft";
import Cookies from "universal-cookie/lib";
import submit from "../../utils/requests/submit";
import Host from "../../utils/shared/Host";
import FormRow from "../../../../core/inputs/form/FormRow";
import tedKeys from "../../keys/tedKeys";


export default function PermanentGoodsForm(props) {
    const lang = PermanentGoodsPT
    const [initialData, setInitialData] = useState(props.data)

        const [draftID, setDraftID] = useState(props.draftID)
    const formHook = useDataWithDraft({
        initialData: initialData,
    draftUrl: Host().replace('api', 'draft') + 'permanent_goods',
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
    

    useEffect(() => {
        if (props.create)
            setInitialData({
                ...props.data,
                ...{
                    operation_phase: props.operation.id
                }
            })

    }, [])

    return (
        <FormOptions
            keys={tedKeys.ted}
            endpoint={'ted'}
            initialData={props.data}
        >
            {({setOpen, formHook, asDraft, asHistory}) => (
        <Form
            hook={formHook}

            create={props.create}
            title={props.create ? lang.newPermanent : lang.permanent}
            returnButton={true}
            handleSubmit={(data, clearState) =>
                submit({
                    suffix: 'permanent_goods',
                    pk: data.id,
                    data: {
                        ...data,
                        total_value: data.unit_price * data.quantity
                    },
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
                        placeholder={lang.description} label={lang.description}
                        handleChange={event => {

                            handleChange({key: 'description', event: event.target.value})
                        }} value={data.description}
                        required={true} width={'100%'} variant={'area'}/>

                    <DropDownField
                        placeholder={lang.unitOfMeasurement}
                        label={lang.unitOfMeasurement}
                        handleChange={event => {

                            handleChange({key: 'unit_of_measurement', event: event})
                        }} value={data.unit_of_measurement} required={false}
                        width={'calc(33.333% - 21.5px)'} choices={lang.measurementOptions}/>
                    <TextField
                        placeholder={lang.unitValue} label={lang.unitValue}
                        handleChange={event => {

                            handleChange({key: 'unit_price', event: event.target.value})
                        }} value={data.unit_price}
                        required={true} type={'number'} maskStart={'R$'} currencyMask={true}
                        width={'calc(33.333% - 21.5px)'}/>
                    <TextField
                        placeholder={lang.quantity} label={lang.quantity}
                        handleChange={event => {

                            handleChange({key: 'quantity', event: event.target.value})
                        }} value={data.quantity}
                        required={true} type={'number'}
                        width={'calc(33.333% - 21.5px)'}/>
                    <DateField
                        placeholder={lang.acquisitionDate} label={lang.acquisitionDate}
                        handleChange={event => {

                            handleChange({key: 'acquisition_date', event: event})
                        }}
                        value={
                            data.acquisition_date
                        }
                        required={true} width={'calc(50% - 16px)'}/>
                    <TextField
                        placeholder={lang.invoice} label={lang.invoice}
                        handleChange={event => {

                            handleChange({key: 'invoice', event: event.target.value})
                        }} value={data.invoice}
                        required={true}
                        width={'calc(50% - 16px)'}/>
                </FormRow>
            )}
        </Form>
            )}
        </FormOptions>
    )

}

PermanentGoodsForm.propTypes = {
    id: PropTypes.number,
    data: PropTypes.object,
    handleChange: PropTypes.func,
    handleClose: PropTypes.func,
    create: PropTypes.bool,
    operation: PropTypes.object,
}
