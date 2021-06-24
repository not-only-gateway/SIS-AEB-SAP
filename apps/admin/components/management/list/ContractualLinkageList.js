import React, {useState} from "react";
import {List} from "sis-aeb-misc";
import Cookies from "universal-cookie/lib";
import handleObjectChange from "../../../utils/shared/HandleObjectChange";
import LinkageForm from "../forms/LinkageForm";
import Host from "../../../utils/shared/Host";
import animations from "../../../styles/Animations.module.css";
import PropTypes from "prop-types";
import PersonAvatar from "../../shared/PersonAvatar";

export default function ContractualLinkageList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)

    return (
        <>
            {!open ? null :
                <div className={animations.fadeIn}>
                    <LinkageForm
                        close={() => setOpen(false)}
                        // handleSubmit={submitLinkage}
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
                                    {element.role}
                                </div>

                                <div style={{display: 'flex', gap: '16px', alignItems: 'center'}}>
                                    <div>
                                        {element.denomination}
                                    </div>
                                    <div style={{borderRight: '#e0e0e0 1px solid', width: '1px', height: '20px'}}/>
                                    <div style={{color: '#333333'}}>
                                        {element.description}
                                    </div>
                                </div>
                            </div>
                        )
                    }} clickEvent={() => setOpen(true)} createOption={true}
                    fetchToken={(new Cookies()).get('jwt')} fetchUrl={Host() + 'list/linkage/contractual'}
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

    searchInput: PropTypes.string
}