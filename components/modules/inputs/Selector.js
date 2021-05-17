import React, {useState} from "react";
import PropTypes from "prop-types";
import mainStyles from '../../../styles/shared/Main.module.css'
import {
    AddRounded,
    CloseRounded,
    LaunchRounded,
    ListRounded,
    OpenInBrowser,
    OpenInBrowserRounded
} from "@material-ui/icons";
import {Button, FormControl, FormLabel, Modal} from "@material-ui/core";
import styles from '../../../styles/person/Form.module.css'
import InputLayout from "../InputLayout";
import animations from '../../../styles/shared/Animations.module.css'
import shared from "../../../styles/shared/Shared.module.css";

export default function Selector(props) {
    const [modal, setModal] = useState(false)
    const [search, setSearch] = useState('')
    const [lang, setLang] = useState(null)
    const [hovered, setHovered] = useState(false)

    function handleChange(event) {
        setSearch(event.value)
    }

    function renderModal() {
        return (
            <Modal open={modal} onClose={() => setModal(false)}
                   style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <div className={[shared.modalContainer, animations.fadeIn].join(' ')}
                     style={{backgroundColor: 'white', position: 'relative'}}>
                    <div className={shared.closeButtonModalContainer}>
                        <Button onClick={() => setModal(false)}>
                            <CloseRounded/>
                        </Button>
                    </div>
                    <div className={mainStyles.displayColumnSpaced} style={{
                        justifyItems: 'center',
                    }}>
                        <h3 style={{marginTop: 0, marginBottom: '16px'}}>{props.label}</h3>
                        <InputLayout inputName={'Search'} dark={props.dark}
                                     handleChange={handleChange} name={undefined}
                                     inputType={0} disabled={false} size={'100%'} required={false}
                                     initialValue={search} key={"search"} setChanged={undefined}/>

                        {props.selected !== undefined && props.selected !== null && props.selected.key !== null && props.selected.key !== undefined ?
                            <div className={mainStyles.rowContainer} style={{width: '100%'}}>
                                <div style={{
                                    border: '#e2e2e2 1px solid',
                                    borderRadius: '8px',
                                    padding: '10px',
                                    minWidth: props.required ? '100%' : 'calc(50% - 8px)',
                                    marginTop: '16px'
                                }} className={mainStyles.displayInlineCenter}>
                                    {props.selected.value}
                                </div>

                                <div>
                                    {props.required ? null :
                                        <Button onClick={() => {
                                            props.setChanged(true)
                                            props.handleChange(undefined)
                                        }} style={{
                                            textTransform: 'none',
                                            justifyItems: 'center',
                                            marginLeft: 'auto',
                                            width: '49%', backgroundColor: '#f54269',
                                            color: 'white'
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
                        backgroundColor: '#eeeef1',
                        borderRadius: '8px',
                        padding: '16px',
                        gap: '16px',
                        height: 'auto',
                        marginTop: '16px'

                    }}>
                        {props.data.map(data => {
                            if (search.length > 0 && (data.value.toLowerCase()).match(search.toLowerCase())) {
                                return (
                                    <Button
                                        key={data.key} variant={'contained'}
                                        style={{
                                            width: 'calc(50% - 8px)',
                                            backgroundColor: props.selected !== undefined && props.selected !== null && props.selected.key !== null && data.key === props.selected.key ? '#0095ff' : 'white',
                                            color: props.selected !== undefined && props.selected !== null && props.selected.key !== null && data.key === props.selected.key ? 'white' : null,
                                            borderRadius: '8px',
                                            boxShadow: 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px'
                                        }}
                                        onClick={() => {
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
                                    <Button
                                        key={data.key} style={{
                                        width: 'calc(50% - 8px)',
                                        backgroundColor: props.selected !== undefined && props.selected !== null && props.selected.key !== null && data.key === props.selected.key ? '#0095ff' : 'white',
                                        color: props.selected !== undefined && props.selected !== null && props.selected.key !== null && data.key === props.selected.key ? 'white' : null,
                                        borderRadius: '8px',
                                        boxShadow: 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px'
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

                <fieldset
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    className={mainStyles.displayInlineSpaced}
                    style={{
                        width: props.width,
                        height: '56px',
                        border: hovered ? 'black 1px solid' : '#c0c0c0 1px solid',
                        borderRadius: '4px',
                        cursor: props.disabled ? 'auto' : 'pointer',
                        color: 'rgba(0,0,0,.9)',
                        alignItems: 'center',
                        position: 'relative',

                        margin: 'unset'

                    }} onClick={() => {
                    if(!props.disabled)
                        setModal(true)
                }}>
                    {props.selected !== undefined && props.selected !== null && props.selected.key !== null && props.selected.key !== undefined ?
                        <legend style={{
                            paddingRight: '5px',
                            paddingLeft: '5px',
                            fontSize: '.8rem',
                            color: 'rgba(0,0,0,.6)',
                            position: "absolute",
                            top: 0,
                            transform:'translateY(-10px)',
                            backgroundColor: 'white'
                        }}>
                            {props.label}
                            {props.required ? ' *' : null}
                        </legend>
                        :
                        null
                    }
                    <div style={{position: "absolute", height: '56px', width: '100%', padding: '10px', left: 0,
                        bottom: 0,
                        right: 0}} className={mainStyles.displayInlineSpaced}>

                        {props.selected !== undefined && props.selected !== null && props.selected.key !== null && props.selected.key !== undefined ?
                            <>

                                {props.selected.value}
                                <ListRounded style={{color: 'rgba(0,0,0,.6)'}}/>
                            </>
                            :
                            <>
                                <p style={{
                                    color: 'rgba(0,0,0,.55)',
                                }}>    {props.label}
                                    {props.required ? ' *' : null}</p>
                                <AddRounded style={{color: 'rgba(0,0,0,.6)'}}/>
                            </>
                        }
                    </div>
                </fieldset>


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
    setChanged: PropTypes.func,
    disabled: PropTypes.bool
}