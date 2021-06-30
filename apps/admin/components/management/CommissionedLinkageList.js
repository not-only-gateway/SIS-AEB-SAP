import React, {useState} from "react";
import {List} from "sis-aeb-misc";
import Host from "../../utils/shared/Host";
import Cookies from "universal-cookie/lib";
import PropTypes from "prop-types";
import CommissionedLinkageForm from "./CommissionedLinkageForm";
import handleObjectChange from "../../utils/shared/HandleObjectChange";


export default function CommissionedLinkageList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)

    return (
        <>
            {!open ? null :
                <CommissionedLinkageForm
                    closeModal={() => {
                        setOpen(false)
                        props.setOpen(false)
                    }}
                    // handleSubmit={submitLinkage}
                    handleChange={event => handleObjectChange({
                        event: event,
                        setData: setCurrentEntity
                    })}
                    create={open && currentEntity === null}
                    data={currentEntity}/>

            }
            <div style={{display: open ? 'none' : undefined}}>
                <List listKey={'commissioned_linkage'} clickEvent={() => {
                    setOpen(true)
                    props.setOpen(true)
                }} createOption={true}
                      fetchToken={(new Cookies()).get('jwt')} fetchUrl={Host() + 'list/linkage/commissioned'}
                      renderElement={entity => {
                          return (
                              <div style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                  width: '100%'
                              }}>
                                  <div>
                                      {entity.unit_role.role.denomination}
                                  </div>
                                  <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
                                      {entity.unit_role.unit.name}
                                      <div style={{borderRight: '#e0e0e0 1px solid', width: '1px', height: '20px'}}/>
                                      {entity.unit_role.unit.acronym}
                                  </div>
                              </div>
                          )
                      }} applySearch={props.notSearched} setAppliedSearch={props.setNotSearched}
                      setEntity={setCurrentEntity} searchInput={props.searchInput}/>
            </div>
        </>
    )

}
CommissionedLinkageList.propTypes = {
    notSearched: PropTypes.bool,
    setNotSearched: PropTypes.func,
    setOpen: PropTypes.func,
    searchInput: PropTypes.string
}