import PropTypes from 'prop-types'
import React, {useState} from "react";
import {DeleteRounded} from "@material-ui/icons";
import TedRequests from "../../utils/requests/TedRequests";
import TedForm from "../forms/TedForm";
import {useQuery} from "sis-aeb-core";
import tedKeys from "../../keys/tedKeys";
import Switcher from "../../../../core/misc/switcher/Switcher";
import getQuery from "../../queries/getQuery";
import List from "../../../../core/list/List";

export default function AddendumList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const hook = useQuery(getQuery('addendum', {
        ted: props.ted.id
    }))


    return (
        <Switcher openChild={open ? 0 : 1}>
            <TedForm
                returnToMain={() => {
                    setOpen(false)
                    hook.clean()
                }} asAddendum={true}
                ted={props.ted}
                create={!(currentEntity !== null && currentEntity !== undefined && currentEntity.id !== undefined)}
                data={currentEntity}/>

            <List

                createOption={true}
                onCreate={() => setOpen(true)}
                hook={hook}
                keys={tedKeys.ted}

                controlButtons={[{
                    label: 'Deletar',
                    icon: <DeleteRounded/>,
                    onClick: (entity) => {
                        TedRequests.deleteAddendum({
                            pk: entity.id
                        })
                    },
                    disabled: false,
                    color: '#ff5555'
                }]} title={'Termos aditivos'}
                />
        </Switcher>
    )
}
AddendumList.propTypes = {
    ted: PropTypes.object
}