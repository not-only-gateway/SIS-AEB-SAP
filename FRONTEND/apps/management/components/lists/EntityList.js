import {entity_query} from "../../queries/queries";

import {useState} from "react";

import {List, Switcher, useQuery} from "mfc-core";
import PropTypes from 'prop-types'
import {entityKeys} from "../../keys/keys";
import EntityForm from "../forms/EntityForm";
import {DeleteRounded} from "@material-ui/icons";
import deleteEntry from "../../utils/delete";

export default function EntityList(props) {
    const hook = useQuery(entity_query)
    const [openEntity, setOpenEntity] = useState(undefined)
    return (
        <Switcher openChild={openEntity ? 0 : 1} styles={{width: '100%', height: '100%'}}>
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
                controlButtons={[
                    {
                        label: 'Deletar',
                        icon: <DeleteRounded/>,
                        onClick: data => {
                            deleteEntry({
                                prefix: 'gateway',
                                suffix: 'entity',
                                pk: data.id,
                            }).then(() => hook.clean())
                        }
                    }
                ]}
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