import React, {useState} from "react";
import {List} from "sis-aeb-misc";
import Cookies from "universal-cookie/lib";

export default function ContractList() {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)

    return (
        <>
            {!open ? null :
                null
            }

            <div style={{display: open ? 'none' : undefined}}>
                <List clickEvent={() => setOpen(true)} createOption={true}
                      fetchToken={(new Cookies()).get('jwt')} fetchUrl={'list/contract'}
                        primaryLabel={'sei'}
                      setEntity={setCurrentEntity}/>
            </div>
        </>
    )
}
