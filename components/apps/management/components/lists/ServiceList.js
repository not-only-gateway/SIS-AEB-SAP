import {useQuery} from "mfc-core";
import {service_query} from "../../queries/queries";
import List from "../../../../core/visualization/list/List";
import {useState} from "react";
import ServiceForm from "../forms/ServiceForm";
import Switcher from "../../../../core/navigation/switcher/Switcher";
import PropTypes from "prop-types";
import {serviceKeys} from "../../keys/keys";
import {DeleteRounded} from "@material-ui/icons";
import deleteEntry from "../../utils/delete";


export default function ServiceList(props) {
    const hook = useQuery(service_query)
    const [openEntity, setOpenEntity] = useState(undefined)
    return (
        <Switcher openChild={openEntity ? 0 : 1}   styles={{width: '100%', height: '100%'}}>

            <div style={{marginTop: '48px'}}>
                <ServiceForm initialData={openEntity ? openEntity : {}}
                             redirect={id => props.redirect('/management/?page=service&id=' + id, '/management/?page=service&id=' + id, {})}
                             handleClose={() => {
                                 setOpenEntity(undefined)
                                 hook.clean()
                             }}
                />
            </div>
            <List
                createOption={true}
                keys={serviceKeys}
                controlButtons={[
                    {
                        label: 'Deletar',
                        icon: <DeleteRounded/>,
                        onClick: data => {
                            deleteEntry({
                                prefix: 'gateway', pk: data.id, suffix: 'service'
                            }).then(() => hook.clean())
                        }
                    }
                ]}
                hook={hook} onCreate={() => setOpenEntity({})}
                onRowClick={row => props.redirect('/management/?page=service&id=' + row.id, '/management/?page=service&id=' + row.id, {})}
                title={'Serviços registrados'}
            />
        </Switcher>
    )
}
ServiceList.propTypes = {
    redirect: PropTypes.func
}