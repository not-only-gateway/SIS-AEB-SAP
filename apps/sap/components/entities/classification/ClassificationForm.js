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

export default function ClassificationForm(props) {
    const [changed, setChanged] = useState(false)
    const lang = EntitiesPT
    const [data, setData] = useState(null)

    useEffect(() => {
        if (!props.create)
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
                            <TextField
                                placeholder={lang.type} label={lang.type}
                                handleChange={event => {
                                    setChanged(true)
                                    handleObjectChange({
                                        event: ({name: 'type', value: event.target.value}),
                                        setData: setData
                                    })
                                }} value={data === null ? null : data.type}
                                required={true} width={'calc(50% - 16px'}
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

ClassificationForm.propTypes = {
    returnToMain: PropTypes.func,
    create: PropTypes.bool,
    asDefault: PropTypes.bool,
    action: PropTypes.object
}
