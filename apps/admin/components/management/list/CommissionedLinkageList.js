import React, {useState} from "react";
import List from "../../shared/layout/test3/List";
import Host from "../../../utils/shared/Host";
import Cookies from "universal-cookie/lib";

export default function CommissionedLinkageList() {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)

    return (
        <>
            {!open ? null : null

                //     <EffectiveRoleForm
                //         closeModal={() => setOpen(false)}
                //         // handleSubmit={submitLinkage}
                //         handleChange={event => handleObjectChange({
                //             event: event,
                //             setData: setCurrentEntity
                //         })}
                //         create={open && currentEntity === null}
                //         data={currentEntity}/>

            }
            <div style={{display: open ? 'none' : undefined}}>
                <List clickEvent={() => setOpen(true)} createOption={true}
                      fetchToken={(new Cookies()).get('jwt')} fetchUrl={Host() + 'list/linkage/commissioned'}
                      secondaryLabel={'description'} primaryLabel={'denomination'}
                      setEntity={setCurrentEntity}/>
            </div>
        </>
    )

}
