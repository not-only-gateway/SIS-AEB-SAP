import {useQuery} from "sis-aeb-core";
import {access_profile_permissions_query, permission_query} from "../../queries/queries";
import List from "../../../../core/list/List";
import {useState} from "react";
import Switcher from "../../../../core/misc/switcher/Switcher";
import PermissionForm from "../forms/PermissionForm";
import {permissionKeys} from "../../keys/keys";
import PropTypes from 'prop-types'
import Selector from "../../../../core/inputs/selector/Selector";
import {DeleteRounded} from "@material-ui/icons";
import deleteEntry from "../../utils/requests/delete";
import Host from "../../utils/shared/Host";
import EndpointPrivilegeForm from "../forms/EndpointPrivilegeForm";

export default function PermissionList(props) {
    const hook = props.accessProfile ? useQuery(access_profile_permissions_query(props.accessProfile)) : undefined
    const permissionHook = useQuery(permission_query)
    const [openEntity, setOpenEntity] = useState(undefined)
    const [openModal, setOpenModal] = useState(false)

    return (
        <>
            {props.accessProfile ?
                <div style={{display: 'none'}}>
                    <Selector
                        hook={permissionHook}
                        keys={permissionKeys} open={openModal} handleClose={() => setOpenModal(false)}
                        title={'Adicionar permissão'} placeholder={'Adicionar permissão'}
                        width={'calc(50% - 16px)'} required={true}
                        handleChange={e => {
                            hook.clean()
                            deleteEntry({
                                prefix: 'auth',
                                pk:  props.accessProfile,
                                fk:  e.id,
                                url: Host('auth') + '/access_profile/privilege'
                            }).then(() => hook.clean())
                        }
                        }/>
                </div>
                :
                null
            }
            <Switcher openChild={openEntity ? 0 : 1}>


                <div style={{marginTop: '48px'}}>
                    {props.endpoint ? <EndpointPrivilegeForm/>
                        :
                        <PermissionForm initialData={openEntity ? openEntity : {}}
                                        handleClose={() => setOpenEntity(undefined)}/>}
                </div>

                <List
                    createOption={true}
                    keys={permissionKeys}
                    controlButtons={[
                        {
                            label: 'Deletar',
                            icon: <DeleteRounded/>,
                            onClick: data => {
                                deleteEntry({pk: data.id, suffix: 'privilege'}).then(() => hook.clean())
                            }
                        }
                    ]}
                    hook={props.accessProfile ? hook : permissionHook} onCreate={() => {
                    if (props.accessProfile)
                        setOpenModal(true)
                    else
                        setOpenEntity({})
                }}
                    onRowClick={row => setOpenEntity(row)}
                    title={'Privilégios'}
                />

            </Switcher>
        </>
    )
}
PermissionList.propTypes = {
    endpoint: PropTypes.string,
    accessProfile: PropTypes.number
}