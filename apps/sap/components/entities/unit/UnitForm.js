import React, {useEffect, useState} from "react";

import {TextField} from "sis-aeb-core";
import PropTypes from "prop-types";
import Form from "../../shared/core/form/Form";
import ProjectRequests from "../../../utils/requests/ProjectRequests";
import handleObjectChange from "../../../utils/shared/HandleObjectChange";
import Selector from "../../shared/core/selector/Selector";
import Host from "../../../utils/shared/Host";
import Cookies from "universal-cookie/lib";
import EntitiesPT from "../../../packages/locales/EntitiesPT";
import ClassificationForm from "../classification/ClassificationForm";

export default function UnitForm(props) {
    const [changed, setChanged] = useState(false)
    const lang = EntitiesPT
    const [data, setData] = useState(null)
    const [open, setOpen] = useState(false)
    useEffect(() => {
        if (props.data !== undefined)
            setData(props.data)
    }, [])

    const content = (
        <>

            <Form
                entity={data}
                create={props.create} label={props.create ? lang.newUnit : lang.unit}
                dependencies={{
                    fields: [
                        {name: 'name', type: 'string'},
                        {name: 'acronym', type: 'string'},
                    ],
                    changed: changed
                }}
                returnButton={true} noAutoHeight={!props.asDefault}
                handleSubmit={() =>
                    ProjectRequests.submitUnit({
                        pk: data.id,
                        data: data,
                        create: props.create
                    }).then(res => {
                        if (props.create && res)
                            props.returnToMain()
                        setChanged(!res)
                    })}
                handleClose={() => props.returnToMain()}
                forms={[{
                    child: (
                        <>
                            <TextField
                                placeholder={'Nome'} label={'Nome'}
                                handleChange={event => {
                                    setChanged(true)
                                    handleObjectChange({
                                        event: ({name: 'name', value: event.target.value}),
                                        setData: setData
                                    })

                                }} value={data === null ? null : data.name}
                                required={true}
                                width={'calc(50% - 16px'}/>
                            <TextField
                                placeholder={lang.acronym} label={lang.acronym}
                                handleChange={event => {
                                    setChanged(true)
                                    handleObjectChange({
                                        event: ({name: 'acronym', value: event.target.value}),
                                        setData: setData
                                    })
                                }} value={data === null ? null : data.acronym}
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
                        </>
                    )
                }]}/>
        </>
    )
    return (
        content
    )

}

UnitForm.propTypes = {
    returnToMain: PropTypes.func,
    create: PropTypes.bool,
    asDefault: PropTypes.bool,
    action: PropTypes.object
}
