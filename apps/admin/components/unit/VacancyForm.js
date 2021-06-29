import PropTypes from "prop-types";
import React, {useState} from "react";
import {linkage} from "../../packages/locales/organizational/SimpleFormsPT";
import {Alert, Selector} from "sis-aeb-misc";
import {DateField, FormLayout, TextField} from "sis-aeb-inputs";
import submitContractualLinkage from "../../utils/submit/SubmitContractualLinkage";
import Host from "../../utils/shared/Host";
import Cookies from "universal-cookie/lib";

export default function VacancyForm(props) {
    const [changed, setChanged] = useState(false)
    const lang = linkage
    const [status, setStatus] = useState({
        type: undefined,
        message: undefined
    })

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
                handleSubmit={() => null
                    // submitContractualLinkage({
                    //     pk: props.data === null ? null : props.data.id,
                    //     data: props.data,
                    //     create: props.data.id === undefined || props.data.id === null,
                    //     personID: props.personID,
                    //     setStatus: setStatus
                    // }).then(res => {
                    //     setChanged(!res)
                    // })
                }
                handleClose={() => props.closeModal()}
                forms={
                    [
                        {
                            title: lang.occupancy,
                            child: (
                                <>
                                    <Selector
                                        getEntityKey={entity => {
                                            if (entity !== undefined && entity !== null)
                                                return entity.id
                                            else
                                                return -1
                                        }}
                                        handleChange={entity => {
                                            setChanged(true)
                                            props.handleChange({name: 'role', value: entity})
                                        }}
                                        selectorKey={'role-selector'}
                                        selected={props.data === null ? null : props.data.unit}
                                        setChanged={setChanged} label={lang.unit}
                                        disabled={false} required={true}
                                        width={'calc(33.333% - 21.5px)'}
                                        renderEntity={entity => {
                                            if (entity !== undefined && entity !== null)
                                                return (
                                                    <div style={{display: 'flex', alignItems: 'center'}}>
                                                        {entity.denomination}
                                                    </div>
                                                )
                                            else
                                                return null
                                        }} fetchUrl={Host() + 'list/role_commissioned'}
                                        fetchToken={(new Cookies()).get('jwt')}
                                        elementRootID={'root'}/>

                                </>
                            )
                        },
                    ]}/>

        </>
    )
}
VacancyForm.propTypes = {
    create: PropTypes.bool,
    closeModal: PropTypes.func,
    data: PropTypes.object,
    handleChange: PropTypes.func,
    personID: PropTypes.number,
}