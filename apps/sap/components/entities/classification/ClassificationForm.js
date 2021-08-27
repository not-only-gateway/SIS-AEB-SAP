import React, {useEffect, useState} from "react";

import {TextField} from "sis-aeb-inputs";
import PropTypes from "prop-types";
import EntityLayout from "../../shared/misc/form/EntityLayout";
import ProjectRequests from "../../../utils/requests/ProjectRequests";
import handleObjectChange from "../../../utils/shared/HandleObjectChange";
import EntitiesPT from "../../../packages/locales/EntitiesPT";
import Modal from "../../shared/misc/modal/Modal";
import ActionForm from "../action/ActionForm";
import TypeForm from "../type/TypeForm";
import Selector from "../../shared/misc/selector/Selector";
import Host from "../../../utils/shared/Host";
import Cookies from "universal-cookie/lib";

export default function ClassificationForm(props) {
    const [changed, setChanged] = useState(false)
    const lang = EntitiesPT
    const [data, setData] = useState(null)
    const [open, setOpen] = useState(false)
    useEffect(() => {
            setData(props.data)
    }, [])

    const content = (
        <>

            <EntityLayout
                entity={data}
                create={props.create} label={props.create ? lang.newClassification : lang.classification}
                dependencies={{
                    fields: [
                        {name: 'classification', type: 'string'},
                        {name: 'type', type: 'string'},
                    ],
                    changed: changed
                }}
                returnButton={true}
                handleSubmit={() =>
                    ProjectRequests.submitClassification({
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
                                placeholder={lang.classification} label={lang.classification}
                                handleChange={event => {
                                    setChanged(true)
                                    handleObjectChange({
                                        event: ({name: 'classification', value: event.target.value}),
                                        setData: setData
                                    })

                                }} value={data === null ? null : data.classification}
                                required={true}
                                width={'calc(50% - 16px'}/>
                            <Selector
                                getEntityKey={entity => {
                                    if (entity !== null && entity !== undefined)
                                        return entity.id
                                    else return -1
                                }} searchFieldName={'search_input'}
                                handleChange={entity => {
                                    handleObjectChange({
                                        event: ({name: 'type', value: entity}),
                                        setData: setData
                                    })
                                }} label={'Vincular tipo'}
                                setChanged={() => null}
                                selected={props.data === null || !props.data.type ? null : props.data.type}
                                disabled={false}
                                handleCreate={() => setOpen(true)}
                                width={'calc(50% - 16px)'}
                                fields={[
                                    {name: 'type', type: 'string'}
                                ]} required={true}
                                labels={['tipo']}
                                fetchUrl={Host() + 'list/type'}
                                createOption={true}
                                fetchToken={(new Cookies()).get('jwt')}
                            />
                        </>
                    )
                }]}/>
            <Modal open={open} handleClose={() => setOpen(false)}>
                <div style={{
                    height: '100vh',
                    width: '100vw',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <TypeForm
                        returnToMain={() => {
                            setOpen(false)
                        }}
                        create={true}
                    />
                </div>
            </Modal>
        </>
    )
    return (
        props.asDefault ? content :
            <div style={{width: '55vw', height: '400px', background: 'white', borderRadius: '8px'}}>
                {content}
            </div>
    )

}

ClassificationForm.propTypes = {
    returnToMain: PropTypes.func,
    create: PropTypes.bool,
    asDefault: PropTypes.bool,
    action: PropTypes.object
}
