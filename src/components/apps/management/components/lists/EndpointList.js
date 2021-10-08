import {useQuery} from "sis-aeb-core";
import {endpoint_query} from "../../queries/queries";
import List from "../../../../core/list/List";
import {useState} from "react";
import EndpointForm from "../forms/EndpointForm";
import Switcher from "../../../../core/misc/switcher/Switcher";
import PropTypes from 'prop-types'
import {endpointKeys} from "../../keys/keys";

export default function EndpointList(props) {
    const hook = useQuery(endpoint_query(props.service))
    const [openEntity, setOpenEntity] = useState(undefined)
    return (
        <Switcher openChild={openEntity ? 0 : 1}>
            <div style={{marginTop: '48px'}}>
                <EndpointForm initialData={openEntity ? openEntity : {}}
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
                onRowClick={row => props.redirect('/management/?page=endpoint&id=' + row.url, '/management/?page=endpoint&id=' + row.url, {})}
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