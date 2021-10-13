import {useQuery} from "sis-aeb-core";
import {access_profile_query} from "../../queries/queries";
import List from "../../../../core/list/List";
import {useState} from "react";
import Switcher from "../../../../core/misc/switcher/Switcher";
import {accessProfileKeys} from "../../keys/keys";
import AccessProfileForm from "../forms/AccessProfileForm";
import PropTypes from 'prop-types'
import {DeleteRounded} from "@material-ui/icons";
import deleteEntry from "../../utils/delete";

export default function AccessProfileList(props) {
    const hook = useQuery(access_profile_query)
    const [openEntity, setOpenEntity] = useState(undefined)
    return (

        <Switcher openChild={openEntity ? 0 : 1}>
            <div style={{marginTop: '48px'}}>
                <AccessProfileForm
                    redirect={id => props.redirect('/management/?page=access&id='+id, '/management/?page=access&id='+id, {})}
                    initialData={openEntity ? openEntity : {}}
                             handleClose={() => setOpenEntity(undefined)}
                />
            </div>
            <List
                createOption={true}
                keys={accessProfileKeys}
                controlButtons={[
                    {
                        label: 'Deletar',
                        icon: <DeleteRounded/>,
                        onClick: data => {
                            deleteEntry({pk: data.id, path: 'access_profile'}).then(() => hook.clean())
                        }
                    }
                ]}
                hook={hook} onCreate={() => setOpenEntity({})}
                onRowClick={row => props.redirect('/management/?page=access&id='+row.id, '/management/?page=access&id='+row.id, {})}
                title={'Perfis de acesso'}
            />
        </Switcher>
    )
}

AccessProfileList.propTypes={
    redirect: PropTypes.func
}