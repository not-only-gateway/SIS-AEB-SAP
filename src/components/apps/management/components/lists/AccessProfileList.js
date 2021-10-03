import {useQuery} from "sis-aeb-core";
import {permission_query} from "../../queries/queries";
import List from "../../../../core/list/List";
import {useState} from "react";
import ServiceForm from "../forms/ServiceForm";
import Switcher from "../../../../core/misc/switcher/Switcher";

export default function AccessProfileList(props) {
    const hook = useQuery(permission_query)
    const [openEntity, setOpenEntity] = useState(undefined)
    return (

        <Switcher openChild={openEntity ? 0 : 1}>
            <div style={{marginTop: '48px'}}>
                <ServiceForm initialData={openEntity ? openEntity : {}}
                             handleClose={() => setOpenEntity(undefined)}/>
            </div>
            <List
                createOption={true}
                keys={[
                    {
                        key: 'id',
                        label: 'id',
                        type: 'number',
                    },
                    {
                        key: 'denomination',
                        label: 'Denominação',
                        type: 'string',
                    }
                ]}
                hook={hook} onCreate={() => setOpenEntity({})}
                onRowClick={row => setOpenEntity(row)}
                title={'Perfis de acesso'}
            />
        </Switcher>
    )
}