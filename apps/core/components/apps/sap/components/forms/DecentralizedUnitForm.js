import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import ProjectRequests from "../../utils/requests/ProjectRequests";
import handleObjectChange from "../../utils/shared/HandleObjectChange";
import EntitiesPT from "../../locales/EntitiesPT";
import {
    useQuery,
    Tabs,
    List,
    Modal,
    Selector,
    Form, FormRow,
    DateField,
    DropDownField,
    FileField,
    MultiSelectField,
    Navigation,
    Requester,
    TextField,
    ToolTip
} from "sis-aeb-core";


export default function DecentralizedUnitForm(props) {

    const lang = EntitiesPT
    const [data, setData] = useState(null)

    useEffect(() => {
        if (props.data !== undefined)
            setData(props.data)
    }, [])

    const content = (
        <>

            <Form
                initialData={data}
                create={props.create} title={props.create ? lang.newDecentralizedUnit : lang.decentralizedUnit}
                dependencies={
                    [
                        {name: 'name', type: 'string'},
                        {name: 'competent_authority', type: 'string'},
                        {name: 'cpf', type: 'string'},
                        {name: 'identification', type: 'string'},
                        {name: 'uge', type: 'string'},
                        {name: 'ug', type: 'string'},
                        {name: 'cnpj', type: 'string'},
                        {name: 'responsible', type: 'string'},
                    ]}
                returnButton={true} noAutoHeight={!props.asDefault}
                handleSubmit={() =>
                    ProjectRequests.submitDecentralizedUnit({
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
                            placeholder={lang.name} label={lang.name}
                            handleChange={event => {

                                handleObjectChange({
                                    event: ({name: 'name', value: event.target.value}),
                                    setData: setData
                                })

                            }} value={data === null ? null : data.name}
                            required={true}
                            width={'calc(33.333% - 21.5px'}/>
                        <TextField
                            placeholder={lang.responsible} label={lang.responsible}
                            handleChange={event => {

                                handleObjectChange({
                                    event: ({name: 'responsible', value: event.target.value}),
                                    setData: setData
                                })
                            }} value={data === null ? null : data.responsible}
                            required={true}
                            width={'calc(33.333% - 21.5px'}/>
                        <TextField
                            placeholder={lang.competentAuthority} label={lang.competentAuthority}
                            handleChange={event => {

                                handleObjectChange({
                                    event: ({name: 'competent_authority', value: event.target.value}),
                                    setData: setData
                                })

                            }} value={data === null ? null : data.competent_authority}
                            required={true}
                            width={'calc(33.333% - 21.5px'}/>

                        <TextField
                            placeholder={lang.ugi} label={lang.ugi}
                            handleChange={event => {

                                handleObjectChange({
                                    event: ({name: 'ugi', value: event.target.value}),
                                    setData: setData
                                })

                            }} value={data === null ? null : data.ugi}
                            required={false}
                            width={'100%'}/>

                        <TextField
                            placeholder={lang.uge} label={lang.uge}
                            handleChange={event => {

                                handleObjectChange({
                                    event: ({name: 'uge', value: event.target.value}),
                                    setData: setData
                                })

                            }} value={data === null ? null : data.uge}
                            required={true}
                            width={'100%'}/>

                        <TextField
                            placeholder={lang.ug} label={lang.ug}
                            handleChange={event => {

                                handleObjectChange({
                                    event: ({name: 'ug', value: event.target.value}),
                                    setData: setData
                                })

                            }} value={data === null ? null : data.ug}
                            required={true}
                            width={'100%'}/>

                        <TextField
                            placeholder={lang.cnpj} label={lang.cnpj}
                            handleChange={event => {

                                handleObjectChange({
                                    event: ({name: 'cnpj', value: event.target.value}),
                                    setData: setData
                                })

                            }} value={data === null ? null : data.cnpj}
                            required={true}
                            width={'calc(33.333% - 21.5px'}/>
                        <TextField
                            placeholder={lang.cpf} label={lang.cpf}
                            handleChange={event => {

                                handleObjectChange({
                                    event: ({name: 'cpf', value: event.target.value}),
                                    setData: setData
                                })

                            }} value={data === null ? null : data.cpf}
                            required={true}
                            width={'calc(33.333% - 21.5px'}/>
                        <TextField
                            placeholder={lang.identification} label={lang.identification}
                            handleChange={event => {

                                handleObjectChange({
                                    event: ({name: 'identification', value: event.target.value}),
                                    setData: setData
                                })

                            }} value={data === null ? null : data.identification}
                            required={true}
                            width={'calc(33.333% - 21.5px'}/>

                    </FormRow>
                )}
            </Form>
        </>
    )
    return (
        content
    )

}

DecentralizedUnitForm.propTypes = {
    returnToMain: PropTypes.func,
    create: PropTypes.bool,
    asDefault: PropTypes.bool,
    action: PropTypes.object
}
