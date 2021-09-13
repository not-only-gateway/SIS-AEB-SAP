import React, {useEffect, useState} from "react";

import {DateField, DropDownField, TextField} from "sis-aeb-core";
import PropTypes from "prop-types";
import OperationRequests from "../../../../utils/requests/OperationRequests";
import Form from "../../../shared/core/form/Form";
import PermanentGoodsPT from "../../../../packages/locales/PermanentGoodsPT";

export default function PermanentGoodsForm(props) {
    const [changed, setChanged] = useState(false)
    const lang = PermanentGoodsPT

    useEffect(() => {
        if (props.create)
            props.handleChange({name: 'operation_phase', value: props.operation.id})
    }, [])
    return (
        <>

            <Form
                entity={props.data}
                create={props.create} label={props.create ? lang.newPermanent : lang.permanent}
                dependencies={{
                    fields: [
                        {name: 'description', type: 'string'},
                        {name: 'unit_of_measurement', type: 'string'},
                        {name: 'unit_price', type: 'number'},
                        {name: 'quantity', type: 'number'},

                        {name: 'acquisition_date', type: 'date'},
                        {name: 'invoice', type: 'string'},
                    ],
                    changed: changed
                }}
                returnButton={true}
                handleSubmit={() =>
                    OperationRequests.submitPermanentGoods({
                        pk: props.data.id,
                        data: props.data,
                        create: props.create
                    }).then(res => {
                        if(props.create && res)
                            props.returnToMain()
                        setChanged(!res)
                    })}
                handleClose={() => props.returnToMain()}
                forms={[{
                    child: (
                        <>
                            <TextField
                                placeholder={lang.description} label={lang.description}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'description', value: event.target.value})
                                }} value={props.data === null ? null : props.data.description}
                                required={true} width={'100%'} variant={'area'}/>

                            <DropDownField
                                placeholder={lang.unitOfMeasurement }
                                label={lang.unitOfMeasurement }
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'unit_of_measurement', value: event})
                                }} value={props.data === null ? null : props.data.unit_of_measurement } required={false}
                                width={'calc(33.333% - 21.5px)'} choices={lang.measurementOptions}/>
                            <TextField
                                placeholder={lang.unitValue} label={lang.unitValue}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'unit_price', value: event.target.value})
                                }} value={props.data === null ? null : props.data.unit_price}
                                required={true} type={'number'} maskStart={'R$'} currencyMask={true}
                                width={'calc(33.333% - 21.5px)'}/>
                            <TextField
                                placeholder={lang.quantity} label={lang.quantity}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'quantity', value: event.target.value})
                                }} value={props.data === null ? null : props.data.quantity}
                                required={true} type={'number'}
                                width={'calc(33.333% - 21.5px)'}/>
                            <DateField
                                placeholder={lang.acquisitionDate} label={lang.acquisitionDate}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'acquisition_date', value: event})
                                }}
                                value={
                                    props.data === null ? null : props.data.acquisition_date
                                }
                                required={true} width={'calc(50% - 16px)'}/>
                            <TextField
                                placeholder={lang.invoice} label={lang.invoice}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'invoice', value: event.target.value})
                                }} value={props.data === null ? null : props.data.invoice}
                                required={true}
                                width={'calc(50% - 16px)'}/>
                        </>
                    )
                }]}/>
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
