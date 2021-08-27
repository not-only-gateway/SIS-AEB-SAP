import React, {useEffect, useState} from "react";

import {TextField} from "sis-aeb-inputs";
import PropTypes from "prop-types";
import EntityLayout from "../../shared/misc/form/EntityLayout";
import ProjectRequests from "../../../utils/requests/ProjectRequests";
import ProjectPT from "../../../packages/locales/ProjectPT";
import handleObjectChange from "../../../utils/shared/HandleObjectChange";
import Selector from "../../shared/misc/selector/Selector";
import Host from "../../../utils/shared/Host";
import Cookies from "universal-cookie/lib";
import EntitiesPT from "../../../packages/locales/EntitiesPT";

export default function UnitForm(props) {
    const [changed, setChanged] = useState(false)
    const lang = EntitiesPT
    const [data, setData] = useState(null)

    useEffect(() => {

        setData(props.data)
    }, [])

    const content = (
        <>

            <EntityLayout
                entity={data}
                create={props.create} label={props.create ? lang.newUnit : lang.unit}
                dependencies={{
                    fields: [
                        {name: 'name', type: 'string'},
                        {name: 'acronym', type: 'string'},
                    ],
                    changed: changed
                }}
                returnButton={true}
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
                            />
                        </>
                    )
                }]}/>
        </>
    )
    return (
        props.asDefault ? content :
            <div style={{width: '55vw', height: '400px', background: 'white', borderRadius: '8px'}}>
                {content}
            </div>
    )

}

UnitForm.propTypes = {
    returnToMain: PropTypes.func,
    create: PropTypes.bool,
    asDefault: PropTypes.bool,
    action: PropTypes.object
}
