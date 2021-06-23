import React, {useState} from "react";
import List from "../../../components/shared/list/List";
import Cookies from "universal-cookie/lib";
import handleObjectChange from "../../../utils/shared/HandleObjectChange";
import LinkageForm from "../forms/LinkageForm";
import Host from "../../../utils/shared/Host";
import animations from "../../../styles/Animations.module.css";
import PropTypes from "prop-types";

export default function ContractualLinkageList(props) {
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
                <List
                    listKey={'contractual_linkage'}
                    renderElement={element => {
                        return (
                            <div style={{display: 'flex', gap: '16px'}}>
                                <div>
                                    {element.denomination}
                                </div>
                                <div>
                                    {element.description}
                                </div>
                            </div>
                        )
                    }} clickEvent={() => setOpen(true)} createOption={true}
                    fetchToken={(new Cookies()).get('jwt')} fetchUrl={Host() + 'list/linkage/contractual'}
                    setEntity={setCurrentEntity} searchInput={props.searchInput}
                    applySearch={props.notSearched} setAppliedSearch={props.setNotSearched}
                />
            </div>
        </>
    )

}
ContractualLinkageList.propTypes = {
    notSearched: PropTypes.bool,
    setNotSearched: PropTypes.func,

    searchInput: PropTypes.string
}