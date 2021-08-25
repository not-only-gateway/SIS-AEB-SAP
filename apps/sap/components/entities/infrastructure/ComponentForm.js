import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import InfrastructurePT from "../../../packages/locales/InfrastructurePT";
import EntityLayout from "../../shared/misc/form/EntityLayout";
import WorkPlanRequests from "../../../utils/requests/WorkPlanRequests";


export default function ComponentForm(props) {
    const [changed, setChanged] = useState(false)
    const lang = InfrastructurePT

    useEffect(() => {
        props.handleChange({name: 'infrastructure', value: props.infrastructure.id})
    }, [])
    return (
        <>

            <EntityLayout
                rootElementID={'root'} entity={props.data}
                create={props.create} label={props.create ? lang.newComponent : lang.component}
                dependencies={{
                    fields: [
                        {name: 'situation', type: 'string'},
                        {name: 'type', type: 'string'},
                        {name: 'classification', type: 'string'}
                    ],
                    changed: changed
                }}
                returnButton={true}
                handleSubmit={() =>
                    WorkPlanRequests.submitComponent({
                        pk: props.data.id,
                        data: props.data,
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
                            {/*<DropDownField*/}
                            {/*    placeholder={lang.situation}*/}
                            {/*    label={lang.situation}*/}
                            {/*    handleChange={event => {*/}
                            {/*        setChanged(true)*/}
                            {/*        props.handleChange(*/}
                            {/*            {name: 'situation', value: event}*/}
                            {/*        )*/}
                            {/*    }} value={props.data === null ? null : props.data.gnd} required={false}*/}
                            {/*    width={'calc(33.333% - 21.5px)'} choices={lang.situationOptions}/>*/}


                            {/*<DropDownField*/}
                            {/*    placeholder={lang.type}*/}
                            {/*    label={lang.type}*/}
                            {/*    handleChange={event => {*/}
                            {/*        setChanged(true)*/}
                            {/*        props.handleChange(*/}
                            {/*            {name: 'type', value: event}*/}
                            {/*        )*/}
                            {/*    }} value={props.data === null ? null : props.data.type} required={false}*/}
                            {/*    width={'calc(33.333% - 21.5px)'} choices={lang.typeOptions}/>*/}


                            {/*<DropDownField*/}
                            {/*    placeholder={lang.classification}*/}
                            {/*    label={lang.classification}*/}
                            {/*    handleChange={event => {*/}
                            {/*        setChanged(true)*/}
                            {/*        props.handleChange(*/}
                            {/*            {name: 'classification', value: event}*/}
                            {/*        )*/}
                            {/*    }} value={props.data === null ? null : props.data.classification} required={false}*/}
                            {/*    width={'calc(33.333% - 21.5px)'} choices={lang.classificationOptions}/>*/}


                        </>
                    )
                }]}/>
        </>
    )

}

ComponentForm.propTypes = {
    data: PropTypes.object,
    handleChange: PropTypes.func,
    returnToMain: PropTypes.func,
    create: PropTypes.bool,
    infrastructure: PropTypes.object
}
