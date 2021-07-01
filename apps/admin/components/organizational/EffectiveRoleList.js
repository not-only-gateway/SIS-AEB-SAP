import React, {useState} from "react";
import {List} from "sis-aeb-misc";
import Cookies from "universal-cookie/lib";
import handleObjectChange from "../../utils/shared/HandleObjectChange";
import animations from '../../styles/Animations.module.css'
import EffectiveRoleForm from "./EffectiveRoleForm";
import Host from "../../utils/shared/Host";
import PropTypes from "prop-types";
import submitEffectiveRole from "../../utils/submit/SubmitEffectiveRole";

export default function EffectiveRoleList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)

    return (
        <>
            {!open ? null :
                <div className={animations.fadeIn}>
                    <EffectiveRoleForm
                        closeModal={() => {
                            props.setOpen(false)
                            setOpen(false)
                        }}
                        handleSubmit={submitEffectiveRole}
                        handleChange={event => handleObjectChange({
                            event: event,
                            setData: setCurrentEntity
                        })}
                        create={open && (currentEntity === null || currentEntity.id === undefined)}
                        data={currentEntity}/>
                </div>
            }
            <div style={{display: open ? 'none' : undefined}}>
                <List
                    listKey={'effective_role'}
                    clickEvent={() => {
                        props.setOpen(true)
                        setOpen(true)
                    }} createOption={true}
                    fetchToken={(new Cookies()).get('jwt')} fetchUrl={Host() + 'list/role_effective'}
                    renderElement={element => {
                        return (

                            <div style={{display: 'flex', gap: '16px', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
                                <div>
                                    {element.denomination}
                                </div>

                                <div style={{color: '#333333'}}>
                                    {element.hierarchy_level}
                                </div>
                            </div>
                        )
                    }} searchInput={props.searchInput}
                    setEntity={setCurrentEntity}
                    applySearch={props.notSearched} setAppliedSearch={props.setNotSearched}
                />
            </div>
        </>
    )
}

EffectiveRoleList.propTypes = {
    setOpen: PropTypes.func,
    notSearched: PropTypes.bool,
    setNotSearched: PropTypes.func,
    searchInput: PropTypes.string
}
