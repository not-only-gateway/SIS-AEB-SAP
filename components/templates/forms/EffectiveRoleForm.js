import {Button} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import InputLayout from "../../modules/InputLayout";
import mainStyles from '../../../styles/shared/Main.module.css'
import getComponentLanguage from "../../../utils/shared/GetComponentLanguage";
import Alert from "../../layout/Alert";

export default function EffectiveRoleForm(props) {

    const [changed, setChanged] = useState(false)
    const [lang, setLang] = useState(null)
    const [status, setStatus] = useState({
        type: undefined,
        message: undefined
    })
    useEffect(() => {
        setLang(getComponentLanguage({component: 'effective', locale: props.locale}))
    }, [])


    function disabled() {
        return (
            props.data.denomination === undefined ||
            props.data.hierarchy_level === undefined ||
            props.data.denomination.length === 0 ||
            props.data.hierarchy_level.length === 0  ||
            !changed
        )
    }


    if (lang !== null)
        return (
            <div className={mainStyles.displayWarp} style={{justifyContent: 'center', width: '100%', position: 'relative'}}>
                <Alert
                    type={status.type} render={status.type !== undefined}
                    handleClose={() => setStatus({type: undefined, message: undefined})} message={status.message}
                />
                <InputLayout inputName={lang.denomination} dark={false} handleChange={props.handleChange}
                             name={'denomination'}
                             inputType={0} size={'calc(50% - 8px)'} required={true}
                             initialValue={props.data.denomination} key={'effective-role-1'} setChanged={setChanged}/>

                <InputLayout inputName={lang.hierarchyLevel} dark={false} handleChange={props.handleChange}
                             name={'hierarchy_level'}
                             inputType={0} size={'calc(50% - 8px)'} required={true}
                             initialValue={props.data.hierarchy_level} key={'effective-role-2'} setChanged={setChanged}/>

                <Button style={{
                    width: '100%',

                    backgroundColor: disabled() ? '#f0ecec' : '#0095ff',
                    color: disabled() ? '#777777' : 'white',
                    fontWeight: 550,
                    position: 'sticky',
                    bottom: 0,
                    zIndex: 5,
                }} disabled={disabled()} variant={'contained'} onClick={() => {
                    props.handleSubmit({pk: props.data.id, data: props.data, create: props.create, setStatus: setStatus}).then(res => {
                        setChanged(!res)
                    })
                }}>
                    {props.create ? lang.create : lang.save}
                </Button>
            </div>

        )
    else
        return <></>
}

EffectiveRoleForm.propTypes = {
    locale: PropTypes.string,
    data: PropTypes.object,
    create: PropTypes.bool
}