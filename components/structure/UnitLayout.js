import PropTypes from 'prop-types'
import React, {useEffect, useState} from "react";
import axios from "axios";
import Host from "../../utils/shared/Host";
import Cookies from "universal-cookie/lib";
import shared from '../../styles/shared/Shared.module.css'
import {Button} from "@material-ui/core";

export default function UnitLayout(props) {
    const [dependents, setDependents] = useState([])
    const [hovered, setHovered] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios({
            method: 'get',
            url: Host() + 'dependents/unit/' + props.unit.id,
            headers: (new Cookies()).get('jwt') !== undefined ? {'authorization': (new Cookies()).get('jwt')} : null,
        }).then(res => {
            setDependents(res.data)
        }).catch(error => {
            console.log(error)
        })
        setLoading(false)
    }, [])

    return (
        <li key={'unit-layout-'+props.unit.id}>

            <span onClick={() => props.redirect(props.unit.id)} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{
                border: props.dark ? (hovered ? '#39adf6 2px solid' : "transparent 2px solid") : (hovered ? '#39adf6 2px solid' : '#e2e2e2 2px solid'),
                borderRadius: '8px',
                boxShadow: hovered ? 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' : !props.dark ? 'none' : 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',
                padding: '2vh',
                backgroundColor: props.dark ? '#484c55' : 'none',
                transition: '.3s',
                cursor: 'pointer'
            }} className={shared.card_title}>
                    <p style={{
                        fontWeight: 450,
                        color: (props.dark ? 'white' : 'black')
                    }}>
                        {props.unit.acronym}
                    </p>

            </span>
            {!loading ?
                dependents.length > 0  ?
                    <ul>
                        {dependents.map(unit => (
                            <UnitLayout dark={props.dark} redirect={props.redirect} unit={unit}/>
                        ))}
                    </ul>
                    :
                    null
                :
                <span style={{
                    border: props.dark ? (hovered ? '#39adf6 2px solid' : "transparent 2px solid") : (hovered ? '#39adf6 2px solid' : '#e2e2e2 2px solid'),
                    borderRadius: '8px',
                    boxShadow: hovered ? 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' : !props.dark ? 'none' : 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',
                    padding: '2vh',
                    backgroundColor: props.dark ? '#484c55' : 'none',
                    transition: '.3s',
                    cursor: 'pointer'
                }} className={shared.card_title}>
            </span>
            }
        </li>
    )
}

UnitLayout.propTypes = {
    dark: PropTypes.bool,
    unit: PropTypes.object,
    redirect: PropTypes.func
}