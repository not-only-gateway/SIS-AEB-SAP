import React, {useState} from "react";
import {List} from "sis-aeb-misc";
import Cookies from "universal-cookie/lib";
import animations from '../../styles/Animations.module.css'
import Host from "../../utils/shared/Host";
import PropTypes from "prop-types";
import AccessProfileForm from "../management/forms/AccessProfileForm";
import handleObjectChange from "../../utils/shared/HandleObjectChange";

export default function AccessProfileList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)

    return (
        <>
            {!open ? null :
                <div className={animations.fadeIn}>
                    <AccessProfileForm
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
                </div>
            }
            <div style={{display: open ? 'none' : undefined}}>
                <List
                    listKey={'access_profile'}
                    clickEvent={() => {
                        setOpen(true)
                        props.setOpen(true)
                    }} createOption={true}
                    fetchToken={(new Cookies()).get('jwt')} fetchUrl={Host() + 'list/access'}
                    renderElement={element => {
                        return (
                            <>
                                {element.denomination}
                            </>
                        )
                    }}
                    setEntity={setCurrentEntity} applySearch={props.notSearched} setAppliedSearch={props.setNotSearched}/>
            </div>
        </>
    )

}
AccessProfileList.propTypes = {
    setOpen: PropTypes.func,
    notSearched: PropTypes.bool,
    setNotSearched: PropTypes.func,

    redirect: PropTypes.func,
    searchInput: PropTypes.string
}