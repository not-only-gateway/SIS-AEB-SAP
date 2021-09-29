import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import ProjectRequests from "../../utils/requests/ProjectRequests";
import Host from "../../utils/shared/Host";
import Cookies from "universal-cookie/lib";
import EntitiesPT from "../../locales/EntitiesPT";
import {Form, FormRow, Selector, TextField} from "sis-aeb-core";

export default function UnitForm(props) {
    const lang = EntitiesPT
    const [open, setOpen] = useState(false)


    return (
        <>

            <Form
                initialData={props.data}
                create={props.create} title={props.create ? lang.newUnit : lang.unit}
                dependencies={[
                    {name: 'name', type: 'string'},
                    {name: 'acronym', type: 'string'},
                ]}

                returnButton={true} noAutoHeight={!props.asDefault}
                handleSubmit={(data) =>
                    ProjectRequests.submitUnit({
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
                            placeholder={'Nome'} label={'Nome'}
                            handleChange={event => {
                                handleChange({
                                    event:event.target.value,
                                    key: 'name'
                                })
                            }} value={ data.name}
                            required={true}
                            width={'calc(50% - 16px'}/>
                        <TextField
                            placeholder={lang.acronym} label={lang.acronym}
                            handleChange={event => {
                                handleChange({
                                    event:event.target.value,
                                    key: 'acronym'
                                })
                            }} value={ data.acronym}
                            required={true} width={'calc(50% - 16px'}
                        />
                        <Selector
                            getEntityKey={entity => {
                                if (entity !== null && entity !== undefined)
                                    return entity.id
                                else return -1
                            }} searchFieldName={'search_input'}
                            handleChange={entity => {
                                handleObjectChange({
                                    event: ({name: 'parent_unit', value: entity}),
                                    setData: setData
                                })
                            }} label={'Vincular unidade pai'}
                            selected={data === null || !data.parent_unit ? null : data.parent_unit}
                            width={'100%'}
                            fields={[
                                {name: 'name', type: 'string'},
                                {name: 'acronym', type: 'string'},
                            ]}
                            labels={['nome', 'Acrônimo']}
                            fetchUrl={Host() + 'list/unit'}
                            fetchParams={{
                                unit: data !== null && data !== undefined && data.id !== undefined ? data.id : null
                            }}
                            fetchToken={(new Cookies()).get('jwt')}
                            createOption={true}
                            returnToList={!open}
                            setReturnToList={() => setOpen(true)}
                        >
                            <UnitForm create={true} returnToMain={() => setOpen(false)}/>
                        </Selector>
                    </FormRow>
                )}

            </Form>
        </>
    )

}

UnitForm.propTypes = {
    returnToMain: PropTypes.func,
    create: PropTypes.bool,
    asDefault: PropTypes.bool,
    action: PropTypes.object
}
