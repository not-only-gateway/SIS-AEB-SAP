import React, {useState} from "react";
import {List} from "sis-aeb-misc";
import Cookies from "universal-cookie/lib";
import handleObjectChange from "../../utils/shared/HandleObjectChange";
import animations from '../../styles/shared/Animations.module.css'
import Host from "../../utils/shared/Host";
import UnitForm from "../management/forms/UnitForm";

export default function UnitList() {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)

    return (
        <>
            {!open ? null :
                <div className={animations.fadeIn}>
                    <UnitForm
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
                <List clickEvent={() => setOpen(true)} createOption={true}
                      fetchToken={(new Cookies()).get('jwt')} fetchUrl={Host() + 'list/unit'}
                      secondaryLabel={'acronym'} primaryLabel={'name'}
                      setEntity={setCurrentEntity}/>
            </div>
        </>
    )

}
