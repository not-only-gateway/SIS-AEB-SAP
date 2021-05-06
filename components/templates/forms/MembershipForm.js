import {Button} from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types'
import InputLayout from "../../modules/InputLayout";
import mainStyles from '../../../styles/shared/Main.module.css'
import getComponentLanguage from "../../../utils/shared/GetComponentLanguage";
import Selector from "../../modules/selector/Selector";
import CountryOptions from "../../../packages/options/CountryOptions";
import fetchEntities from "../../../utils/fetch/FetchEntities";
import mapToSelect from "../../../utils/shared/MapToSelect";

export default function MembershipForm(props) {

    const [changed, setChanged] = useState(false)
    const [lang, setLang] = useState(null)
    const [entities, setEntities] = useState([])
    useEffect(() => {
        setLang(getComponentLanguage({locale: props.locale, component: 'membership'}))
        fetchEntities().then(res => {
            if (res !== null)
                setEntities(res)
        })
    }, [])

    function disabled() {
        return (
            props.member.corporate_email === null ||
            props.member.extension === null ||
            props.member.entity === null ||
            props.member.home_office === null ||
            !props.member.corporate_email ||
            !props.member.extension ||
            !props.member.entity ||

            props.member.home_office === undefined ||
            !changed
        )
    }


    if (lang !== null)
        return (
            <div className={mainStyles.displayWarp} style={{justifyContent: 'center', width: '100%'}}>

                <InputLayout inputName={lang.corporateEmail}
                             handleChange={props.handleChange} name={'corporate_email'}
                             inputType={0} disabled={!props.editable} size={'calc(33.333% - 10.666px)'} required={true}
                             initialValue={props.member.corporate_email} key={"membership-1"} setChanged={setChanged}/>
                <InputLayout inputName={lang.extension} handleChange={props.handleChange}
                             numeric={true} maxLength={4}
                             inputType={0} disabled={!props.editable} size={'calc(33.333% - 10.666px)'} required={true}
                             name={'extension'}
                             initialValue={props.member.extension} key={"membership-2"} setChanged={setChanged}/>
                <InputLayout inputName={lang.altPhone} handleChange={props.handleChange}
                             numeric={true} maxLength={4}
                             inputType={0} disabled={!props.editable} size={'calc(33.333% - 10.666px)'} required={false}
                             name={'alternative_phone'}
                             initialValue={props.member.alternative_phone} key={"membership-3"} setChanged={setChanged}/>
                <InputLayout inputName={lang.registration} handleChange={props.handleChange}
                             inputType={0} disabled={!props.editable} size={'calc(50% - 8px'} required={false}
                             name={'registration'}
                             initialValue={props.member.registration} key={"membership-4"} setChanged={setChanged}/>

                <InputLayout inputName={lang.homeOffice} handleChange={props.handleChange}
                             inputType={1} disabled={!props.editable} size={'calc(50% - 8px'} required={true}
                             name={'home_office'} selectFields={lang.options}
                             initialValue={props.member.home_office} key={"membership-5"} setChanged={setChanged}/>

                <Selector required={true}
                          selected={{
                              key: props.member.entity ? props.member.entity.id : null,
                              value: props.member.entity ? props.member.entity.acronym : null
                          }}
                          handleChange={event => props.handleChange({
                              name: 'entity',
                              value: {id: event.key, acronym: event.value}
                          })} setChanged={setChanged}
                          label={lang.entity} key={'membership-6'}
                          data={mapToSelect({data: entities, option: 6})} width={'100%'}/>

                {!props.editable ? null :
                    <Button style={{
                        width: '100%', marginTop: '50px',
                        backgroundColor: disabled() ? 'rgba(0,0,0,0.07)' : '#0095ff',
                        color: disabled() ? '#777777' : 'white',
                        fontWeight: 550,

                    }} disabled={disabled()} variant={'contained'} onClick={() => {
                        props.handleSubmit({
                            data: props.member,
                            personID: props.id,
                            create: props.create
                        }).then(res => {
                            setChanged(!res)
                            if (props.setAccepted !== undefined)
                                props.setAccepted(res)
                        })
                    }}>
                        {props.create ? lang.create : lang.save}
                    </Button>
                }

            </div>
        )
    else
        return null

}

MembershipForm.propTypes = {
    id: PropTypes.number,
    member: PropTypes.object,
    handleChange: PropTypes.func,
    handleSubmit: PropTypes.func,
    editable: PropTypes.bool,
    locale: PropTypes.string,
    setAccepted: PropTypes.func,
    create: PropTypes.bool
}
