import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import mainStyles from '../../../styles/shared/Main.module.css'
import {getIconStyle, getTertiaryColor} from "../../../styles/shared/MainStyles";
import CakeRoundedIcon from "@material-ui/icons/CakeRounded";
import {AddRounded, CalendarTodayRounded, EmailRounded, PhoneRounded, WorkRounded} from "@material-ui/icons";
import ViewQuiltRoundedIcon from "@material-ui/icons/ViewQuiltRounded";
import {Button, Divider, FormControl, FormLabel, Modal} from "@material-ui/core";
import styles from '../../../styles/person/Form.module.css'
import InputLayout from "../../layout/InputLayout";

export default function SelectorLayout(props) {
    const [modal, setModal] = useState(false)
    const [search, setSearch] = useState('')
    const [valid, setValid] = useState(false)

    useEffect(() => {
        setValid(props.selected !== undefined && props.selected !== null)
    }, [props.selected])

    function handleChange(event) {
        setSearch(event.value)
    }

    function renderModal() {
        return (
            <Modal open={modal} onClose={() => setModal(false)}
                   style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <div className={styles.modalContainer}
                     style={{backgroundColor: 'white', height: '50vh'}}>
                    <div style={{
                        width: '32%',
                        alignSelf: 'stretch',
                        borderRight: '#e2e2e2 1px solid',
                        display: 'block'
                    }}>
                        <div className={styles.modalFormContainer}
                             style={{
                                 borderBottom: valid ? '#e2e2e2 1px solid' : null,
                                 height: '50%',
                                 transform: valid ? null : 'translateY(50%)'
                             }}>
                            <spam style={{fontSize: '1.4rem', fontWeight: 450}}>Search</spam>
                            <InputLayout inputName={'Search'} dark={props.dark}
                                         handleChange={handleChange} name={undefined}
                                         inputType={0} disabled={false} size={100} required={false}
                                         initialValue={search} key={"search"} setChanged={undefined}/>
                        </div>
                        {valid ?
                            <div className={styles.modalFormContainer} style={{height: '50%'}}>
                                <spam style={{fontSize: '1.4rem', fontWeight: 450}}>Selected</spam>
                                <div style={{
                                    border: '#e2e2e2 1px solid',
                                    borderRadius: '8px',
                                    width: 'auto',
                                    padding: '10px'
                                }} className={mainStyles.displayInlineCenter}>
                                    {props.selected.value}
                                </div>
                                {props.required ? null :
                                    <Button onClick={() => {
                                        setValid(false)
                                        props.setChanged(true)
                                        props.handleChange(undefined)
                                    }} style={{
                                        textTransform: 'none',
                                        justifyItems: 'center',
                                        width: '100%', backgroundColor: !valid ? null : '#f54269',
                                        color: !valid ? null : 'white'

                                    }}>Remove</Button>
                                }
                            </div>
                            :
                            null}
                    </div>
                    <div className={mainStyles.displayWarp} style={{
                        paddingLeft: '1vw',
                        width: '68%',
                        overflowY: 'auto',
                        maxHeight: '50vh',
                        paddingBottom: '1vh'
                    }}>
                        {props.data.map(data => {
                            if (search.length > 0 && (data.value.toLowerCase()).match(search.toLowerCase())) {
                                console.log('first')
                                return (
                                    <Button key={data.key} variant={'contained'} style={{
                                        width: 'fit-content', height: '5vh',
                                        backgroundColor: valid && data.key === props.selected.key ? '#0095ff' : null,
                                        color: valid && data.key === props.selected.key ? 'white' : null
                                    }} onClick={() => {
                                        props.setChanged(true)
                                        props.handleChange(data)
                                    }}>
                                        {data.value}
                                    </Button>
                                )
                            } else if(search.length > 0)
                                return null
                            else
                                return (
                                    <Button key={data.key} variant={'contained'} style={{
                                        width: 'fit-content', height: '5vh',
                                        backgroundColor: valid && data.key === props.selected.key ? '#0095ff' : null,
                                        color: valid && data.key === props.selected.key ? 'white' : null
                                    }} onClick={() => {
                                        console.log(data)
                                        props.handleChange(data)
                                    }}>
                                        {data.value}
                                    </Button>
                                )
                        })}
                    </div>
                </div>
            </Modal>
        )
    }

    return (
        <>
            {renderModal()}
            <FormControl key={props.key} required={props.required} style={{
                width: props.width + '%',
                height: '7vh',
                marginTop: 'auto'
            }}>
                <FormLabel style={{transform: 'translateY(-5px)'}}>{props.label}</FormLabel>
                <Button onClick={() => setModal(true)} style={{
                    textTransform: 'none',
                    backgroundColor: '#0095ff',
                    color: 'white',
                    padding: 0,
                    height: '100%',
                }} variant={'contained'} disableElevation={true}>
                    <div className={[mainStyles.displayInlineSpaced, mainStyles.primaryParagraph].join(' ')}>
                        {valid ? props.selected.value : <AddRounded/>}
                    </div>
                </Button>
            </FormControl>
        </>
    )
}

SelectorLayout.propTypes = {
    data: PropTypes.array,
    handleChange: PropTypes.func,
    selected: PropTypes.any,
    label: PropTypes.string,
    width: PropTypes.number,
    required: PropTypes.bool,
    key: PropTypes.any,
    setChanged: PropTypes.func
}