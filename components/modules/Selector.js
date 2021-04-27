import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import mainStyles from '../../styles/shared/Main.module.css'
import {AddRounded} from "@material-ui/icons";
import {Button, Divider, FormControl, FormLabel, Modal} from "@material-ui/core";
import styles from '../../styles/person/Form.module.css'
import InputLayout from "./InputLayout";

export default function Selector(props) {
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
                     style={{backgroundColor: 'white'}}>

                    <div className={styles.modalFormContainer}
                         style={{
                             borderBottom: '#e2e2e2 1px solid'
                         }}>
                        <spam style={{fontSize: '1.3rem'}}>Search</spam>
                        <InputLayout inputName={'Search'} dark={props.dark}
                                     handleChange={handleChange} name={undefined}
                                     inputType={0} disabled={false} size={'100%'} required={false}
                                     initialValue={search} key={"search"} setChanged={undefined}/>

                        {valid ?
                            <div className={mainStyles.rowContainer} style={{width: '100%'}}>

                                <div style={{
                                    border: '#e2e2e2 1px solid',
                                    borderRadius: '8px',
                                    padding: '10px',
                                    minWidth: 'calc(50% - 8px)'
                                }} className={mainStyles.displayInlineCenter}>
                                    {props.selected.value}
                                </div>

                                <div>
                                    {props.required ? null :
                                        <Button onClick={() => {
                                            setValid(false)
                                            props.setChanged(true)
                                            props.handleChange(undefined)
                                        }} style={{
                                            textTransform: 'none',
                                            justifyItems: 'center',
                                            marginLeft: 'auto',
                                            width: '49%', backgroundColor: !valid ? null : '#f54269',
                                            color: !valid ? null : 'white'
                                        }}>
                                            Remove
                                        </Button>

                                    }
                                </div>
                            </div>
                            :
                            null}
                    </div>

                    <div className={mainStyles.displayWarp} style={{
                        overflowY: 'auto',
                        marginBottom: 'auto',
                        gridRow: 2,
                        maxHeight: '100%',
                        paddingBottom: '10px',
                    }}>
                        {props.data.map(data => {
                            if (search.length > 0 && (data.value.toLowerCase()).match(search.toLowerCase())) {
                                return (
                                    <Button key={data.key} variant={'contained'} style={{
                                        width: 'calc(50% - 8px)',
                                        backgroundColor: valid && data.key === props.selected.key ? '#0095ff' : null,
                                        color: valid && data.key === props.selected.key ? 'white' : null
                                    }} onClick={() => {
                                        props.setChanged(true)
                                        props.handleChange(data)
                                    }}>
                                        {data.value}
                                    </Button>
                                )
                            } else if (search.length > 0)
                                return null
                            else
                                return (
                                    <Button key={data.key} variant={'contained'} style={{
                                        width: 'calc(50% - 8px)',
                                        backgroundColor: valid && data.key === props.selected.key ? '#0095ff' : null,
                                        color: valid && data.key === props.selected.key ? 'white' : null
                                    }} onClick={() => {
                                        props.setChanged(true)
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
                width: props.width,
                height: '7vh',
                marginTop: 'auto'
            }}>
                <FormLabel style={{transform: 'translateY(-5px)'}}>{props.label}</FormLabel>
                <Button onClick={() => setModal(true)} style={{
                    textTransform: 'none',
                    backgroundColor: 'transparent',
                    border: '#d0d0d0 1px solid',
                    color: '#262626',
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

Selector.propTypes = {
    data: PropTypes.array,
    handleChange: PropTypes.func,
    selected: PropTypes.any,
    label: PropTypes.string,
    width: PropTypes.number,
    required: PropTypes.bool,
    key: PropTypes.any,
    setChanged: PropTypes.func
}