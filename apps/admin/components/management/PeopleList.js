import React, {useState} from "react";
import {List} from "sis-aeb-misc";
import Cookies from "universal-cookie/lib";
import Host from "../../utils/shared/Host";
import PropTypes from "prop-types";
import PersonAvatar from "../shared/PersonAvatar";
import handleObjectChange from "../../utils/shared/HandleObjectChange";
import BaseForm from "../person/forms/BaseForm";

export default function PeopleList(props) {

    const [currentEntity, setCurrentEntity] = useState({})
    const [open, setOpen] = useState(false)

    return (
        <>
            {!open ? null :
                <BaseForm
                    returnToMain={() => {
                        setOpen(false)
                        props.setOpen(false)
                    }}
                    redirect={props.redirect}
                    handleChange={event => handleObjectChange({
                        event: event,
                        setData: setCurrentEntity
                    })}
                    create={open && currentEntity === null}
                    data={currentEntity}/>

            }
            <div style={{display: open ? 'none' : undefined}}>
                <List
                    listKey={'people'} scrollableElement={'scrollableDiv'}
                    clickEvent={() => null} createOption={true}
                    fetchToken={(new Cookies()).get('jwt')} fetchUrl={Host() + 'list/person'}
                    renderElement={element => {
                        return (
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                width: '100%'
                            }}>
                                <div style={{display: 'flex', gap: '8px', alignItems: 'center'}}>
                                    <PersonAvatar variant={'circular'} image={element.image}/>
                                    <div>
                                        {element.name}
                                    </div>
                                    <div style={{borderRight: '#e0e0e0 1px solid', width: '1px', height: '20px',display: element.corporate_email !== null && element.corporate_email ? undefined : 'none'}}/>
                                    <div>
                                        {element.corporate_email}
                                    </div>
                                    <div style={{borderRight: '#e0e0e0 1px solid', width: '1px', height: '20px', display: element.extension !== null && element.extension ? undefined : 'none'}}/>
                                    <div>
                                        {element.extension}
                                    </div>
                                </div>
                                <div style={{
                                    display: (element.main_commissioned_linkage !== null && element.main_commissioned_linkage) || element.occupancy !== null && element.occupancy ? 'flex' : 'none',
                                    gap: '8px',
                                    alignItems: 'center'
                                }}>
                                    <div style={{color: '#333333'}}>
                                        {element.main_commissioned_linkage !== null && element.main_commissioned_linkage ? element.main_commissioned_linkage.unit_role.role.denomination : (element.occupancy === null || !element.occupancy ? null : element.occupancy.contract === null ? element.occupancy.effective_role.denomination : element.occupancy.contract.sei)}
                                    </div>
                                    <div style={{borderRight: '#e0e0e0 1px solid', width: '1px', height: '20px'}}/>
                                    <div style={{fontSize: '.9rem'}}>
                                        {element.main_commissioned_linkage !== null && element.main_commissioned_linkage ? element.main_commissioned_linkage.unit_role.unit.acronym : (element.occupancy === null || !element.occupancy ? null : element.occupancy.unit.acronym)}
                                    </div>
                                </div>
                            </div>
                        )
                    }} applySearch={props.notSearched} setAppliedSearch={props.setNotSearched}
                    searchInput={props.searchInput}
                    setEntity={entity => {
                        if (entity !== null) {
                            props.redirect(entity.id)
                        } else {
                            props.setOpen(true)
                            setOpen(true)
                        }
                    }}/>
            </div>
        </>
    )
}
PeopleList.propTypes = {
    notSearched: PropTypes.bool,
    setNotSearched: PropTypes.func,
    setOpen: PropTypes.func,
    redirect: PropTypes.func,
    searchInput: PropTypes.string
}