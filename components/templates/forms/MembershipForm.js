import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types'
import InputLayout from "../../modules/InputLayout";
import getComponentLanguage from "../../../utils/shared/GetComponentLanguage";
import Selector from "../../modules/inputs/Selector";
import fetchEntities from "../../../utils/fetch/FetchEntities";
import mapToSelect from "../../../utils/shared/MapToSelect";
import fetchActiveCollaborations from "../../../utils/fetch/fetchActiveCollaborations";
import TextField from "../../modules/inputs/TextField";
import DropDownField from "../../modules/inputs/DropDownField";
import Alert from "../../layout/Alert";
import HorizontalTabs from "../../layout/navigation/HorizontalTabs";
import TabContent from "../TabContent";
import shared from "../../../styles/shared/Shared.module.css";
import Button from "../../modules/inputs/Button";

export default function MembershipForm(props) {

    const [changed, setChanged] = useState(false)
    const [lang, setLang] = useState(null)
    const [entities, setEntities] = useState([])
    const [collaborations, setCollaborations] = useState([])
    const [openTab, setOpenTab] = useState(0)
    const [status, setStatus] = useState({
        error: false,
        message: undefined
    })

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
            props.member === null ||
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
            <div style={{display: 'grid', rowGap: '32px', width: '100%'}}>
                <Alert
                    type={'error'} message={status.message}
                    handleClose={() => setStatus({
                        error: false,
                        message: undefined
                    })} render={status.error}/>
                <h4 style={{width: '100%', marginBottom: '16px'}}>{lang.general}</h4>
                <div className={shared.formContainer}>
                    <TextField placeholder={lang.registration} label={lang.registration}
                               handleChange={event => {
                                   setChanged(true)
                                   props.handleChange({name: 'registration', value: event.target.value})
                               }} locale={props.locale}
                               value={props.member === null ? null : props.member.registration}
                               required={false}
                               width={'calc(50% - 16px)'} maxLength={undefined}/>


                    <TextField placeholder={lang.corporateEmail} label={lang.corporateEmail}
                               handleChange={event => {
                                   setChanged(true)
                                   props.handleChange({
                                       name: 'corporate_email',
                                       value: event.target.value
                                   })
                               }} locale={props.locale}
                               value={props.member === null ? null : props.member.corporate_email}
                               required={true}
                               width={'calc(50% - 16px)'}
                               maxLength={undefined}/>

                    <TextField placeholder={lang.extension} label={lang.extension}
                               handleChange={event => {
                                   setChanged(true)
                                   props.handleChange({name: 'extension', value: event.target.value})
                               }} locale={props.locale}
                               value={props.member === null ? null : props.member.extension}
                               required={true}
                               width={'calc(50% - 16px)'}
                               maxLength={undefined} phoneMask={true}/>

                    <TextField placeholder={lang.altPhone} label={lang.altPhone}
                               handleChange={event => {
                                   setChanged(true)
                                   props.handleChange({
                                       name: 'alternative_phone',
                                       value: event.target.value
                                   })
                               }} locale={props.locale}
                               value={props.member === null ? null : props.member.alternative_phone}
                               required={false}
                               width={'calc(50% - 16px)'}
                               maxLength={undefined} phoneMask={true}/>
                    <div className={shared.line}/>
                    <h4 style={{width: '100%', marginBottom: '16px'}}>{lang.linkage}</h4>
                    <DropDownField
                        placeholder={lang.homeOffice}
                        label={lang.homeOffice}
                        handleChange={event => {
                            setChanged(true)
                            props.handleChange({name: 'home_office', value: event})
                        }} locale={props.locale}
                        value={props.member === null ? null : props.member.home_office}
                        required={true}
                        width={'calc(50% - 16px)'} choices={lang.options}/>

                    <Selector required={true}
                              locale={props.locale}
                              selected={{
                                  key: props.member === null ? null : (props.member.entity ? props.member.entity.key : null),
                                  value: props.member === null ? null : (props.member.entity ? props.member.entity.value : null)
                              }}
                              handleChange={event => props.handleChange({
                                  name: 'entity',
                                  value: event
                              })} setChanged={setChanged}
                              label={lang.entity} key={'membership-6'}
                              data={mapToSelect({data: entities, option: 1})}
                              width={'calc(50% - 16px'}/>
                    {props.create ? null :
                        <Selector required={false}
                                  locale={props.locale}
                                  selected={{
                                      key: (props.mainCollaboration !== null ? props.mainCollaboration.id : null),
                                      value: props.mainCollaboration !== null ? props.mainCollaboration.unit  : null,
                                  }}
                                  handleChange={event => props.handleChange({
                                      name: 'main_collaboration',
                                      value: event
                                  })} setChanged={setChanged}
                                  label={lang.mainCollaboration} key={'membership-7'}
                                  data={mapToSelect({data: collaborations, option: 4})} width={'100%'}/>
                    }
                </div>

                <div className={shared.formSubmitContainer}>
                    <Button width={'100%'} elevation={true} border={'none'} padding={'8px 32px 8px 32px'}
                            fontColor={'white'} backgroundColor={'#0095ff'}
                            handleClick={() => {
                                props.handleSubmit({
                                    data: props.member,
                                    personID: props.id,
                                    create: props.create,
                                    setStatus: setStatus
                                }).then(res => {
                                    setChanged(!res)
                                    if (props.setAccepted !== undefined)
                                        props.setAccepted(res)
                                })
                            }}
                            disabled={disabled()} variant={'rounded'}
                            content={
                                props.create ? lang.create : lang.save
                            } justification={'center'} hoverHighlight={false}
                    />
                </div>
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
