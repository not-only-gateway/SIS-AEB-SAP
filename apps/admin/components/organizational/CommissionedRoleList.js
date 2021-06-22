import React, {useState} from "react";
import {List} from "sis-aeb-misc";
import Cookies from "universal-cookie/lib";
import handleObjectChange from "../../utils/shared/HandleObjectChange";
import animations from '../../styles/shared/Animations.module.css'
import CommissionedRoleForm from "../management/forms/CommissionedRoleForm";
import Host from "../../utils/shared/Host";
import PropTypes from "prop-types";

export default function CommissionedRoleList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)

    return (
        <>
            {!open ? null :
                <div className={animations.fadeIn}>
                    <CommissionedRoleForm
                        closeModal={() => setOpen(false)}
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
                    listKey={'commissioned_role'}
                    clickEvent={() => setOpen(true)} createOption={true}
                      fetchToken={(new Cookies()).get('jwt')} fetchUrl={Host() + 'list/role_commissioned'}
                      renderElement={element => {
                          return (
                              <div style={{display: 'flex', gap: '16px'}}>
                                  {element.denomination}
                              </div>
                          )
                      }} searchInput={props.searchInput}
                      setEntity={setCurrentEntity}
                      searched={!props.notSearched} setNotSearched={props.setNotSearched}
                />
            </div>
        </>
    )
}

CommissionedRoleList.propTypes = {
    notSearched: PropTypes.bool,
    setNotSearched: PropTypes.func,

    searchInput: PropTypes.string
}
