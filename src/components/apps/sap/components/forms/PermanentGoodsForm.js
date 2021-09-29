import React, {useEffect, useState} from "react";

import {DateField, DropDownField, Form, FormRow, TextField} from "sis-aeb-core";
import PropTypes from "prop-types";
import OperationRequests from "../../utils/requests/OperationRequests";

import PermanentGoodsPT from "../../locales/PermanentGoodsPT";

export default function PermanentGoodsForm(props) {

    const lang = PermanentGoodsPT
    const [initialData, setInitialData] = useState(props.data)
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
        <>
            <Form
                initialData={initialData}
                create={props.create} title={props.create ? lang.newPermanent : lang.permanent}
                dependencies={
                    [
                        {key: 'description', type: 'string'},
                        {key: 'unit_of_measurement', type: 'string'},
                        {key: 'unit_price', type: 'number'},
                        {key: 'quantity', type: 'number'},

                        {key: 'acquisition_date', type: 'date'},
                        {key: 'invoice', type: 'string'},
                    ]
                }
                returnButton={true}
                handleSubmit={(data) =>
                    OperationRequests.submitPermanentGoods({
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
