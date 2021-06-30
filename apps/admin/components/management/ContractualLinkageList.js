import React, {useState} from "react";
import {List} from "sis-aeb-misc";
import Cookies from "universal-cookie/lib";
import handleObjectChange from "../../utils/shared/HandleObjectChange";
import ContractualLinkageForm from "./ContractualLinkageForm";
import Host from "../../utils/shared/Host";
import animations from "../../styles/Animations.module.css";
import PropTypes from "prop-types";
import submitContractualLinkage from "../../utils/submit/SubmitContractualLinkage";

export default function ContractualLinkageList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)

    return (
        <>
            {!open ? null :
                <div className={animations.fadeIn}>
                    <ContractualLinkageForm
                        closeModal={() => {
                            props.setOpen(false)
                            setOpen(false)
                        }}
                        handleSubmit={submitContractualLinkage}
                        handleChange={event => handleObjectChange({
                            event: event,
                            setData: setCurrentEntity
                        })}

                        create={open && currentEntity === null}
                        data={currentEntity}/>
                </div>
            }

            <div style={{display: open ? 'none' : undefined}}>
                <List
                    listKey={'contractual_linkage'}
                    renderElement={element => {
                        return (

                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                width: '100%'
                            }}>

                                <div style={{color: '#333333'}}>
                                    {element.denomination}

                                </div>
                                <div style={{display: 'flex', gap: '16px', alignItems: 'center'}}>
                                    <div>
                                        {element.contract !== null ? element.contract.sei : element.effective_role.denomination}
                                    </div>
                                    <div style={{borderRight: '#e0e0e0 1px solid', width: '1px', height: '20px'}}/>
                                    <div style={{color: '#333333'}}>
                                        {element.description}
                                    </div>
                                    <div style={{
                                        borderRight: '#e0e0e0 1px solid',
                                        width: '1px',
                                        height: '20px',
                                        display: element.collaborator_email !== undefined && element.collaborator_email !== null ? undefined : 'none'
                                    }}/>
                                    <div style={{
                                        color: '#333333',
                                        display: element.collaborator_email !== undefined && element.collaborator_email !== null ? undefined : 'none'
                                    }}>
                                        {element.collaborator_email}
                                    </div>
                                </div>

                            </div>
                        )
                    }} clickEvent={() => {
                    props.setOpen(true)
                    setOpen(true)
                }} createOption={true}
                    fetchToken={(new Cookies()).get('jwt')} fetchUrl={Host() + 'list/occupancy'}
                    setEntity={setCurrentEntity} searchInput={props.searchInput}
                    applySearch={props.notSearched} setAppliedSearch={props.setNotSearched}
                />
            </div>
        </>
    )

}
ContractualLinkageList.propTypes = {
    notSearched: PropTypes.bool,
    setNotSearched: PropTypes.func,
    setOpen: PropTypes.func,
    searchInput: PropTypes.string
}