import React, {useState} from "react";
import PropTypes from 'prop-types'
import {List} from "sis-aeb-misc";
import Cookies from "universal-cookie/lib";
import Host from "../../utils/shared/Host";
import animations from "../../styles/Animations.module.css";
import handleObjectChange from "../../utils/shared/HandleObjectChange";
import VacancyForm from "./VacancyForm";

export default function UnitVacancies(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)

    return (
        <>
            {!open ? null :
                <div className={animations.fadeIn}>
                    <VacancyForm
                        closeModal={() => {
                            props.setOpen(false)
                            setOpen(false)
                        }}
                        handleChange={event => handleObjectChange({
                            event: event,
                            setData: setCurrentEntity
                        })} returnToMain={() => setOpen(false)}
                        unit={props.unit}
                        create={true}
                        data={currentEntity}
                    />
                </div>
            }

            <div style={{display: open ? 'none' : undefined}}>
                <List
                    renderElement={entity => {
                        if (entity !== null && entity !== undefined)
                            return (
                                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
                                    <div>
                                        {entity.role.denomination}
                                    </div>
                                    <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
                                        {entity.unit.name}
                                        <div style={{borderRight: '#e0e0e0 1px solid', width: '1px', height: '20px'}}/>
                                        {entity.unit.acronym}
                                    </div>
                                </div>
                            )
                        else
                            return null
                    }}
                    applySearch={props.applySearch} searchInput={props.search}
                    fetchToken={(new Cookies()).get('jwt')}
                    fetchUrl={Host() + 'list/commissioned/vacancies/' + props.id}
                    setEntity={entity => null} setAppliedSearch={props.setApplySearch}
                    scrollableElement={'scrollableDiv'} listKey={'vacancies'}
                    createOption={true} onlyCreate={true}
                    clickEvent={() => {
                        setOpen(true)
                        props.setOpen(true)
                    }}/>
            </div>
        </>
    )
}
UnitVacancies.propTypes = {
    unit: PropTypes.object,
    id: PropTypes.number,
    applySearch: PropTypes.bool,
    search: PropTypes.string,
    setApplySearch: PropTypes.func,
    setOpen: PropTypes.func
}