import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import mainStyles from '../../../styles/shared/Main.module.css'
import {AddRounded, ArrowDropDownRounded, CloseRounded, DeleteForeverRounded, ListRounded} from "@material-ui/icons";
import {Divider, Modal} from "@material-ui/core";
import InputLayout from "../InputLayout";
import animations from '../../../styles/shared/Animations.module.css'
import shared from "../../../styles/shared/Shared.module.css";
import styles from "../../../styles/Input.module.css";
import getComponentLanguage from "../../../utils/shared/GetComponentLanguage";
import Button from "./Button";
import TextField from "./TextField";

export default function Selector(props) {
    const [modal, setModal] = useState(false)
    const [search, setSearch] = useState('')
    const [lang, setLang] = useState(null)

    useEffect(() => {
        if (lang === null)
            setLang(getComponentLanguage({component: 'selector', locale: props.locale}))
    }, [])

    function handleChange(event) {
        setSearch(event.value)
    }

    function renderModal() {
        return (
            <Modal open={modal} onClose={() => setModal(false)}
                   style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <div className={[shared.modalContainer, animations.fadeIn].join(' ')}>
                    <div style={{
                        display: 'grid',
                        justifyItems: 'flex-start',
                        gap: '8px',
                    }}>
                        <h3 style={{marginTop: 0, marginBottom: '16px'}}>{props.label}</h3>
                        {props.selected !== undefined && props.selected !== null && props.selected.key !== null && props.selected.key !== undefined ?
                            <Button
                                content={props.required ?
                                    <div>
                                        <h5 style={{marginTop: 0, marginBottom: 0}}>{props.selected.value}</h5>
                                    </div>
                                    :
                                    <div style={{display: 'flex', gap: '32px', alignItems: 'center'}}>
                                        <h5 style={{marginTop: 0, marginBottom: 0}}>{props.selected.value}</h5>
                                        <DeleteForeverRounded/>
                                    </div>}
                                hoverHighlight={true}
                                colorVariant={'secondary'}
                                variant={'default'}
                                border={'unset'}
                                width={'fit-content'}
                                backgroundColor={'#f4f5fa'}
                                handleClick={() => {
                                    if (props.setChanged)
                                        props.setChanged(true)
                                    props.handleChange(undefined)
                                }}
                                padding={props.required ? '8px 32px 8px 32px' : '8px'}
                                disabled={props.required}
                                fontColor={'#555555'}/>
                            : null}


                        <TextField
                            variant={'small'}
                            placeholder={lang.search} label={lang.search}
                            handleChange={event => {
                                setSearch(event.target.value)
                            }}
                            locale={props.locale} value={search} required={false}
                            width={'100%'}
                            maxLength={undefined}/>
                        <Divider orientation={'horizontal'} style={{backgroundColor: '#ecedf2', width: '100%'}}/>
                    </div>


                    <div style={{
                        overflowY: 'auto',
                        marginTop: '16px',
                        marginBottom: '64px',
                        display: 'grid'
                    }}>
                        {props.data.map((data) => (
                            <>
                                {(search.length === 0 || search.length > 0 && (data.value.toLowerCase()).match(search.toLowerCase())) ?
                                    <div key={data.key + '-'+ data.value}>
                                        <Button

                                            content={data.value}
                                            hoverHighlight={!(props.selected !== undefined && props.selected !== null && props.selected.key !== null && data.key === props.selected.key)}
                                            colorVariant={'primary'}
                                            variant={'default'}
                                            justification={'flex-start'}
                                            border={props.selected !== undefined && props.selected !== null && props.selected.key !== null && data.key === props.selected.key ? '#ecedf2 .7px solid' : 'transparent .7px solid'}
                                            width={'100%'}
                                            backgroundColor={props.selected !== undefined && props.selected !== null && props.selected.key !== null && data.key === props.selected.key ? '#f4f5fa' : 'white'}
                                            handleClick={() => {
                                                if (props.setChanged)
                                                    props.setChanged(true)
                                                props.handleChange(data)
                                                setModal(false)
                                            }}
                                            padding={'8px'}
                                            elevation={true}
                                            fontColor={'#222228'}
                                        />
                                    </div>
                                    :
                                    null}
                            </>
                        ))}
                    </div>
                    <div className={styles.modalFooter}>

                        <Button
                            width={'fit-content'}
                            border={'#ecedf2 .7px solid'}
                            variant={'rounded'}
                            content={lang.close}
                            handleClick={() => setModal(false)}
                            backgroundColor={'white'}
                            hoverHighlight={true}
                            colorVariant={'secondary'}
                            elevation={true}
                            fontColor={'#262626'}
                            padding={'8px 32px 8px 32px'}
                        />
                    </div>
                </div>
            </Modal>
        )
    }


    if (lang !== null)
        return (
            <>
                {renderModal()}

                <div
                    key={props.label+'-selector'}
                    style={{
                        width: props.width,
                        height: '100px',
                        display: 'grid',
                        alignItems: props.value ? 'unset' : 'flex-start',
                        gap: '4px',
                    }}
                >
                    <label htmlFor={'select-' + props.label} className={styles.labelContainer}
                           style={{
                               visibility: props.selected !== undefined && props.selected !== null && props.selected.key !== null && props.selected.key !== undefined ? 'visible' : 'hidden',
                               opacity: props.selected !== undefined && props.selected !== null && props.selected.key !== null && props.selected.key !== undefined ? '1' : '0',
                               transition: 'visibility 0.2s ease,opacity 0.2s ease'
                           }}>{props.label}</label>

                    <div className={styles.dropDownContainer}>
                        <button
                            id={'select-' + props.label}
                            disabled={props.disabled}

                            style={{
                                height: '56px', borderRadius: '5px',
                            }}
                            className={[styles.selectContainer, props.disabled ? {} : props.dark ? styles.darkHighlight : styles.highlight].join(' ')}
                            onClick={() => setModal(true)}
                        >

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
                        </button>
                    </div>

                    <label htmlFor={'select-' + props.label} className={styles.alertLabel}
                           style={{
                               color: props.value === null || props.value === undefined ? '#ff5555' : '#262626',
                               visibility: props.required && !open ? 'visible' : 'hidden',
                           }}>{lang.required}</label>

                </div>
            </>
        )
    else return null
}

Selector.propTypes = {
    data: PropTypes.array,
    handleChange: PropTypes.func,
    selected: PropTypes.any,
    label: PropTypes.string,
    width: PropTypes.number,
    required: PropTypes.bool,
    setChanged: PropTypes.func,
    disabled: PropTypes.bool,
    dark: PropTypes.bool
}