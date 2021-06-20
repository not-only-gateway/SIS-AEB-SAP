import React, {useState} from "react";
import List from "../../shared/layout/test3/List";
import Cookies from "universal-cookie/lib";
import handleObjectChange from "../../../utils/shared/HandleObjectChange";
import LinkageForm from "../forms/LinkageForm";
import Host from "../../../utils/shared/Host";
import animations from "../../../styles/shared/Animations.module.css";

export default function ContractualLinkageList() {
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
                <List clickEvent={() => setOpen(true)} createOption={true}
                      fetchToken={(new Cookies()).get('jwt')} fetchUrl={Host() + 'list/linkage/contractual'}
                      secondaryLabel={'description'} primaryLabel={'denomination'}
                      setEntity={setCurrentEntity}/>
            </div>
        </>
    )

}
