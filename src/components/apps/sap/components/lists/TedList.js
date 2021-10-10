import React, {useState} from "react";
import {useQuery} from "sis-aeb-core";
import {DeleteRounded} from "@material-ui/icons";
import TedForm from "../forms/TedForm";
import TedRequests from "../../utils/requests/TedRequests";
import tedKeys from "../../keys/tedKeys";
import Switcher from "../../../../core/misc/switcher/Switcher";
import List from "../../../../core/list/List";
import {ted_query} from "../../queries/ted";
import PropTypes from "prop-types";

export default function TedList(props) {

    const [open, setOpen] = useState(false)
    const hook = useQuery(ted_query())

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
                onRowClick={e => props.redirect(e.id)}
                controlButtons={[{
                    label: 'Deletar',
                    icon: <DeleteRounded/>,
                    onClick: (entity) => {
                        TedRequests.deleteTed({
                            pk: entity.id
                        })
                    },
                    disabled: false,
                    color: '#ff5555'
                }]}
                hook={hook}
                keys={tedKeys.ted}
                title={'Instrumentos de celebração'}
            />
        </Switcher>
    )
}

TedList.propTypes={
    redirect: PropTypes.func
}
