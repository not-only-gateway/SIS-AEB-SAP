import React, {useState} from "react";
import PropTypes from "prop-types";

import {TextField} from "sis-aeb-inputs";
import {Alert} from "sis-aeb-misc";


import submitSubject from "../../utils/submit/SubmitSubject";
import SubjectFormPT from "../../packages/locales/SubjectFormPT";
import EntityLayout from "../components/form/EntityLayout";

export default function SubjectForm(props) {

    const [changed, setChanged] = useState(false)
    const lang = SubjectFormPT
    const [status, setStatus] = useState({
        error: undefined,
        message: undefined
    })


    return (
        <>
            <Alert
                type={status.type} render={status.type !== undefined} rootElementID={'root'}
                handleClose={() => setStatus({type: undefined, message: undefined})} message={status.message}
            />

            <EntityLayout
                entityID={props.id} onlyEdit={true}
                rootElementID={'root'} entity={props.data}
                create={props.data === null || props.data === undefined || props.data.id === undefined}
                label={lang.header}

                dependencies={{
                    fields: [
                        {name: 'title', type: 'string'},
                        {name: 'description', type: 'string'},
                    ],
                    changed: changed
                }} returnButton={true}
                handleSubmit={() =>
                    submitSubject({
                        pk: props.id,
                        data: props.data,
                        setStatus: setStatus,
                        create: props.id === undefined || props.id === null
                    }).then(res => {
                        if(res.status)
                            props.redirect(res.id)
                        setChanged(!res.status)
                    })}
                handleClose={() => props.returnToMain()}
                forms={[{
                    title: lang.emails,
                    child: (
                        <>
                            <TextField

                                placeholder={lang.title} label={lang.title} handleChange={event => {
                                setChanged(true)
                                props.handleChange({name: 'title', value: event.target.value})
                            }}
                                value={props.data === null ? null : props.data.title}
                                required={true} width={'calc(50% - 16px)'}/>

                            <TextField

                                placeholder={lang.description} label={lang.description} handleChange={event => {
                                setChanged(true)
                                props.handleChange({name: 'description', value: event.target.value})
                            }}
                                value={props.data === null ? null : props.data.description}
                                required={false} width={'calc(50% - 16px)'}/>
                        </>
                    )
                }

                ]}/>
        </>
    )

}

SubjectForm.propTypes = {
    id: PropTypes.number,
    data: PropTypes.object,
    handleChange: PropTypes.func,
    returnToMain: PropTypes.func,
    redirect: PropTypes.func,
}