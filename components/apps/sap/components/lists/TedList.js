import React, {useMemo, useState} from "react";
import {DeleteRounded} from "@material-ui/icons";
import TedForm from "../forms/TedForm";
import tedKeys from "../../keys/tedKeys";
import Switcher from "../../../../core/navigation/switcher/Switcher";
import deleteEntry from "../../utils/requests/delete";

import PropTypes from "prop-types";
import getQuery from "../../queries/getQuery";
import useQuery from "../../../../core/visualization/hooks/useQuery";
import List from "../../../../core/visualization/list/List";

export default function TedList(props) {

    const [open, setOpen] = useState(false)
    const query = useMemo(() => {
        return getQuery('ted', props.ted ? {ted: props.ted.id} : {})
    }, [])
    const hook = useQuery(query)
    const addendumData = useMemo(() => {
        if (props.ted) {
            let value = {...props.ted}
            delete value.id

            return {...value, ted: props.ted?.id}
        } else return undefined
    }, [props.ted])


    return (
        <Switcher openChild={open ? 0 : 1} styles={{width: '100%', height: '100%'}}>

                <TedForm
                    handleClose={() => {
                        setOpen(false)
                        hook.clean()
                    }} asEntity={true}
                    asAddendum={props.ted}
                    data={addendumData}
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
    ted: PropTypes.object
}
