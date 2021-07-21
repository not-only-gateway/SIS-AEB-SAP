import PropTypes from 'prop-types'
import React, {useState} from "react";
import animations from "../../styles/Animations.module.css";
import ProjectForm from "../index/ProjectForm";
import handleObjectChange from "../../utils/shared/HandleObjectChange";
import List from "../shared/misc/list/List";
import Cookies from "universal-cookie/lib";
import Host from "../../utils/shared/Host";
import ObjectiveForm from "./ObjectiveForm";
import RiskForm from "./RiskForm";

export default function Risks(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)

    return (
        <>
            {!open ? null :
                <div className={animations.fadeIn}>
                    <RiskForm
                        returnToMain={() => {
                            setOpen(false)
                        }}
                        handleChange={event => handleObjectChange({
                            event: event,
                            setData: setCurrentEntity
                        })}
                        create={!(currentEntity !== null && currentEntity !== undefined && currentEntity.id !== undefined)}
                        data={currentEntity} project={props.project}/>
                </div>
            }
            <div style={{display: open ? 'none' : undefined}}>
                <List
                    listKey={'project'}
                    createOption={true}
                    fetchToken={(new Cookies()).get('jwt')} fetchUrl={Host() + 'list/risk'}
                    renderElement={element => {
                        return (


                            <div style={{display: 'flex', gap: '16px', alignItems: 'center'}}>
                                <div>
                                    {element.description}
                                </div>
                                <div style={{borderRight: '#e0e0e0 1px solid', width: '1px', height: '20px'}}/>
                                <div>
                                    {element.analysis}
                                </div>
                            </div>
                        )
                    }}
                    clickEvent={() => setOpen(true)}
                    setEntity={entity => {
                        setCurrentEntity(entity)
                    }} searchFieldName={'search_input'} title={'Riscos'} scrollableElement={'scrollableDiv'}
                    fetchSize={15}
                    fetchParams={{
                        project: props.project.id
                    }}
                    applySearch={props.notSearched}
                    setAppliedSearch={props.setNotSearched}/>
            </div>
        </>
    )
}
Risks.propTypes = {
    project: PropTypes.object
}