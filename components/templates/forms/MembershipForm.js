import {Button} from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types'
import InputLayout from "../../modules/InputLayout";
import getComponentLanguage from "../../../utils/shared/GetComponentLanguage";
import Selector from "../../modules/selector/Selector";
import fetchEntities from "../../../utils/fetch/FetchEntities";
import mapToSelect from "../../../utils/shared/MapToSelect";
import fetchCollaborations from "../../../utils/fetch/FetchCollaborations";
import fetchActiveCollaborations from "../../../utils/fetch/fetchActiveCollaborations";
import TextField from "../../modules/TextField";

export default function MembershipForm(props) {

    const [changed, setChanged] = useState(false)
    const [lang, setLang] = useState(null)
    const [entities, setEntities] = useState([])
    const [collaborations, setCollaborations] = useState([])
    useEffect(() => {
        setLang(getComponentLanguage({locale: props.locale, component: 'membership'}))
        fetchEntities().then(res => {
            if (res !== null)
                setEntities(res)
        })
        if (!props.create)
            fetchActiveCollaborations(props.id).then(res => setCollaborations(res))
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
            <div style={{
                display: 'inline-flex',
                flexFlow: 'row wrap',
                gap: '32px',
                justifyContent: 'center',
                width: '75%',
            }}>
                <TextField placeholder={lang.registration} label={lang.registration} handleChange={event => {
                    setChanged(true)
                    props.handleChange({name: 'registration', value: event.target.value})
                }} locale={props.locale} value={props.member.registration} required={false}
                           width={'100%'} maxLength={undefined}/>

                <h4 style={{width: '100%', marginTop: 'auto', marginBottom: 'auto'}}>
                    {lang.contact}
                </h4>

                <TextField placeholder={lang.corporateEmail} label={lang.corporateEmail} handleChange={event => {
                    setChanged(true)
                    props.handleChange({name: 'corporate_email', value: event.target.value})
                }} locale={props.locale} value={props.member.corporate_email} required={true}
                           width={'calc(33.333% - 21.35px)'}
                           maxLength={undefined}/>

                <TextField placeholder={lang.extension} label={lang.extension} handleChange={event => {
                    setChanged(true)
                    props.handleChange({name: 'extension', value: event.target.value})
                }} locale={props.locale} value={props.member.extension} required={true}
                           width={'calc(33.333% - 21.35px)'}
                           maxLength={undefined} phoneMask={true}/>

                <TextField placeholder={lang.altPhone} label={lang.altPhone} handleChange={event => {
                    setChanged(true)
                    props.handleChange({name: 'alternative_phone', value: event.target.value})
                }} locale={props.locale} value={props.member.alternative_phone} required={false}
                           width={'calc(33.333% - 21.35px)'}
                           maxLength={undefined} phoneMask={true}/>

                <h4 style={{width: '100%', marginTop: 'auto', marginBottom: 'auto'}}>
                    {lang.linkage}
                </h4>

                <InputLayout inputName={lang.homeOffice} handleChange={props.handleChange}
                             inputType={1} disabled={!props.editable} size={'calc(50% - 16px'} required={true}
                             name={'home_office'} selectFields={lang.options}
                             initialValue={props.member.home_office} key={"membership-5"} setChanged={setChanged}/>
                <Selector required={true}
                          selected={{
                              key: props.member.entity ? props.member.entity.key : null,
                              value: props.member.entity ? props.member.entity.value : null
                          }}
                          handleChange={event => props.handleChange({
                              name: 'entity',
                              value: event
                          })} setChanged={setChanged}
                          label={lang.entity} key={'membership-6'}
                          data={mapToSelect({data: entities, option: 1})} width={'calc(50% - 16px'}/>
                {props.create ? null :
                    <Selector required={false}
                              selected={{
                                  key: props.mainCollaboration !== null ? props.mainCollaboration.key : null,
                                  value: props.mainCollaboration !== null ? props.mainCollaboration.value : null,
                              }}
                              handleChange={event => props.handleChange({
                                  name: 'main_collaboration',
                                  value: event
                              })} setChanged={setChanged}
                              label={lang.mainCollaboration} key={'membership-7'}
                              data={mapToSelect({data: collaborations, option: 4})} width={'100%'}/>
                }
                {!props.editable ? null :
                    <Button style={{
                        width: '100%',
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
    create: PropTypes.bool,
    mainCollaboration: PropTypes.object
}
