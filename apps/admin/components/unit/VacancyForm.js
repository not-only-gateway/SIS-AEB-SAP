import PropTypes from "prop-types";
import React, {useEffect, useState} from "react";
import {linkage} from "../../packages/locales/organizational/SimpleFormsPT";
import {Alert, Selector} from "sis-aeb-misc";
import {DateField, FormLayout, TextField} from "sis-aeb-inputs";
import submitContractualLinkage from "../../utils/submit/SubmitContractualLinkage";
import Host from "../../utils/shared/Host";
import Cookies from "universal-cookie/lib";
import VacancyPT from "../../packages/locales/unit/VacancyPT";
import submitUnitRole from "../../utils/submit/SubmitUnitRole";

const cookies = new Cookies()
export default function VacancyForm(props) {
    const [changed, setChanged] = useState(false)
    const lang = VacancyPT
    const [status, setStatus] = useState({
        type: undefined,
        message: undefined
    })

    useEffect(() => {
        props.handleChange({name: 'unit', value: props.unit})

    }, [])
    return (
        <>
            <Alert
                type={status.type} render={status.type !== undefined} rootElementID={'root'}
                handleClose={() => setStatus({type: undefined, message: undefined})} message={status.message}
            />
            <FormLayout
                create={props.create}
                formLabel={lang.title}
                dependencies={{
                    fields: [
                        {name: 'role', type: 'object'},
                    ],
                    changed: changed,
                    entity: props.data
                }} returnButton={true}
                handleSubmit={() => submitUnitRole({
                    pk: props.data === null ? null : props.data.id,
                    data: props.data,
                    create: props.data.id === undefined || props.data.id === null,
                    personID: props.personID,
                    setStatus: setStatus
                }).then(res => {
                    setChanged(!res)
                })
                }
                handleClose={() => props.returnToMain()}
                forms={
                    [
                        {
                            title: lang.info,
                            child: (
                                <>
                                    <Selector
                                        getEntityKey={entity => {
                                            if (entity !== undefined && entity !== null)
                                                return entity.id
                                            else
                                                return 0
                                        }} selectorKey={'role_selector'}
                                        fetchUrl={Host() + 'list/role_commissioned'}
                                        fetchToken={cookies.get('jwt')}
                                        renderEntity={entity => {
                                            if (entity !== undefined && entity !== null)
                                                return (
                                                    <div style={{display: 'flex', alignItems: 'center'}}>
                                                        {entity.denomination}
                                                    </div>
                                                )
                                            else
                                                return null
                                        }}
                                        selected={props.data !== null ? props.data.role : null} width={'100%'}
                                        label={lang.role} elementRootID={'root'}
                                        handleChange={entity => {
                                            setChanged(true)
                                            props.handleChange({name: 'role', value: entity})
                                        }}
                                        setChanged={setChanged} required={true}/>

                                </>
                            )
                        },
                    ]}/>

        </>
    )
}
VacancyForm.propTypes = {
    unit: PropTypes.object,
    create: PropTypes.bool,
    data: PropTypes.object,
    handleChange: PropTypes.func,
    returnToMain: PropTypes.func,
}