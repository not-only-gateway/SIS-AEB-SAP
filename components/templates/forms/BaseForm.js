import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types'
import InputLayout from "../../modules/InputLayout";
import getComponentLanguage from "../../../utils/shared/GetComponentLanguage";
import CountryOptions from "../../../packages/options/CountryOptions";
import StateOptions from "../../../packages/options/StateSelector";
import ImageSelector from "../../modules/inputs/ImageField";
import Selector from "../../modules/inputs/Selector";
import getImage from "../../../utils/shared/GetImage";
import TextField from "../../modules/inputs/TextField";
import DateField from "../../modules/inputs/DateField";
import DropDownField from "../../modules/inputs/DropDownField";
import Alert from "../../layout/Alert";
import TabContent from "../TabContent";
import HorizontalTabs from "../../layout/navigation/HorizontalTabs";
import shared from '../../../styles/shared/Shared.module.css'
import Button from "../../modules/inputs/Button";

export default function BaseForm(props) {


    const [changed, setChanged] = useState(false)
    const [image, setImage] = useState({
        file: null,
        imageSrc: props.person.image,
        removed: false
    })
    const [lang, setLang] = useState(null)
    const [status, setStatus] = useState({
        error: undefined,
        message: undefined
    })
    const [openTab, setOpenTab] = useState(0)
    useEffect(() => {

        setLang(getComponentLanguage({locale: props.locale, component: 'base'}))
    }, [])


    function handleNationalityChange(event) {

        props.handleChange({name: 'nationality', value: event !== undefined ? event.value : null})
    }

    function handleBirthPlaceChange(event) {
        props.handleChange({name: 'birth_place', value: event !== undefined ? event.value : null})
    }


    function disabled() {
        return (
            props.person.name === null ||
            props.person.nationality === null ||
            props.person.birth_place === null ||
            props.person.birth === null ||
            props.person.disabled_person === null ||
            props.person.education === null ||
            props.person.gender === null ||
            props.person.marital_status === null ||
            !props.person.name ||
            !props.person.nationality ||
            !props.person.birth_place ||
            !props.person.birth ||
            props.person.disabled_person === undefined ||
            !props.person.education ||
            !props.person.gender ||
            !props.person.marital_status ||
            changed === false
        )
    }


    if (lang !== null)
        return (
            <div style={{display: 'grid', rowGap: '32px'}}>
                <Alert
                    type={'error'} message={status.message}
                    handleClose={() => setStatus({
                        error: false,
                        message: undefined
                    })} render={status.error}/>

                <HorizontalTabs
                    buttons={[
                        {
                            key: 0,
                            value: lang.personal
                        },
                        {
                            key: 1,
                            value: lang.life
                        },
                        {
                            key: 2,
                            value: lang.parents
                        }
                    ]}
                    setOpenTab={setOpenTab}
                    openTab={openTab}
                    noMargin={false}
                />
                <TabContent
                    openTab={openTab}
                    key={undefined} noContainer={true}
                    tabs={[
                        {
                            buttonKey: 0,
                            value: (
                                <div className={shared.formContainer}>
                                    <ImageSelector
                                        initialImage={props.person.image !== null ? props.person.image : null}
                                        size={'100px'}
                                        setImage={event => props.handleChange({
                                            name: 'image',
                                            value: event !== null ? event.target.files[0] : null
                                        })} label={lang.personImage}
                                        width={'calc(25% - 24px)'} setChanged={setChanged}/>

                                    <TextField placeholder={lang.name} label={lang.name} handleChange={event => {
                                        setChanged(true)
                                        props.handleChange({name: 'name', value: event.target.value})
                                    }} locale={props.locale} value={props.person.name} required={true}
                                               width={'calc(75% - 12px)'}
                                               maxLength={undefined}/>

                                    <DateField
                                        placeholder={lang.birth} label={lang.birth}
                                        handleChange={event => {
                                            setChanged(true)
                                            props.handleChange({name: 'birth', value: event.target.value})
                                        }} locale={props.locale}
                                        value={
                                            typeof (props.person.birth) === 'number' ?
                                                new Date(props.person.birth).toLocaleDateString().replace('/', '-')
                                                :
                                                props.person.birth
                                        }
                                        required={true} width={'calc(50% - 16px)'}/>


                                    <DropDownField
                                        placeholder={lang.disabledPerson}
                                        label={lang.disabledPerson}
                                        handleChange={event => {
                                            setChanged(true)
                                            props.handleChange({name: 'disabled_person', value: event})
                                        }} locale={props.locale} value={props.person.disabled_person}
                                        required={true}
                                        width={'calc(50% - 16px)'} choices={lang.choice}/>
                                </div>
                            )
                        },
                        {
                            buttonKey: 1,
                            value: (
                                <div
                                    className={shared.formContainer}>
                                    <DropDownField
                                        placeholder={lang.gender}
                                        label={lang.gender}
                                        handleChange={event => {
                                            setChanged(true)
                                            props.handleChange({name: 'gender', value: event})
                                        }} locale={props.locale} value={props.person.gender} required={true}
                                        width={'calc(33.333% - 21.35px)'} choices={lang.genderChoice}/>

                                    <DropDownField
                                        placeholder={lang.education}
                                        label={lang.education}
                                        handleChange={event => {
                                            setChanged(true)
                                            props.handleChange({name: 'education', value: event})
                                        }} locale={props.locale} value={props.person.education} required={true}
                                        width={'calc(33.333% - 21.35px)'} choices={lang.educationChoice}/>

                                    <DropDownField
                                        placeholder={lang.marital}
                                        label={lang.marital}
                                        handleChange={event => {
                                            setChanged(true)
                                            props.handleChange({name: 'marital_status', value: event})
                                        }}
                                        locale={props.locale}
                                        value={props.person.marital_status} required={true}
                                        width={'calc(33.333% - 21.35px)'}
                                        choices={lang.maritalChoice}/>
                                </div>
                            )
                        },
                        {
                            buttonKey: 2,
                            value: (
                                <div
                                    className={shared.formContainer}>
                                    <TextField placeholder={lang.father} label={lang.father}
                                               handleChange={event => {
                                                   setChanged(true)
                                                   props.handleChange({
                                                       name: 'father_name',
                                                       value: event.target.value
                                                   })
                                               }} locale={props.locale} value={props.person.father_name}
                                               required={false}
                                               width={'calc(50% - 16px)'}/>

                                    <TextField
                                        placeholder={lang.mother}
                                        label={lang.mother}
                                        handleChange={event => {
                                            setChanged(true)
                                            props.handleChange({name: 'mother_name', value: event.target.value})
                                        }}
                                        locale={props.locale}
                                        value={props.person.mother_name}
                                        required={false}
                                        width={'calc(50% - 16px)'}/>


                                    <Selector required={true}
                                              selected={{
                                                  key: props.person.birth_place,
                                                  value: props.person.birth_place
                                              }}
                                              handleChange={handleBirthPlaceChange}
                                              label={lang.birthPlace} key={'1-5-'} setChanged={setChanged}
                                              data={StateOptions} width={'calc(50% - 16px)'}/>
                                    <Selector required={true}
                                              selected={{
                                                  key: props.person.nationality,
                                                  value: props.person.nationality
                                              }}
                                              handleChange={handleNationalityChange} setChanged={setChanged}
                                              label={lang.nationality} key={'1-6-'}
                                              data={CountryOptions} width={'calc(50% - 16px)'}/>
                                </div>
                            )
                        }]
                    }/>


                <Button width={'100%'} elevation={true} border={'none'} padding={'8px 32px 8px 32px'}
                        fontColor={'white'} backgroundColor={'#0095ff'} handleClick={() => {
                    props.handleSubmit({
                        person: props.person,
                        image: image,
                        personID: props.id,
                        create: props.create,
                        setStatus: setStatus
                    })
                }}
                        disabled={disabled()} variant={'rounded'}
                        content={
                            props.create ? lang.create : lang.save
                        } justification={'center'} hoverHighlight={false}
                />

            </div>
        )
    else return null
}

BaseForm.propTypes = {
    id: PropTypes.number,
    person: PropTypes.object,
    handleChange: PropTypes.func,
    handleSubmit: PropTypes.func,
    editable: PropTypes.bool,
    locale: PropTypes.string,
    setAccepted: PropTypes.func,
    create: PropTypes.bool,
    setID: PropTypes.func
}
