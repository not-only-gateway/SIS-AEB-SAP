import React, {useState} from "react";
import Cookies from "universal-cookie/lib";
import Host from "../../utils/shared/Host";
import PropTypes from "prop-types";
import animations from "../../styles/Animations.module.css";
import handleObjectChange from "../../utils/shared/HandleObjectChange";
import List from "../shared/misc/list/List";
import WorkPlanForm from "./WorkPlanForm";

export default function WorkPlanList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)

    return (
        <>
            {!open ? null :
                <div className={animations.fadeIn} style={{marginTop: '32px', marginBottom: '32px'}}>
                    <WorkPlanForm
                        returnToMain={() => {
                            setOpen(false)
                            props.setOpen(false)
                        }} redirect={props.redirect}
                        handleChange={event => handleObjectChange({
                            event: event,
                            setData: setCurrentEntity
                        })}
                        create={true}
                        data={currentEntity}/>
                </div>
            }
            <div style={{display: open ? 'none' : undefined}}>
                <List
                    listKey={'project'}
                    createOption={true}
                    fetchToken={(new Cookies()).get('jwt')} fetchUrl={Host() + 'list/work_plan'}
                    renderElement={element => {
                        return (
                            <div style={{display: 'flex',justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>

                                <div style={{display: 'flex', gap: '16px', alignItems: 'center'}}>
                                    <div>
                                        {element.object}
                                    </div>
                                    <div style={{borderRight: '#e0e0e0 1px solid', width: '1px', height: '20px'}}/>
                                    <div>
                                        {element.responsible}
                                    </div>
                                </div>
                                <div>
                                    {element.additive}
                                </div>

                            </div>
                        )
                    }}
                    clickEvent={() => null}
                    setEntity={entity => {
                        if (entity === null || entity === undefined) {
                            setOpen(true)
                            props.setOpen(true)
                        } else
                            props.redirect(entity.id)
                    }} searchFieldName={'search_input'} title={'Planos de trabalho'} scrollableElement={'scrollableDiv'}
                    fetchSize={15}
                    />
            </div>
        </>
    )
}
WorkPlanList.propTypes = {
    redirect: PropTypes.func
}