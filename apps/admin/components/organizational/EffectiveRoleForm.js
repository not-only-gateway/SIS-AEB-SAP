import React, {useState} from "react";
import PropTypes from "prop-types";

import {DropDownField, TextField} from "sis-aeb-inputs";
import {effective} from "../../packages/locales/organizational/SimpleFormsPT";
import {Alert, EntityLayout} from "sis-aeb-misc";
import CommissionedLinkageOverview from "../../packages/overview/CommissionedLinkageOverview";
import OrganizationalKeys from "../../packages/keys/OrganizationalKeys";
import Cookies from "universal-cookie/lib";
import Host from "../../utils/shared/Host";
import ContractualLinkageDescription from "../../packages/descriptions/ContractualLinkageDescription";


export default function EffectiveRoleForm(props) {

    const [changed, setChanged] = useState(false)
    const lang = effective
    const [status, setStatus] = useState({
        type: undefined,
        message: undefined
    })

    return (
        <>
            <Alert type={status.type} rootElementID={'root'} render={status.type !== undefined}
                   handleClose={() => setStatus({type: undefined, message: undefined})} message={status.message}/>

            <EntityLayout
                fields={CommissionedLinkageOverview} entityID={props.create ? undefined : props.data.id}
                rootElementID={'root'} entity={props.data} information={ContractualLinkageDescription}
                create={props.create} label={lang.title} entityKey={OrganizationalKeys.effective}
                fetchToken={(new Cookies()).get('jwt')}
                fetchUrl={Host() + 'list/object'} exists={true} fetchSize={15} setVersion={() => null}

                dependencies={{
                    fields: [
                        {name: 'denomination', type: 'string'},
                        {name: 'license', type: 'bool'},

                        {name: 'hierarchy_level', type: 'string'}
                    ],
                    changed: changed
                }} returnButton={true}
                handleSubmit={() =>
                props.handleSubmit({
                    pk: props.data === null ? null : props.data.id,
                    data: props.data,
                    create:  props.data === null || props.data.id === undefined,
                    setStatus: setStatus
                }).then(res => {
                    setChanged(!res)
                })
            }
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
                                locale={props.locale} value={props.data === null ? null : props.data.denomination}
                                required={true}
                                width={'calc(50% - 16px)'}
                            />
                            <TextField
                                dark={true}
                                placeholder={lang.hierarchyLevel} label={lang.hierarchyLevel}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'hierarchy_level', value: event.target.value})
                                }}
                                locale={props.locale}
                                value={props.data === null ? null : props.data.hierarchy_level}
                                required={true}
                                width={'calc(50% - 16px)'}
                            />
                            <DropDownField

                                placeholder={lang.license}
                                label={lang.license}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'license', value: event})

                                }}

                                value={props.data === null ? null : props.data.license}
                                required={true}
                                width={'100%'}
                                choices={lang.options}/>
                        </>
                    )
                }]}/>
        </>
    )

}

EffectiveRoleForm.propTypes = {
    data: PropTypes.object,
    create: PropTypes.bool,
    closeModal: PropTypes.func
}