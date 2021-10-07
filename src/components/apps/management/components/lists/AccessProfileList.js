import {useQuery} from "sis-aeb-core";
import {access_profile_query, permission_query} from "../../queries/queries";
import List from "../../../../core/list/List";
import {useState} from "react";
import ServiceForm from "../forms/ServiceForm";
import Switcher from "../../../../core/misc/switcher/Switcher";
import {accessProfileKeys} from "../../keys/keys";
import AccessProfileForm from "../forms/AccessProfileForm";
import PropTypes from 'prop-types'
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
                hook={hook} onCreate={() => setOpenEntity({})}
                onRowClick={row => setOpenEntity(row)}
                title={'Perfis de acesso'}
            />
        </Switcher>
    )
}

AccessProfileList.propTypes={
    redirect: PropTypes.func
}