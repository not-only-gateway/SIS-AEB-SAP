import PropTypes from 'prop-types'
import React, {useState} from "react";

import {List, useQuery} from 'mfc-core'
import getQuery from "../../queries/getQuery";
import useList from "../../../../addons/useList";
import Host from "../../utils/Host";
import ListTemplate from "../../../../addons/ListTemplate";
import {personKeys} from "../../keys/keys";

export default function PersonList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const hook = useQuery(getQuery('collaborator'))
    const {
        message,
        setMessage,
        openModal,
        setOpenModal,
        onDecline,
        setCurrentEl,
        onAccept
    } = useList(undefined, () => hook.clean(), Host() + 'collaborator')


    return (
        <>
            <ListTemplate open={openModal} onAccept={onAccept} onDecline={onDecline} message={message}/>
            {/*<Switcher openChild={open ? 0 : 1} styles={{width: '100%', height: '100%'}}>*/}

            <List
                // createOption={true}
                hook={hook}
                keys={personKeys}
                // onCreate={() => {
                //     setOpen(true)
                // }}
                onRowClick={e => {
                    setOpen(true)
                    setCurrentEntity(e)
                }}
                title={'Etapas / Atividades'}

            />
            {/*</Switcher></>*/}
        </>
    )
}
PersonList.propTypes = {
    workPlan: PropTypes.object
}