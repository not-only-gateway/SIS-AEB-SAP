import {useQuery} from "sis-aeb-core";
import {permission_query} from "../../queries/queries";
import List from "../../../../core/list/List";
import {useState} from "react";
import ServiceForm from "../forms/ServiceForm";

export default function AccessProfileList(props) {
    const hook = useQuery(permission_query)
    const [openEntity, setOpenEntity] = useState(undefined)
    return (
        <>
            <div style={{display: !openEntity ? 'none' : undefined, marginTop: '48px'}}>
                <ServiceForm initialData={openEntity ? openEntity : {}} handleClose={() => setOpenEntity(undefined)}/>
            </div>
            <div style={{display: openEntity ? 'none' : undefined}}>
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
            </div>
        </>
    )
}