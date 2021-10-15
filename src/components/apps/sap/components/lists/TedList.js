import React, {useState} from "react";
import {useQuery} from "sis-aeb-core";
import {DeleteRounded} from "@material-ui/icons";
import TedForm from "../forms/TedForm";
import tedKeys from "../../keys/tedKeys";
import Switcher from "../../../../core/misc/switcher/Switcher";
import deleteEntry from "../../../management/utils/delete";
import List from "../../../../core/list/List";
import PropTypes from "prop-types";
import getQuery from "../../queries/getQuery";

export default function TedList(props) {

    const [open, setOpen] = useState(false)
    const hook = useQuery(getQuery('ted', props.ted ? {ted: props.ted.id} : {}))

    return (
        <Switcher openChild={open ? 0 : 1}>
            <TedForm
                returnToMain={() => {
                    setOpen(false)
                    hook.clean()
                }} asEntity={true}
                asDefault={true}
                create={true}
            />

            <List
                createOption={true}
                onCreate={() => setOpen(true)}
                onRowClick={e => props.redirect(`/sap?page=ted&id=${e.id}`)}
                controlButtons={[{
                    label: 'Deletar',
                    icon: <DeleteRounded/>,
                    onClick: (entity) => {
                        deleteEntry({
                            suffix: 'ted',
                            pk: entity.id
                        }).then(() => hook.clean())
                    },
                    disabled: false,
                    color: '#ff5555'
                }]}
                hook={hook}
                keys={tedKeys.ted}
                title={props.ted ? 'Instrumentos de celebração (aditivos)' : 'Instrumentos de celebração'}
            />
        </Switcher>
    )
}

TedList.propTypes = {
    redirect: PropTypes.func,
    ted: PropTypes.func
}
