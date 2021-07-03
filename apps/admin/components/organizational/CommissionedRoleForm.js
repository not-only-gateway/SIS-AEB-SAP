import React, {useState} from "react";
import PropTypes from "prop-types";

import {Alert, EntityLayout} from "sis-aeb-misc";
import {TextField} from "sis-aeb-inputs";
import {commissioned} from "../../packages/locales/organizational/SimpleFormsPT";
import CommissionedLinkageOverview from "../../packages/overview/CommissionedLinkageOverview";
import OrganizationalKeys from "../../packages/keys/OrganizationalKeys";
import Cookies from "universal-cookie/lib";
import Host from "../../utils/shared/Host";
import ContractualLinkageDescription from "../../packages/descriptions/ContractualLinkageDescription";


export default function CommissionedRoleForm(props) {

    const [changed, setChanged] = useState(false)
    const lang = commissioned
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

            <EntityLayout
                fields={CommissionedLinkageOverview} entityID={props.create ? undefined : props.data.id}
                rootElementID={'root'} entity={props.data} information={ContractualLinkageDescription}
                create={props.create} label={lang.title} entityKey={OrganizationalKeys.commissioned}
                fetchToken={(new Cookies()).get('jwt')}
                fetchUrl={Host() + 'list/object'} exists={true} fetchSize={15} setVersion={() => null}
                dependencies={{
                    fields: [
                        {name: 'denomination', type: 'string'},
                        {name: 'acronym', type: 'string'},
                        {name: 'quantity', type: 'number'}
                    ],
                    changed: changed,
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
                            <TextField

                                placeholder={lang.denomination} label={lang.denomination}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'denomination', value: event.target.value})
                                }}
                                value={props.data === null ? null : props.data.denomination}
                                required={true}
                                width={'100%'}
                            />
                            <TextField

                                placeholder={lang.acronym} label={lang.acronym}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'acronym', value: event.target.value})
                                }}

                                value={props.data === null ? null : props.data.acronym} required={true}
                                width={'calc(50%  - 16px)'}
                            />
                            <TextField
                                type={'number'}
                                placeholder={lang.quantity} label={lang.quantity}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'quantity', value: event.target.value})
                                }}

                                value={props.data === null ? null : props.data.quantity} required={true}
                                width={'calc(50%  - 16px)'}
                            />
                        </>
                    )
                }
                ]}/>
        </>
    )

}

CommissionedRoleForm.propTypes = {
    handleSubmit: PropTypes.func,
    handleChange: PropTypes.func,
    create: PropTypes.bool,
    data: PropTypes.object,

    closeModal: PropTypes.func
}