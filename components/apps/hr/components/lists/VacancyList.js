import React, {useState} from "react";
import {DeleteRounded} from "@material-ui/icons";
import PropTypes from "prop-types";
import useList from "../../../../addons/useList";
import ListTemplate from "../../../../addons/ListTemplate";
import {List, Switcher, useQuery} from 'mfc-core'
import getQuery from "../../queries/getQuery";
import VacancyForm from "../forms/VacancyForm";
import {vacancyKeys} from "../../keys/keys";

export default function VacancyList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const hook = useQuery(getQuery('vacancy'))
    const {
        message,
        setMessage,
        openModal,
        setOpenModal,
        onDecline,
        setCurrentEl,
        onAccept
    } = useList('vacancy', () => hook.clean())

    return (
        <>
            <ListTemplate open={openModal} onAccept={onAccept} onDecline={onDecline} message={message}/>
            <Switcher openChild={open ? 0 : 1} styles={{width: '100%', height: '100%'}}>
                <VacancyForm
                    handleClose={() => {
                        setCurrentEntity(null)
                        setOpen(false)
                        hook.clean()
                    }}
                    create={!currentEntity}
                    data={currentEntity} operation={props.operation}
                />
                <List
                    // createOption={true}
                    // onCreate={() => setOpen(true)}
                    hook={hook}

                    onRowClick={e => {
                        setOpen(true)
                        setCurrentEntity(e)
                    }}
                    keys={vacancyKeys}

                    title={'Comissionados'}
                />
            </Switcher>
        </>
    )
}
VacancyList.propTypes = {
    operation: PropTypes.object
}