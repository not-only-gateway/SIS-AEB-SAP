import React, {useState} from "react";
import PropTypes from 'prop-types'
import {TextField} from "sis-aeb-inputs";
import {Alert} from "sis-aeb-misc";
import Host from "../../utils/shared/Host";
import Cookies from "universal-cookie/lib";
import EntityLayout from "../shared/misc/form/EntityLayout";
import Selector from "../shared/misc/selector/Selector";
import WorkPlanPT from "../../packages/locales/WorkPlanPT";
import submitWorkPlan from "../../utils/submit/SubmitWorkPlan";


export default function WorkPlanForm(props) {

    const [changed, setChanged] = useState(false)
    const lang = WorkPlanPT
    const [status, setStatus] = useState({
        type: undefined, message: undefined
    })

    return (
        <>
            <Alert
                type={status.type} render={status.type !== undefined} rootElementID={'root'}
                handleClose={() => setStatus({type: undefined, message: undefined})} message={status.message}
            />
            <EntityLayout
                rootElementID={'root'} entity={props.data}
                create={props.create} label={lang.title}
                dependencies={{
                    fields: [
                        {name: 'responsible', type: 'string'},
                        {name: 'object', type: 'string'},
                        {name: 'additive', type: 'number'},
                        {name: 'ted', type: 'number'}
                    ],
                    changed: changed
                }} noHeader={!props.create}
                returnButton={props.create}
                handleSubmit={() =>
                    submitWorkPlan({
                        pk: props.id,
                        data: props.data,
                        setStatus: setStatus,
                        create: props.create
                    }).then(res => {
                        if(res !== null && props.create)
                            props.redirect(res)

                        if(!props.create && res)
                            setChanged(false)
                    })}
                handleClose={() => props.returnToMain()}
                forms={[{
                    child: (
                        <>
                            <TextField

                                placeholder={lang.responsible} label={lang.responsible}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'responsible', value: event.target.value})
                                }} locale={props.locale} value={props.data === null ? null : props.data.responsible}
                                required={true}
                                width={'calc(50% - 16px)'}/>


                            <TextField

                                placeholder={lang.object} label={lang.object}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'object', value: event.target.value})
                                }} locale={props.locale} value={props.data === null ? null : props.data.object}
                                required={true}
                                width={'calc(50% - 16px)'}/>

                            <TextField
                                type={'number'}
                                placeholder={lang.additive} label={lang.additive}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'additive', value: event.target.value})
                                }} locale={props.locale} value={props.data === null ? null : props.data.additive}
                                required={true}
                                width={'calc(50% - 16px)'}/>
                            <TextField
                                type={'number'}
                                placeholder={lang.apostille} label={lang.apostille}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'apostille', value: event.target.value})
                                }} locale={props.locale} value={props.data === null ? null : props.data.apostille}
                                required={false}
                                width={'calc(50% - 16px)'}/>
                            <Selector
                                getEntityKey={entity => {
                                    if (entity !== null && entity !== undefined)
                                        return entity.id
                                    else return -1
                                }} searchFieldName={'search_input'}
                                handleChange={entity => {
                                    setChanged(true)
                                    props.handleChange({name: 'ted', value: entity})
                                }} label={lang.ted}
                                setChanged={setChanged} selected={props.data === null ? null : props.data.ted}
                                disabled={false} width={'100%'} required={true}
                                renderEntity={entity => {
                                    if (entity !== undefined && entity !== null)
                                        return (
                                            <div style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                width: '100%'
                                            }}>

                                                <div style={{display: 'flex', gap: '16px', alignItems: 'center'}}>
                                                    <div>
                                                        {entity.number}
                                                    </div>
                                                    <div style={{borderRight: '#e0e0e0 1px solid', width: '1px', height: '20px'}}/>
                                                    <div>
                                                        {entity.responsible}
                                                    </div>
                                                </div>
                                                <div>
                                                    {entity.process}
                                                </div>

                                            </div>
                                        )
                                    else
                                        return null
                                }} fetchUrl={Host() + 'list/ted'} fetchToken={(new Cookies()).get('jwt')}
                                elementRootID={'root'} selectorKey={'ted-selector'}
                            />
                        </>

                    )
                }]}/>
        </>
    )

}

WorkPlanForm.propTypes = {
    id: PropTypes.number,
    data: PropTypes.object,
    handleChange: PropTypes.func,
    returnToMain: PropTypes.func,
    create: PropTypes.bool,
}
