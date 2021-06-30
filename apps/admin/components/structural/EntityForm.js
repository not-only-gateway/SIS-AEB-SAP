import React, {useState} from "react";
import PropTypes from 'prop-types'
import {DropDownField, FormLayout, TextField} from "sis-aeb-inputs";
import {Alert, Selector} from "sis-aeb-misc";
import UnitFormPT from "../../packages/locales/unit/UnitFormPT";
import Host from "../../utils/shared/Host";
import Cookies from "universal-cookie/lib";
import submitUnit from "../../utils/submit/SubmitUnit";
import EntityFormPT from "../../packages/locales/structural/EntityFormPT";
import submitEntity from "../../utils/submit/SubmitEntity";


export default function EntityForm(props) {

    const [changed, setChanged] = useState(false)
    const lang = EntityFormPT
    const [status, setStatus] = useState({
        type: undefined, message: undefined
    })

    return (
        <>
            <Alert
                type={status.type} render={status.type !== undefined} rootElementID={'root'}
                handleClose={() => setStatus({type: undefined, message: undefined})} message={status.message}
            />

            <FormLayout
                create={props.create}
                formLabel={lang.title}
                dependencies={{
                    fields: [
                        {name: 'acronym', type: 'string'},
                        {name: 'denomination', type: 'string'},
                        {name: 'corporate_name', type: 'bool'},
                        {name: 'cnpj', type: 'string'},
                    ],
                    changed: changed,
                    entity: props.data
                }} returnButton={true}
                handleSubmit={() =>
                    submitEntity({
                        pk: props.data.id,
                        data: props.data,
                        setStatus: setStatus,
                        create: props.data.id === undefined || props.data.id === null
                    }).then(res => {
                        setChanged(!res)
                    })}
                handleClose={() => props.returnToMain()}
                forms={[{
                    child: (
                        <>
                            <TextField

                                placeholder={lang.acronym} label={lang.acronym}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'acronym', value: event.target.value})
                                }} locale={props.locale} value={props.data === null ? null : props.data.acronym}
                                required={true}
                                width={'calc(50% - 16px)'}
                            />

                            <TextField

                                placeholder={lang.denomination} label={lang.denomination}
                                handleChange={event => {
                                    setChanged(true)
                                    props.handleChange({name: 'denomination', value: event.target.value})
                                }} locale={props.locale} value={props.data === null ? null : props.data.denomination}
                                required={true}
                                width={'calc(50% - 16px)'}
                            />


                        </>
                    )
                },
                    {
                        title: lang.information,
                        child: (
                            <>


                                <TextField

                                    placeholder={lang.corporateName}
                                    label={lang.corporateName}
                                    handleChange={event => {
                                        setChanged(true)
                                        props.handleChange({name: 'corporate_name', value: event.target.value})
                                    }} locale={props.locale}
                                    value={props.data === null ? null : props.data.corporate_name}
                                    required={true} width={'calc(50% - 16px)'}/>
                                <TextField

                                    placeholder={'CNPJ'}
                                    label={'CNPJ'}
                                    maxLength={14}
                                    handleChange={event => {
                                        setChanged(true)
                                        props.handleChange({name: 'cnpj', value: event.target.value})
                                    }} locale={props.locale} value={props.data === null ? null : props.data.cnpj}
                                    required={true} width={'calc(50% - 16px)'}/>
                            </>
                        )
                    },

                ]}/>
        </>
    )

}

EntityForm.propTypes = {
    id: PropTypes.number,
    data: PropTypes.object,
    handleChange: PropTypes.func,
    returnToMain: PropTypes.func,
    create: PropTypes.bool,
}
