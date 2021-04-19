import PropTypes from 'prop-types'
import React, {useEffect, useState} from "react";
import axios from "axios";
import Host from "../../utils/shared/Host";
import Cookies from "universal-cookie/lib";
import shared from '../../styles/shared/Shared.module.css'
import styles from '../../styles/Structure.module.css'
import Link from 'next/link'
import {Avatar, createMuiTheme, ThemeProvider} from "@material-ui/core";
import mainStyles from '../../styles/shared/Main.module.css'
import {
    getBorder,
    getBoxShadow, getSecondaryBackground,
    getQuaternaryBackground, getPrimaryBackground,
    getSecondaryColor,
    getTertiaryColor
} from "../../styles/shared/MainStyles";

export default function SubjectLayout(props) {
    const [dependents, setDependents] = useState([])
    const [hovered, setHovered] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        console.log(props.subject)
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
        <ThemeProvider theme={createMuiTheme({
            palette: {
                type: props.dark ? "dark" : "light"
            }
        })}>

            <li key={'subject-layout-' + props.subject.id + props.type}>
                <Link href={{
                    pathname: '/' + props.type === 'unit' ? props.type : 'person',
                    query: {id: props.subject.id}
                }}>
            <span onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                  style={{
                      ...getPrimaryBackground({dark: props.dark}),
                      ...getBoxShadow({dark: props.dark}),
                      ...{
                          cursor: 'pointer',
                          minWidth: '75px',
                          minHeight: '75px'
                      }
                  }}
                  className={[mainStyles.popInAnimation, mainStyles.normalBorder, mainStyles.displayInlineCenter].join(' ')}>
                {props.type !== 'unit' ?
                    <div className={styles.subject_person_container}>

                        <Avatar src={props.subject.pic}/>

                        <p className={mainStyles.primaryParagraph} style={getSecondaryColor({dark: props.dark})}>
                            {props.subject.name.replace(/([a-z]+) .* ([a-z]+)/i, "$1 $2")}
                        </p>
                        <p className={mainStyles.tertiaryParagraph}
                           style={{...getTertiaryColor({dark: props.dark}), ...{lineHeight: '0'}}}>
                            {props.subject.unit_acronym}
                        </p>
                    </div>
                    :
                    <>
                        <p className={mainStyles.primaryParagraph} style={{...getSecondaryColor({dark: props.dark}), ...{textTransform: 'uppercase', margin: 'auto'}}}>
                            {props.subject.acronym}
                        </p>
                    </>
                }
            </span>
                </Link>
                {!loading ?
                    dependents.length > 0 ?
                        <ul>
                            {dependents.map(subject => (
                                <SubjectLayout dark={props.dark} redirect={props.redirect} subject={subject}
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
        </ThemeProvider>
    )
}

SubjectLayout.propTypes = {
    dark: PropTypes.bool,
    subject: PropTypes.object,
    type: PropTypes.string
}