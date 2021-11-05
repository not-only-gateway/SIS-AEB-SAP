import React, {useEffect, useMemo} from "react";

import {DateField, DropDownField, TextField} from "mfc-core";
import PropTypes from "prop-types";
import Form from "../../../../core/inputs/form/Form";
import PermanentGoodsPT from "../../locales/PermanentGoodsPT";
import submit from "../../utils/requests/submit";
import FormRow from "../../../../core/inputs/form/FormRow";
import workPlanKeys from "../../keys/workPlanKeys";
import FormTemplate from "../../templates/FormTemplate";
import formOptions from "../../templates/formOptions";


export default function PermanentGoodsForm(props) {
    const lang = PermanentGoodsPT
    const initialData = useMemo(() => {
        return props.create ? {...props.data, ...{operation_phase: props.operation.id}} : props.data
    }, [props])



    return (
        <FormTemplate
            keys={workPlanKeys.permanentGoods}
            endpoint={'permanent_goods'}
            initialData={initialData}
        >
            {({setOpen, formHook, asDraft, asHistory}) => (
                <Form
                    hook={formHook}
                    options={formOptions({
                        asDraft: asDraft,
                        asHistory: asHistory,
                        setOpen: setOpen,
                        create: props.create
                    })}
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
        </FormTemplate>
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
