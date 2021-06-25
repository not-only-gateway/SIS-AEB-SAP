import PropTypes from "prop-types";
import {Alert, Selector} from "sis-aeb-misc";
import {FormLayout, TextField} from "sis-aeb-inputs";
import Host from "../../utils/shared/Host";
import Cookies from "universal-cookie/lib";
import React from "react";

export default function CommissionedLinkageForm(props) {
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
                        {name: 'denomination', type: 'string'},

                        {name: 'legal_document', type: 'string'},
                        {name: 'contract', type: 'object'},
                        {name: 'effective_role', type: 'object'},
                        {name: 'entity', type: 'object'},
                    ],
                    changed: changed,
                    entity: props.data
                }} returnButton={true} handleSubmit={() =>
                props.handleSubmit({
                    pk: props.data === null ? null : props.data.id,
                    data: props.data,
                    create: props.data === null || props.data.id === undefined,
                    setStatus: setStatus
                }).then(res => {
                    setChanged(!res)
                })}
                handleClose={() => props.closeModal()}
                forms={[{
                    child: (
                        <>


                        </>
                    )
                },
                    {
                        title: lang.additional,
                        child: (
                            <>

                            </>
                        )
                    },
                ]}/>
        </>
    )
}
CommissionedLinkageForm.propTypes = {
    create: PropTypes.bool,
    closeModal: PropTypes.func,
    data: PropTypes.object,
    handleChange: PropTypes.func
}