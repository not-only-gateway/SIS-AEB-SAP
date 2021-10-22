import {useQuery} from "mfc-core";
import {endpoint_query} from "../../queries/queries";
import List from "../../../../core/list/List";
import {useState} from "react";
import EndpointForm from "../forms/EndpointForm";
import Switcher from "../../../../core/misc/switcher/Switcher";
import PropTypes from 'prop-types'
import {endpointKeys} from "../../keys/keys";
import {DeleteRounded} from "@material-ui/icons";
import deleteEntry from "../../utils/requests/delete";


export default function EndpointList(props) {
    const hook = useQuery(endpoint_query(props.service))
    const [openEntity, setOpenEntity] = useState(undefined)
    return (
        <Switcher openChild={openEntity ? 0 : 1}>
            <div style={{marginTop: '48px'}}>
                <EndpointForm
                    initialData={openEntity ? openEntity : {}}
                    service={props.service}
                    redirect={id => props.redirect('/management/?page=endpoint&id=' + id, '/management/?page=endpoint&id=' + id, {})}
                    handleClose={() => {
                        setOpenEntity(undefined)
                        hook.clean()
                    }}
                />
            </div>
            <List
                keys={endpointKeys}
                hook={hook} createOption={true}
                controlButtons={[
                    {
                        label: 'Deletar',
                        icon: <DeleteRounded/>,
                        onClick: data => {
                            deleteEntry({
                                prefix: 'gateway',
                                suffix: 'endpoint',
                                pk: data.url
                            }).then(() => hook.clean())
                        }
                    }
                ]}
                onRowClick={row => props.service ? setOpenEntity(row) : props.redirect('/management/?page=endpoint&id=' + row.url, '/management/?page=endpoint&id=' + row.url, {})}
                onCreate={() => setOpenEntity({})}
                title={'Endpoints registrados'}
            />

        </Switcher>
    )
}

EndpointList.propTypes = {
    redirect: PropTypes.func,
    service: PropTypes.number
}