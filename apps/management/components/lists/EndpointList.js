import {useMemo, useState} from "react";
import EndpointForm from "../forms/EndpointForm";

import PropTypes from 'prop-types'
import {endpointKeys} from "../../keys/keys";
import {DeleteRounded} from "@material-ui/icons";
import deleteEntry from "../../utils/delete";

import {List, Switcher, useQuery} from "mfc-core";
import getQuery from "../../utils/getQuery";


export default function EndpointList(props) {
    const service = useMemo(() => {
        if (props.service)
            return {service: props.service}
        else
            return undefined

    }, [props])
    const hook = useQuery(getQuery('endpoint', service))
    const [openEntity, setOpenEntity] = useState(undefined)

    return (
        <Switcher openChild={openEntity ? 0 : 1} styles={{width: '100%', height: '100%'}}>
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
                onRowClick={row => props.redirect('/management/?page=endpoint&id=' + row.url)}
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