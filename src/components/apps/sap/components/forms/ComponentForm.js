import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import InfrastructurePT from "../../locales/InfrastructurePT";
import WorkPlanRequests from "../../utils/requests/WorkPlanRequests";
import Host from "../../utils/shared/Host";
import Cookies from "universal-cookie/lib";
import ClassificationForm from "./ClassificationForm";
import {Form, FormRow, Selector, TextField} from "sis-aeb-core";


export default function ComponentForm(props) {

    const lang = InfrastructurePT
    const [open, setOpen] = useState(false)
    const [initialData, setInitialData] = useState(null)
    useEffect(() => {
        setInitialData({
            ...props.data,
            ...{
                infrastructure:props.infrastructure.id
            }
        })
    }, [])
    return (
        <>

            <Form
                initialData={initialData}
                create={props.create} title={props.create ? lang.newComponent : lang.component}
                dependencies={
                    [
                        {name: 'situation', type: 'string'},
                        {name: 'classification', type: 'object'}
                    ]
                }
                returnButton={true}
                handleSubmit={(data) =>
                    WorkPlanRequests.submitComponent({
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
                            placeholder={lang.situation}
                            label={lang.situation}
                            handleChange={event => {
                                handleChange({
                                    event:event.target.value,
                                    key: 'situation'
                                })
                            }} value={ data.situation}
                            required={true}
                            width={'calc(50% - 16px)'}/>
                        <Selector
                            getEntityKey={entity => {
                                if (entity !== null && entity !== undefined)
                                    return entity.id
                                else return -1
                            }} searchFieldName={'search_input'}
                            handleChange={entity => {
                                handleChange({key: 'classification', value: entity})
                            }} label={'Vincular componente'}
                            setChanged={() => null}
                            selected={props.data === null || !props.data.classification ? null : props.data.classification}
                            width={'calc(50% - 16px)'}
                            fields={[
                                {name: 'classification', type: 'string'},
                                {name: 'type', type: 'string'},
                            ]} required={true}
                            labels={['classificação', 'tipo']}
                            fetchUrl={Host() + 'list/classification'}
                            fetchToken={(new Cookies()).get('jwt')}

                            createOption={true}
                            returnToList={!open}
                            setReturnToList={() => setOpen(true)}
                        >
                            <ClassificationForm create={true} returnToMain={() => setOpen(false)}/>
                        </Selector>
                    </FormRow>
                )}
            </Form>
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