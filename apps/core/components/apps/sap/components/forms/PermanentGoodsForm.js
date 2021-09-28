import React, {useEffect} from "react";

import {DateField, DropDownField, Form, FormRow, TextField} from "sis-aeb-core";
import PropTypes from "prop-types";
import OperationRequests from "../../utils/requests/OperationRequests";

import PermanentGoodsPT from "../../locales/PermanentGoodsPT";

export default function PermanentGoodsForm(props) {

    const lang = PermanentGoodsPT

    useEffect(() => {
        if (props.create)
            props.handleChange({name: 'operation_phase', value: props.operation.id})
    }, [])

    return (
        <>
            <Form
                initialData={props.data}
                create={props.create} title={props.create ? lang.newPermanent : lang.permanent}
                dependencies={
                    [
                        {name: 'description', type: 'string'},
                        {name: 'unit_of_measurement', type: 'string'},
                        {name: 'unit_price', type: 'number'},
                        {name: 'quantity', type: 'number'},

                        {name: 'acquisition_date', type: 'date'},
                        {name: 'invoice', type: 'string'},
                    ]
                }
                returnButton={true}
                handleSubmit={() =>
                    OperationRequests.submitPermanentGoods({
                        pk: props.data.id,
                        data: props.data,
                        create: props.create
                    }).then(res => {
                        if (props.create && res)
                            props.returnToMain()
                    })}
                handleClose={() => props.returnToMain()}>
                {(data, handleChange) => (
                    <FormRow>

                        <TextField
                            placeholder={lang.description} label={lang.description}
                            handleChange={event => {

                                props.handleChange({name: 'description', value: event.target.value})
                            }} value={props.data === null ? null : props.data.description}
                            required={true} width={'100%'} variant={'area'}/>

                        <DropDownField
                            placeholder={lang.unitOfMeasurement}
                            label={lang.unitOfMeasurement}
                            handleChange={event => {

                                props.handleChange({name: 'unit_of_measurement', value: event})
                            }} value={props.data === null ? null : props.data.unit_of_measurement} required={false}
                            width={'calc(33.333% - 21.5px)'} choices={lang.measurementOptions}/>
                        <TextField
                            placeholder={lang.unitValue} label={lang.unitValue}
                            handleChange={event => {

                                props.handleChange({name: 'unit_price', value: event.target.value})
                            }} value={props.data === null ? null : props.data.unit_price}
                            required={true} type={'number'} maskStart={'R$'} currencyMask={true}
                            width={'calc(33.333% - 21.5px)'}/>
                        <TextField
                            placeholder={lang.quantity} label={lang.quantity}
                            handleChange={event => {

                                props.handleChange({name: 'quantity', value: event.target.value})
                            }} value={props.data === null ? null : props.data.quantity}
                            required={true} type={'number'}
                            width={'calc(33.333% - 21.5px)'}/>
                        <DateField
                            placeholder={lang.acquisitionDate} label={lang.acquisitionDate}
                            handleChange={event => {

                                props.handleChange({name: 'acquisition_date', value: event})
                            }}
                            value={
                                props.data === null ? null : props.data.acquisition_date
                            }
                            required={true} width={'calc(50% - 16px)'}/>
                        <TextField
                            placeholder={lang.invoice} label={lang.invoice}
                            handleChange={event => {

                                props.handleChange({name: 'invoice', value: event.target.value})
                            }} value={props.data === null ? null : props.data.invoice}
                            required={true}
                            width={'calc(50% - 16px)'}/>
                    </FormRow>
                )}
            </Form>
        </>
    )

}

PermanentGoodsForm.propTypes = {
    id: PropTypes.number,
    data: PropTypes.object,
    handleChange: PropTypes.func,
    returnToMain: PropTypes.func,
    create: PropTypes.bool,
    operation: PropTypes.object
}
