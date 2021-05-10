import PropTypes from 'prop-types'
import React, {useEffect, useState} from "react";
import axios from "axios";
import Host from "../../utils/shared/Host";
import Cookies from "universal-cookie/lib";
import shared from '../../styles/shared/Shared.module.css'
import Link from 'next/link'
import mainStyles from '../../styles/shared/Main.module.css'
import animations from '../../styles/shared/Animations.module.css'
import ProfilePersona from "../elements/ProfilePersona";

export default function TreeNode(props) {
    const [dependents, setDependents] = useState([])
    const [hovered, setHovered] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios({
            method: 'get',
            url: Host() + 'dependents/' + props.type + '/' + props.subject.id,
            headers: (new Cookies()).get('jwt') !== undefined ? {'authorization': (new Cookies()).get('jwt')} : null,
        }).then(res => {
            setDependents(res.data)
        }).catch(error => {
            console.log(error)
        })
        setLoading(false)
    }, [])

    return (

        <li key={'subject-layout-' + props.subject.id + props.type}>
            <Link href={{
                pathname: '/' + props.type,
                query: {id: props.subject.id}
            }}>
            <span onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                  style={{
                      cursor: 'pointer',
                      width: props.type !== 'unit' ? '150px' : 'auto',
                      maxWidth: props.type !== 'unit' ? 'unset' : '150px',
                      minWidth: props.type !== 'unit' ? 'unset' : '50px',
                      height: props.type !== 'unit' ? 'auto' : '50px',
                      boxShadow: hovered ?'rgba(0, 0, 0, 0.1) 0 4px 6px -1px, rgba(0,0,0,0.06) 0 2px 4px -1px' : 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px',
                      backgroundColor: hovered ? '#0095ff' : 'white',

                      transition: '300ms ease-in-out'
                  }}
                  className={[animations.popInAnimation, mainStyles.normalBorder, mainStyles.displayInlineCenter].join(' ')}>
                {props.type !== 'unit' ?
                    <div style={{display: 'grid', alignContent: "space-evenly", justifyItems: 'center', width: '100%', padding: '8px'}}>

                        <ProfilePersona base64={false} dark={false} key={props.subject.id} cakeDay={false}
                                        elevation={true} image={props.subject.image} size={'53px'} variant={'rounded'}/>

                        <h4 style={{color: hovered ? 'white' : '#555555'}}>
                            {props.subject.name.replace(/([a-z]+) .* ([a-z]+)/i, "$1 $2")}
                        </h4>
                        <h5
                            style={{color: hovered ? 'white' : '#777777', marginBottom: 0}}>
                            {props.subject.unit_acronym}
                        </h5>
                    </div>
                    :
                    <div style={{width: '100%', height: '100%', padding: '5px', color: hovered ? 'white' : '#262626',}}
                         className={[mainStyles.overflowEllipsis, mainStyles.displayInlineCenter].join(' ')}>
                        {props.subject.acronym}
                    </div>
                }
            </span>
            </Link>
            {!loading ?
                dependents.length > 0 ?
                    <ul>
                        {dependents.map(subject => (
                            <TreeNode dark={props.dark} redirect={props.redirect} subject={subject}
                                      type={props.type}/>
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

TreeNode.propTypes = {
    subject: PropTypes.object,
    type: PropTypes.string
}