import {useQuery} from "sis-aeb-core";
import {access_profile_permissions_query, permission_query} from "../../queries/queries";
import List from "../../../../core/list/List";
import {useState} from "react";
import Switcher from "../../../../core/misc/switcher/Switcher";
import PermissionForm from "../forms/PermissionForm";
import {permissionKeys} from "../../keys/keys";
import PropTypes from 'prop-types'
import Selector from "../../../../core/inputs/selector/Selector";
import {accessPrivilege} from "../../utils/submits";
import {DeleteRounded} from "@material-ui/icons";
import deleteEntry from "../../utils/delete";

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
                            accessPrivilege({
                                data: e.id,
                                accessProfile: props.accessProfile
                            })
                        }
                        }/>
                </div>
                :
                null
            }
            <Switcher openChild={openEntity ? 0 : 1}>


                <div style={{marginTop: '48px'}}>
                    <PermissionForm initialData={openEntity ? openEntity : {}}
                                    handleClose={() => setOpenEntity(undefined)}/>
                </div>

                <List
                    createOption={true}
                    keys={permissionKeys}
                    controlButtons={[
                        {
                            label: 'Deletar',
                            icon: <DeleteRounded/>,
                            onClick: data => {
                                deleteEntry({pk: data.id, path: 'privilege'}).then(() => hook.clean())
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
                    title={'Permissões'}
                />

            </Switcher>
        </>
    )
}
PermissionList.propTypes =
{
    accessProfile: PropTypes.number
}