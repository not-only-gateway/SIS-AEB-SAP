import React, {useEffect, useState} from "react";
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

import PropTypes from "prop-types";
import ProjectRequests from "../../utils/requests/ProjectRequests";
import handleObjectChange from "../../utils/shared/HandleObjectChange";
import EntitiesPT from "../../locales/EntitiesPT";
import TypeForm from "./TypeForm";
import Host from "../../utils/shared/Host";
import Cookies from "universal-cookie/lib";

export default function ClassificationForm(props) {

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
                initialData={data}
                create={props.create} title={props.create ? lang.newClassification : lang.classification}
                dependencies={
                    [
                        {name: 'classification', type: 'string'},
                        {name: 'type', type: 'object'},
                    ]} noAutoHeight={!props.asDefault}
                returnButton={true}
                handleSubmit={() =>
                    ProjectRequests.submitClassification({
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
                            placeholder={lang.classification} label={lang.classification}
                            handleChange={event => {
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
                            selected={data === null || data.type === undefined ? null : data.type}
                            disabled={false}
                            width={'calc(50% - 16px)'}
                            fields={[
                                {name: 'type', type: 'string'}
                            ]} required={true}
                            labels={['tipo']}
                            fetchUrl={Host() + 'list/type'}
                            createOption={true}
                            fetchToken={(new Cookies()).get('jwt')}
                            returnToList={!open}
                            setReturnToList={() => setOpen(true)}
                        >
                            <TypeForm
                                returnToMain={() => {
                                    setOpen(false)
                                }}

                                create={true}
                            />
                        </Selector>

                    </FormRow>
                )}
            </Form>
        </>
    )
    return (
        content
    )

}

ClassificationForm.propTypes = {
    returnToMain: PropTypes.func,
    create: PropTypes.bool,
    asDefault: PropTypes.bool,
    action: PropTypes.object
}
