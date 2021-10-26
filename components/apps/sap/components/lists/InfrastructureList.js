import React, {useState} from "react";

import useQuery from "../../../../core/visualization/hooks/useQuery";
import List from "../../../../core/visualization/list/List";

import {DeleteRounded} from "@material-ui/icons";
import associativeKeys from "../../keys/associativeKeys";
import Switcher from "../../../../core/navigation/switcher/Switcher";
import deleteEntry from "../../utils/requests/delete";
import getQuery from "../../queries/getQuery";
import InfrastructureForm from "../forms/InfrastructureForm";
import PropTypes from "prop-types";

export default function InfrastructureList(props) {

    const [open, setOpen] = useState(false)
    const hook = useQuery(getQuery('infrastructure'))

    return (
        <Switcher openChild={open ? 0 : 1}>
            <div style={{paddingTop: '32px'}}>
                <InfrastructureForm
                    handleClose={() => {
                        setOpen(false)
                        hook.clean()
                    }}
                    asDefault={true}
                    create={true}
                />
            </div>
            <List
                createOption={true}

                controlButtons={[{
                    label: 'Deletar',
                    icon: <DeleteRounded/>,
                    onClick: (entity) => {
                        deleteEntry({
                            suffix: 'infrastructure',
                            pk: entity.id
                        }).then(() => hook.clean())
                    },
                    disabled: false,
                    color: '#ff5555'
                }]}
                onCreate={() => setOpen(true)}
                onRowClick={e => props.redirect('sap/?page=infrastructure&id=' + e.id)}
                hook={hook}
                keys={associativeKeys.infrastructure} labels={['Nome', 'Tipo']}
                title={'Infraestruturas'}
            />
        </Switcher>
    )
}

InfrastructureList.propTypes = {
    redirect: PropTypes.func
}
