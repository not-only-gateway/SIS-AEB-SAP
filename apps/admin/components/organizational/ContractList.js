import React, {useState} from "react";
import {List} from "sis-aeb-misc";
import Cookies from "universal-cookie/lib";
import PropTypes from "prop-types";
import ContractForm from "./ContractForm";
import handleObjectChange from "../../utils/shared/HandleObjectChange";
import submitContract from "../../utils/submit/SubmitContract";
import Host from "../../../public/utils/shared/Host";

export default function ContractList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)

    return (
        <>
            {!open ? null :
                <ContractForm
                    closeModal={() => {
                        setOpen(false)
                        props.setOpen(false)
                    }}
                    handleSubmit={submitContract}
                    handleChange={event => handleObjectChange({
                        event: event,
                        setData: setCurrentEntity
                    })}
                    create={open && (currentEntity === null || currentEntity.id === undefined)}
                    data={currentEntity}
                />
            }

            <div style={{display: open ? 'none' : undefined}}>
                <List
                    listKey={'contract_list'}
                    clickEvent={() => {
                        setOpen(true)
                        props.setOpen(true)
                    }} createOption={true}
                    fetchToken={(new Cookies()).get('jwt')}
                    fetchUrl={Host() + 'list/contract'}
                    renderElement={element => {
                        return (
                            <>
                                {element.sei}
                            </>
                        )
                    }} searchInput={props.searchInput}
                    setEntity={setCurrentEntity}
                    applySearch={props.notSearched} setAppliedSearch={props.setNotSearched}
                />
            </div>
        </>
    )
}

ContractList.propTypes = {
    setOpen: PropTypes.func,
    notSearched: PropTypes.bool,
    setNotSearched: PropTypes.func,
    searchInput: PropTypes.string
}