import React, {useState} from "react";
import {List} from "sis-aeb-misc";
import Cookies from "universal-cookie/lib";
import PropTypes from "prop-types";

export default function ContractList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)

    return (
        <>
            {!open ? null :
                null
            }

            <div style={{display: open ? 'none' : undefined}}>
                <List
                    listKey={'contract_list'}
                    clickEvent={() => setOpen(true)} createOption={true}
                      fetchToken={(new Cookies()).get('jwt')} fetchUrl={'list/contract'}
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
    notSearched: PropTypes.bool,
    setNotSearched: PropTypes.func,
    searchInput: PropTypes.string
}