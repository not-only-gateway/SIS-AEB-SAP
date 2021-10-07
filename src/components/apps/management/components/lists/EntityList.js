import {useQuery} from "sis-aeb-core";
import {endpoint_query, entity_query} from "../../queries/queries";
import List from "../../../../core/list/List";
import {useState} from "react";
import EndpointForm from "../forms/EndpointForm";
import Switcher from "../../../../core/misc/switcher/Switcher";
import PropTypes from 'prop-types'
import {endpointKeys, entityKeys} from "../../keys/keys";
import EntityForm from "../forms/EntityForm";

export default function EntityList(props) {
    const hook = useQuery(entity_query)
    const [openEntity, setOpenEntity] = useState(undefined)
    return (
        <Switcher openChild={openEntity ? 0 : 1}>
            <div style={{marginTop: '48px'}}>
                <EntityForm
                    initialData={openEntity ? openEntity : {}}
                    handleClose={() => {
                        setOpenEntity(undefined)
                        hook.clean()
                    }}
                />
            </div>
            <List
                keys={entityKeys}
                hook={hook} createOption={true}
                onRowClick={row => props.redirect(row.id)}
                onCreate={() => setOpenEntity({})}
                title={'Entidades'}
            />

        </Switcher>
    )
}

EntityList.propTypes = {
    redirect: PropTypes.func
}