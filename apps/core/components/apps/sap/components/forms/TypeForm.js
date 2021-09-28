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

export default function TypeForm(props) {
    const lang = EntitiesPT
    const [data, setData] = useState(null)


    useEffect(() => {
        if (props.data !== undefined)
            setData(props.data)
    }, [])

    return (
        <>
            <Form
                initialData={props.data}
                create={props.create}
                noAutoHeight={props.create}
                title={props.create ? lang.newType : lang.type}
                dependencies={
                    [
                        {name: 'type', type: 'string'},
                    ]
                }
                returnButton={true}
                handleSubmit={() =>
                    ProjectRequests.submitType({
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
                            placeholder={lang.type} label={lang.type}
                            handleChange={event => {

                                handleObjectChange({
                                    event: ({name: 'type', value: event.target.value}),
                                    setData: setData
                                })

                            }} value={data === null ? null : data.type}
                            required={true}
                            width={'100%'}/>

                    </FormRow>

                )}
            </Form>
        </>
    )

}

TypeForm.propTypes = {
    returnToMain: PropTypes.func,
    create: PropTypes.bool,
    action: PropTypes.object
}
