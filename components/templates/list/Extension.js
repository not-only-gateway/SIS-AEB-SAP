import PropTypes from 'prop-types'
import React, {useEffect, useState} from "react";
import mainStyles from "../../../styles/shared/Main.module.css";
import {getTertiaryColor} from "../../../styles/shared/MainStyles";
import {Button} from "@material-ui/core";
import ProfilePersona from "../../elements/ProfilePersona";
import getComponentLanguage from "../../../utils/shared/GetComponentLanguage";
import {HowToVote} from "@material-ui/icons";

export default function Extension(props) {
    const currentDate = new Date()
    const [hovered, setHovered] = useState(false)
    const [lang, setLang] = useState(null)
    const headerStyle = {
        marginTop: "0",
        marginBottom: 0,
        marginRight: '5px',
        color: hovered ? 'white' : '#262626',
        transition: '300ms ease-in-out'
    }
    const secondaryHeaderStyle={
        color: hovered ? '#f2f2f2' : '#555555',
        marginBottom: 0,
        marginTop: 0,
        transition: '300ms ease-in-out'
    }
    useEffect(() => {
        if (lang === null)
            setLang(getComponentLanguage({locale: props.locale, component: 'extension'}))
    }, [])

    if (lang !== null)
        return (
            <Button key={props.data.member.id} onClick={() => props.redirect(props.data.member.id)}
                    onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
                    style={{
                        animationDelay: props.index * 200 + 'ms',
                        width: '100%',
                        height: '100%',
                        textTransform: 'none',
                        borderRadius: '8px',
                        backgroundColor: hovered ? '#0095ff' : 'white',
                        boxShadow: hovered ? 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' : 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px',
                        transition: '300ms ease-in-out',
                        color: hovered ? 'white' : 'initial'
                    }}>
                <div className={mainStyles.rowContainer} style={{height: 'auto'}}>
                    <div
                        className={[mainStyles.displayInlineStart, mainStyles.overflowEllipsis].join(' ')}
                    >
                        <ProfilePersona dark={false} key={props.data.member.id}
                                        image={props.data.member.image} size={'65px'} variant={'rounded'}
                                        elevation={hovered}
                                        cakeDay={((new Date(props.data.member.birth)).getDay() === currentDate.getDay() && (new Date(props.data.member.birth)).getMonth() === currentDate.getMonth())}/>
                        <p className={mainStyles.secondaryParagraph}
                           style={{
                               ...headerStyle, ...{
                                   marginLeft: '5px',
                                   textTransform: 'capitalize'
                               }
                           }}>{props.data.member.name}</p>
                    </div>
                    <div
                        className={mainStyles.displayInlineSpaced}
                        style={getTertiaryColor({dark: false})}>
                        <h5 style={headerStyle}>Email:</h5>
                        <h5 style={secondaryHeaderStyle}>{props.data.member.corporate_email}</h5>

                    </div>
                    <div className={[mainStyles.tertiaryParagraph, mainStyles.displayInlineCenter].join(' ')}
                         style={getTertiaryColor({dark: false})}>
                        <h5 style={headerStyle}>{lang.extension}:</h5>
                        <h5 style={secondaryHeaderStyle}>{props.data.member.extension}</h5>
                    </div>
                    {props.data.unit === undefined || props.data.unit === null ?
                        null
                        :
                        <div className={[mainStyles.tertiaryParagraph, mainStyles.displayInlineCenter].join(' ')}
                             style={getTertiaryColor({dark: false})}>
                            <h5 style={headerStyle}>{lang.unit}:</h5>
                            <h5 style={secondaryHeaderStyle}>{props.data.unit.acronym}</h5>

                        </div>
                    }
                    <div className={[mainStyles.tertiaryParagraph, mainStyles.displayInlineCenter].join(' ')}>
                        <h5 style={headerStyle}>Status:</h5>
                        <div style={{
                            width: "fit-content",
                            height: 'auto',
                            padding: '0px 10px 0px 10px',
                            borderRadius: '5px',
                            backgroundColor: props.data.unit !== undefined && props.data.unit !== null ? '#4ad862' : '#f54269',
                            color: 'white'
                        }}>

                            {props.data.unit !== undefined && props.data.unit !== null ? lang.active : lang.inactive}
                        </div>
                    </div>

                </div>
            </Button>
        )
    else
        return null
}
Extension.propTypes = {
    data: PropTypes.object,
    redirect: PropTypes.func,
    index: PropTypes.number,
    locale: PropTypes.string
}