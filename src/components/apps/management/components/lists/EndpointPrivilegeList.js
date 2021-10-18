import {useQuery} from "sis-aeb-core";
import {endpoint_privilege_query} from "../../queries/queries";
import List from "../../../../core/list/List";
import {useState} from "react";
import Switcher from "../../../../core/misc/switcher/Switcher";
import {endpointPrivilegeKeys} from "../../keys/keys";
import PropTypes from 'prop-types'
import {DeleteRounded} from "@material-ui/icons";
import deleteEntry from "../../utils/requests/delete";
import EndpointPrivilegeForm from "../forms/EndpointPrivilegeForm";

export default function EndpointPrivilegeList(props) {
    const hook = useQuery(endpoint_privilege_query(props.endpoint))
    const [openEntity, setOpenEntity] = useState(undefined)
    return (

        <Switcher openChild={openEntity ? 0 : 1}>
            <div style={{marginTop: '48px'}}>
                <EndpointPrivilegeForm endpoint={props.endpoint} handleClose={() => {
                    hook.clean()
                    setOpenEntity(undefined)
                }}/>
            </div>

            <List
                createOption={true}
                keys={endpointPrivilegeKeys}
                controlButtons={[
                    {
                        label: 'Deletar',
                        icon: <DeleteRounded/>,
                        onClick: data => {
                            deleteEntry({
                                prefix: 'gateway/',
                                fk: data.privilege.id,
                                pk: data.endpoint,
                                suffix: 'endpoint/privilege'
                            }).then(() => hook.clean())
                        }
                    }
                ]}
                hook={hook}
                onCreate={() => {
                    setOpenEntity({})
                }} onlyVisualization={true}
                onRowClick={row => setOpenEntity(row)}
                title={'Privilégios'}
            />

        </Switcher>
    )
}
EndpointPrivilegeList.propTypes = {
    endpoint: PropTypes.string
}