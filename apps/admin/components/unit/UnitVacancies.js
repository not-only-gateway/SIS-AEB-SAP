import React, {useEffect, useState} from "react";
import StructuralRequests from "../../utils/fetch/StructuralRequests";
import PropTypes from 'prop-types'
import {List} from "sis-aeb-misc";
import Cookies from "universal-cookie/lib";
import Host from "../../utils/shared/Host";
import animations from "../../styles/Animations.module.css";
import ContractualLinkageForm from "../management/ContractualLinkageForm";
import submitContractualLinkage from "../../utils/submit/SubmitContractualLinkage";
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
                        create={open && currentEntity === null}
                        data={currentEntity}
                    />
                </div>
            }

            <div style={{display: open ? 'none' : undefined}}>
                <List
                    renderElement={entity => {
                        if (entity !== null && entity !== undefined)
                            return (
                                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                    <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
                                        {entity.unit.acronym}
                                        {entity.role.denomination}
                                    </div>
                                    <div>

                                    </div>
                                </div>
                            )
                        else
                            return null
                    }}
                    applySearch={props.applySearch} searchInput={props.search}
                    fetchToken={(new Cookies()).get('jwt')}
                    fetchUrl={Host() + 'list/commissioned/vacancies/' + props.id}
                    setEntity={entity => setCurrentEntity(entity)} setAppliedSearch={props.setApplySearch}
                    scrollableElement={'scrollableDiv'} listKey={'vacancies'}
                    createOption={true}
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