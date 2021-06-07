import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {AddRounded, DeleteForeverRounded, ListRounded} from "@material-ui/icons";
import {Divider, Modal} from "@material-ui/core";
import animations from '../../styles/shared/Animations.module.css'
import shared from "../../styles/shared/Shared.module.css";
import styles from "../../styles/Input.module.css";

import Button from "./Button";
import TextField from "./TextField";
import SelectorsPT from "../../packages/locales/others/SelectorsPT";

export default function Selector(props) {
    const [modal, setModal] = useState(false)
    const [search, setSearch] = useState('')
    const lang = SelectorsPT

    function handleChange(event) {
        setSearch(event.value)
    }

    function renderModal() {
        return (
            <Modal open={modal} onClose={() => setModal(false)}
                   style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <div className={[shared.modalContainer, animations.fadeIn].join(' ')}
                     style={{height: 'clamp(500px, 75%, 1000px', alignContent: 'flex-start'}}>
                    <div className={shared.modalContent}>
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

                        <div style={{display: 'grid', gap: '8px'}}>
                            {props.data.map((data) => (
                                (search.length === 0 || search.length > 0 && (data.value.toLowerCase()).match(search.toLowerCase())) ?
                                    <div key={data.key + '-' + data.value}>
                                        <button onClick={() => {
                                            if (props.selected?.key === data.key)
                                                props.handleChange(undefined)

                                            else {
                                                if (props.setChanged)
                                                    props.setChanged(true)
                                                props.handleChange(data)
                                                setModal(false)
                                            }
                                        }} className={shared.rowContainer}
                                                style={{
                                                    backgroundColor: data.key === props.selected?.key ? '#0095ff' : undefined,
                                                    color: data.key === props.selected?.key ? 'white' : undefined,
                                                    outline: 'none'
                                                }}>
                                            {data.value}
                                        </button>
                                    </div>
                                    :
                                    null
                            ))}
                        </div>
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


    return (
        <>
            {renderModal()}

            <div
                key={props.label + '-selector'}
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
                            cursor: props.disabled ? 'unset' : 'pointer'
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
                                }}>{props.label}</p>
                                <AddRounded style={{
                                    visibility: props.disabled ? 'hidden' : 'visible',
                                    color: 'rgba(0,0,0,.6)'
                                }}/>
                            </>
                        }
                    </button>
                </div>

                <label htmlFor={'select-' + props.label} className={styles.alertLabel}
                       style={{
                           color: props.selected?.key === null || !props.selected?.key ? '#ff5555' : '#262626',
                           visibility: props.required ? 'visible' : 'hidden',
                       }}>{lang.required}</label>

            </div>
        </>
    )
}

Selector.propTypes = {
    data: PropTypes.array,
    handleChange: PropTypes.func,
    selected: PropTypes.any,
    label: PropTypes.string,
    width: PropTypes.string,
    required: PropTypes.bool,
    setChanged: PropTypes.func,
    disabled: PropTypes.bool,
    dark: PropTypes.bool,
}