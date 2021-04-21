import styles from '../../styles/index/Index.module.css'
import {Button, Divider} from "@material-ui/core";
import React, {useState} from 'react'
import {EmailRounded, PhoneRounded, WarningRounded} from "@material-ui/icons";
import Link from 'next/link'
import PropTypes from 'prop-types'
import {
    getBorder,
    getBoxShadow,
    getIconStyle, getSecondaryBackground, getPrimaryColor,
    getTertiaryBackground,
    getTertiaryColor
} from "../../styles/shared/MainStyles";
import mainStyles from '../../styles/shared/Main.module.css'
import AvatarLayout from "../shared/AvatarLayout";
import AccordionLayout from "../shared/layout/AccordionLayout";

const currentDate = new Date()

export default function PersonCard(props) {
    const active = props.unit !== undefined && props.unit !== null
    return (
        <Button onClick={() => props.redirect(props.profile.id)} style={{padding: 0}}>
            <AccordionLayout
                summary={
                    <div className={mainStyles.displayInlineSpaced}
                         style={{width: '50vw', padding: '5px 0px 5px 0px'}}>
                        <div
                            className={[mainStyles.tertiaryParagraph, mainStyles.displayInlineStart].join(' ')}
                            style={{
                                ...getTertiaryColor({dark: props.dark}),
                                ...{width: '7vw', transform: 'translateX(3px)'}
                            }}>
                            <AvatarLayout dark={false} key={props.profile.id} image={props.profile.image}
                                          cakeDay={((new Date(props.profile.birth)).getDay() === currentDate.getDay() && (new Date(props.profile.birth)).getMonth() === currentDate.getMonth())}/>
                        </div>
                        <div className={[mainStyles.secondaryParagraph, mainStyles.displayInlineStart].join(' ')}
                             style={{width: '13vw', transform: 'translateX(3px)'}}>
                            {props.profile.name}
                        </div>

                        <div className={[mainStyles.tertiaryParagraph, mainStyles.displayInlineStart].join(' ')}
                             style={{
                                 ...getTertiaryColor({dark: props.dark}),
                                 ...{width: '28vw', transform: 'translateX(3px)'}
                             }}>
                            {props.profile.corporate_email}
                        </div>
                        <div className={[mainStyles.tertiaryParagraph, mainStyles.displayInlineStart].join(' ')}
                             style={{
                                 ...getTertiaryColor({dark: props.dark}),
                                 ...{width: '10vw', transform: 'translateX(3px)'}
                             }}>
                            {props.profile.extension}
                        </div>
                        <div className={[mainStyles.tertiaryParagraph, mainStyles.displayInlineStart].join(' ')}
                             style={{
                                 width: '10vw', transform: 'translateX(3px)', color: 'white'
                             }}>
                            <div style={{
                                width: "fit-content",
                                height: '100%',
                                padding: '0px 10px 0px 10px',
                                borderRadius: '5px',
                                backgroundColor: active ? '#4ad862' : '#f54269'
                            }}>
                                {active ? 'Active' : 'Inactive'}
                            </div>

                        </div>
                        <div className={[mainStyles.tertiaryParagraph, mainStyles.displayInlineStart].join(' ')}
                             style={{
                                 ...getTertiaryColor({dark: props.dark}),
                                 ...{width: '10vw', transform: 'translateX(3px)'}
                             }}>
                            {props.unit === undefined || props.unit === null ? null : props.unit.acronym}
                        </div>
                    </div>
                }
                content={null}
                animationDelay={props.index * 200}
                asRow={true} disabled={false} key={props.profile.id} dark={false}
                background={undefined} openSize={undefined} closedSize={55}

                asButton={true} onClick={props.redirect}
            />
        </Button>
    )
}

PersonCard.proptypes = {
    dark: PropTypes.bool,
    profile: PropTypes.object,
    collaboration: PropTypes.object,
    id: PropTypes.string,
    inactiveLocale: PropTypes.string,
    lastActivity: PropTypes.number,
    redirect: PropTypes.func,
    index: PropTypes.number
}