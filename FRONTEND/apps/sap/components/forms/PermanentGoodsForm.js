import React, {useMemo} from "react";


import PropTypes from "prop-types";


import PermanentGoodsPT from "../../locales/PermanentGoodsPT";
import submit from "../../utils/submit";

import {DateField, Form, FormRow, SelectField, TextField} from 'mfc-core'
import workPlanKeys from "../../keys/workPlanKeys";
import FormTemplate from "../../../../templates/FormTemplate";
import FORM_OPTIONS from "../../../../static/FORM_OPTIONS";


export default function PermanentGoodsForm(props) {
    const lang = PermanentGoodsPT
    const initialData = useMemo(() => {
        return props.create ? {...props.data, ...{work_plan: props.workPlan?.id}} : props.data
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
                    options={FORM_OPTIONS({
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

                            <SelectField
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
                                required={true} type={'number'} maskStart={'R$'}
                                floatFilter={true}
                                width={'calc(33.333% - 21.5px)'}/>
                            <TextField
                                placeholder={lang.quantity} label={lang.quantity}
                                handleChange={event => {

                                    handleChange({key: 'quantity', event: event.target.value})
                                }} value={data.quantity}
                                required={true} type={'number'}
                                width={'calc(33.333% - 21.5px)'}/>
                            <DateField hoursOffset={4}
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
