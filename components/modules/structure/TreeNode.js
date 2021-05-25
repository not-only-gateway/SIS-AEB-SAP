import PropTypes from 'prop-types'
import React, {useEffect, useState} from "react";
import axios from "axios";
import Host from "../../../utils/shared/Host";
import Cookies from "universal-cookie/lib";
import Link from 'next/link'
import mainStyles from '../../../styles/shared/Main.module.css'
import animations from '../../../styles/shared/Animations.module.css'
import ProfilePersona from "../../elements/ProfilePersona";

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
                pathname: props.type === 'unit' ? '/unit' : '/person',
                query: {id: props.subject.id}
            }}>
            <span onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                  style={{
                      width: 'clamp(150px, 150px, 200px)',
                      height: props.type !== 'unit' ? 'clamp(150px, 150px, 200px)' : '50px',
                      border: hovered || props.hoveredParent ? '#0095ff .7px solid' : '#ecedf2 .7px solid',
                      boxSizing: 'border-box'
                  }}
                  className={animations.popInAnimation}>
                {props.type !== 'unit' ?
                    <div style={{
                        display: 'grid',
                        gap: '8px',
                        justifyContent: 'center',
                        justifyItems: 'center',
                        width: '100%',
                        padding: '8px',
                        transition: '300ms ease-in-out',
                        overflow: "hidden",
                    }}>

                        <ProfilePersona base64={false} dark={false} key={props.subject.id} cakeDay={false}
                                        elevation={true} image={props.subject.image} size={'53px'} variant={'rounded'}/>
                        <div style={{maxWidth: '130px'}}>
                            <h4  className={mainStyles.overflowEllipsis} style={{
                                color: '#555555',
                                width: '100%',

                            }}>
                                {props.subject.name.replace(/([a-z]+) .* ([a-z]+)/i, "$1 $2")}
                            </h4>
                        </div>
                        <h5
                            style={{
                                marginTop: "auto",
                                color: '#777777', marginBottom: 0
                            }}>
                            {props.subject.unit_acronym}
                        </h5>
                    </div>
                    :
                    <div style={{
                        width: '100%',
                        height: '100%',
                        padding: '8px',
                        color: '#262626',
                        transition: '300ms ease-in-out'
                    }}
                         className={[mainStyles.overflowEllipsis, mainStyles.displayInlineCenter].join(' ')}>
                        {props.subject.acronym}
                    </div>
                }
            </span>
            </Link>
            {!loading && dependents.length > 0 ?
                <ul>
                    {dependents.map(subject => (
                        <TreeNode dark={props.dark} redirect={props.redirect} subject={subject}
                                  type={props.type}
                                  hoveredParent={props.hoveredParent ? props.hoveredParent : hovered}/>
                    ))}
                </ul>
                :
                null
            }
        </li>
    )
}

TreeNode.propTypes = {
    subject: PropTypes.object,
    type: PropTypes.string,
    hoveredParent: PropTypes.bool
}