import {Button} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import InputLayout from "../InputLayout";
import fetchComponentData from "../../../utils/person/FetchData";
import saveComponentChanges from "../../../utils/person/SaveChanges";
import mainStyles from '../../../styles/shared/Main.module.css'
import getComponentLanguage from "../../../utils/shared/GetComponentLanguage";
import axios from "axios";
import Host from "../../../utils/shared/Host";
import Cookies from "universal-cookie/lib";

export default function AccessProfileForm(props) {

    const [loading, setLoading] = useState(true)
    const [changed, setChanged] = useState(false)
    const [lang, setLang] = useState(null)
    const [profile, setProfile] = useState([])

    useEffect(() => {
        setLang(getComponentLanguage({component: 'access', locale: props.locale}))
        axios({
            method: 'get',
            url: Host() + 'access/'+props.data.id,
            headers: (new Cookies()).get('jwt') !== undefined ? {'authorization': (new Cookies()).get('jwt')} : null,
        }).then(res => {
            setProfile(res.data)
            setLoading(false)
        }).catch(error => {
            console.log(error)
        })
    }, [])

    function handleChange(props) {

        setProfile(prevState => ({
            ...prevState,
            [props.name]: props.value
        }))
    }

    function disabled() {
        return (
            false
        )
    }

    async function saveChanges() {

        await saveComponentChanges({
            path: 'management/' + props.id,
            params: {
                person: props.id,
                personal_email: contact.email.toLowerCase(),
                personal_email_alt: contact.emailAlt.length > 0 ? contact.emailAlt?.toLowerCase() : null,
                personal_phone: contact.phone.replace(' ', ''),
                personal_phone_alt: contact.phoneAlt.length > 0 ? contact.phoneAlt?.toLowerCase() : null
            },
            method: 'put'
        }).then(res => res ? setChanged(false) : console.log(res))
    }

    if (lang !== null && !loading)
        return (
            <div className={mainStyles.displayWarp} style={{justifyContent: 'center', width: '100%'}}>

                <InputLayout inputName={lang.updatePerson} dark={false} handleChange={handleChange}
                             name={'updatePerson'}
                             inputType={1} size={'calc(25% - 12px)'} required={true}
                             selectFields={lang.options}
                             initialValue={profile.can_update_person} key={"3-3"} setChanged={setChanged}/>



                {/*<Button style={{*/}
                {/*    width: '100%', marginTop: '50px',*/}
                {/*    backgroundColor: disabled() ? null : '#39adf6',*/}

                {/*}} variant={'contained'} color={'primary'}*/}
                {/*        disabled={disabled()}*/}
                {/*        onClick={() => saveChanges()}>{lang.save}</Button>*/}
            </div>

        )
    else
        return <></>
}

AccessProfileForm.propTypes = {
    id: PropTypes.string,
    editable: PropTypes.bool,
    locale: PropTypes.string,
    data: PropTypes.object
}