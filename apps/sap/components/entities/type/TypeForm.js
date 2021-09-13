import React, {useEffect, useState} from "react";

import {TextField} from "sis-aeb-core";
import PropTypes from "prop-types";
import Form from "../../shared/core/form/Form";
import ProjectRequests from "../../../utils/requests/ProjectRequests";
import handleObjectChange from "../../../utils/shared/HandleObjectChange";
import EntitiesPT from "../../../packages/locales/EntitiesPT";

export default function TypeForm(props) {
    const [changed, setChanged] = useState(false)
    const lang = EntitiesPT
    const [data, setData] = useState(null)


    useEffect(() => {
        if (props.data !== undefined)
            setData(props.data)
    }, [])

    return (
        <>
            <Form
                entity={data}
                create={props.create}
                noAutoHeight={props.create}
                label={props.create ? lang.newType : lang.type}
                dependencies={{
                    fields: [
                        {name: 'type', type: 'string'},
                    ],
                    changed: changed
                }}
                returnButton={true}
                handleSubmit={() =>
                    ProjectRequests.submitType({
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

                        <TextField
                            placeholder={lang.type} label={lang.type}
                            handleChange={event => {
                                setChanged(true)
                                handleObjectChange({
                                    event: ({name: 'type', value: event.target.value}),
                                    setData: setData
                                })

                            }} value={data === null ? null : data.type}
                            required={true}
                            width={'100%'}/>
                    )
                }]}/>
        </>
    )

}

TypeForm.propTypes = {
    returnToMain: PropTypes.func,
    create: PropTypes.bool,
    action: PropTypes.object
}
