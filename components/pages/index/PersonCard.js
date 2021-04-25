import React from 'react'
import PropTypes from 'prop-types'
import {getTertiaryColor} from "../../../styles/shared/MainStyles";
import mainStyles from '../../../styles/shared/Main.module.css'
import AvatarLayout from "./AvatarLayout";
import AccordionLayout from "../../layout/AccordionLayout";

const currentDate = new Date()

export default function PersonCard(props) {
    const active = props.unit !== undefined && props.unit !== null
    return (
        <AccordionLayout
            summary={

                <div className={mainStyles.rowContainer}>
                    <div
                        className={[mainStyles.displayInlineStart, mainStyles.overflowEllipsis].join(' ')}
                    >
                        <AvatarLayout dark={false} key={props.profile.id} image={props.profile.image}
                                      cakeDay={((new Date(props.profile.birth)).getDay() === currentDate.getDay() && (new Date(props.profile.birth)).getMonth() === currentDate.getMonth())}/>
                        <p className={mainStyles.secondaryParagraph}
                           style={{marginLeft: '5px', textTransform: 'capitalize'}}>{props.profile.name}</p>
                    </div>


                    <div className={[mainStyles.tertiaryParagraph, mainStyles.displayInlineStart, mainStyles.overflowEllipsis].join(' ')}
                         style={getTertiaryColor({dark: props.dark})}>
                        {props.profile.corporate_email}
                    </div>
                    <div className={[mainStyles.tertiaryParagraph, mainStyles.displayInlineStart].join(' ')}
                         style={getTertiaryColor({dark: props.dark})}>
                        {props.profile.extension}
                    </div>
                    <div className={[mainStyles.tertiaryParagraph, mainStyles.displayInlineStart].join(' ')}>
                        <div style={{
                            width: "fit-content",
                            height: 'auto',
                            padding: '0px 10px 0px 10px',
                            borderRadius: '5px',
                            backgroundColor: active ? '#4ad862' : '#f54269',
                            color: 'white'
                        }}>
                            {active ? 'Active' : 'Inactive'}
                        </div>

                    </div>
                    <div className={[mainStyles.tertiaryParagraph, mainStyles.displayInlineStart].join(' ')}
                         style={getTertiaryColor({dark: props.dark})}>
                        {props.unit === undefined || props.unit === null ? null : props.unit.acronym}
                    </div>
                </div>
            }
            content={null}
            animationDelay={props.index * 200}
            asRow={true} disabled={false} key={null} dark={false}
            background={undefined} openSize={undefined} closedSize={55}
            asButton={true} onClick={props.redirect}
        />
    )
}

PersonCard.proptypes = {
    dark: PropTypes.bool,
    profile: PropTypes.object,
    collaboration: PropTypes.object,
    id: PropTypes.string,
    inactiveLocale: PropTypes.string,
    lastActivity: PropTypes.number,
    index: PropTypes.number
}