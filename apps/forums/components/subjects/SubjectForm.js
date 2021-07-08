import React, {useState} from "react";
import PropTypes from "prop-types";

import {TextField} from "sis-aeb-inputs";
import {Alert, EntityLayout} from "sis-aeb-misc";


import submitSubject from "../../utils/submit/SubmitSubject";
import SubjectFormPT from "../../packages/locales/SubjectFormPT";

export default function SubjectForm(props) {

    const [changed, setChanged] = useState(false)
    const lang = SubjectFormPT
    const [status, setStatus] = useState({
        error: undefined,
        message: undefined
    })


    return (
        <>
            {props.id === undefined || props.id === null ? <Alert
                type={status.type} render={status.type !== undefined} rootElementID={'root'}
                handleClose={() => setStatus({type: undefined, message: undefined})} message={status.message}
            /> : null}

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
                }} returnButton={props.id === undefined || props.id === null}
                handleSubmit={() =>
                    submitSubject({
                        pk: props.id,
                        data: props.data,
                        setStatus: setStatus,
                        create: props.id === undefined || props.id === null
                    }).then(res => {
                        if(res.status && (props.id === undefined || props.id === null))
                            props.redirect(res.id)
                        else if(res.status)
                            props.returnToMain()

                        setChanged(!res.status)
                    })
                }
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
    id: PropTypes.any,
    data: PropTypes.object,
    handleChange: PropTypes.func,
    returnToMain: PropTypes.func,
    redirect: PropTypes.func,
}