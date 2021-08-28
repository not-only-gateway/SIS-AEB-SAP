import React, {useEffect, useState} from "react";

import {TextField} from "sis-aeb-inputs";
import PropTypes from "prop-types";
import EntityLayout from "../../shared/core/form/EntityLayout";
import ProjectRequests from "../../../utils/requests/ProjectRequests";
import ProjectPT from "../../../packages/locales/ProjectPT";
import handleObjectChange from "../../../utils/shared/HandleObjectChange";
import Selector from "../../shared/core/selector/Selector";
import Host from "../../../utils/shared/Host";
import Cookies from "universal-cookie/lib";
import EntitiesPT from "../../../packages/locales/EntitiesPT";

export default function DecentralizedUnitForm(props) {
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
                create={props.create} label={props.create ? lang.newDecentralizedUnit : lang.decentralizedUnit}
                dependencies={{
                    fields: [
                        {name: 'name', type: 'string'},
                        {name: 'competent_authority', type: 'string'},
                        {name: 'cpf', type: 'string'},
                        {name: 'identification', type: 'string'},
                        {name: 'uge', type: 'string'},
                        {name: 'ug', type: 'string'},
                        {name: 'cnpj', type: 'string'},
                        {name: 'responsible', type: 'string'},
                    ],
                    changed: changed
                }}
                returnButton={true}
                handleSubmit={() =>
                    ProjectRequests.submitDecentralizedUnit({
                        pk: data.id,
                        data: data,

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
                                placeholder={lang.name} label={lang.name}
                                handleChange={event => {
                                    setChanged(true)
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
                                    setChanged(true)
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
                                    setChanged(true)
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
                                    setChanged(true)
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
                                    setChanged(true)
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
                                    setChanged(true)
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
                                    setChanged(true)
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
                                    setChanged(true)
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
                                    setChanged(true)
                                    handleObjectChange({
                                        event: ({name: 'identification', value: event.target.value}),
                                        setData: setData
                                    })

                                }} value={data === null ? null : data.identification}
                                required={true}
                                width={'calc(33.333% - 21.5px'}/>
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

DecentralizedUnitForm.propTypes = {
    returnToMain: PropTypes.func,
    create: PropTypes.bool,
    asDefault: PropTypes.bool,
    action: PropTypes.object
}
