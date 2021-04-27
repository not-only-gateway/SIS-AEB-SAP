import PropTypes from 'prop-types'
import React from "react";
import mainStyles from "../../styles/shared/Main.module.css";
import {getTertiaryColor} from "../../styles/shared/MainStyles";
import Accordion from "../layout/Accordion";
import ProfilePersona from "../elements/profile/ProfilePersona";

export default function ExtensionsList(props) {
    const currentDate = new Date()

    return (
        <div style={{display: 'grid', marginTop: '10px', width: '100%'}}>
            {(props.data).map((collaborator, index) =>
                <div key={collaborator.profile.id} onClick={() => props.redirect(collaborator.profile.id)} style={{padding: 0}}>
                    <Accordion
                        summary={
                            <div className={mainStyles.rowContainer}  style={{height: '90px'}}>
                                <div
                                    className={[mainStyles.displayInlineStart, mainStyles.overflowEllipsis].join(' ')}
                                >
                                    <ProfilePersona dark={false} key={collaborator.profile.id} image={collaborator.profile.image} size={'70px'} variant={'circle'}
                                                    cakeDay={((new Date(collaborator.profile.birth)).getDay() === currentDate.getDay() && (new Date(collaborator.profile.birth)).getMonth() === currentDate.getMonth())}/>
                                    <p className={mainStyles.secondaryParagraph}
                                       style={{marginLeft: '5px', textTransform: 'capitalize'}}>{collaborator.profile.name}</p>
                                </div>
                                <div className={[mainStyles.tertiaryParagraph, mainStyles.displayInlineCenter, mainStyles.overflowEllipsis].join(' ')}
                                     style={getTertiaryColor({dark: false})}>
                                    {collaborator.profile.corporate_email}
                                </div>
                                <div className={[mainStyles.tertiaryParagraph, mainStyles.displayInlineCenter].join(' ')}
                                     style={getTertiaryColor({dark: false})}>
                                    {collaborator.profile.extension}
                                </div>
                                <div className={[mainStyles.tertiaryParagraph, mainStyles.displayInlineCenter].join(' ')}
                                     style={getTertiaryColor({dark: false})}>
                                    {collaborator.unit === undefined || collaborator.unit === null ? null : collaborator.unit.acronym}
                                </div>
                                <div className={[mainStyles.tertiaryParagraph, mainStyles.displayInlineCenter].join(' ')}>
                                    <div style={{
                                        width: "fit-content",
                                        height: 'auto',
                                        padding: '0px 10px 0px 10px',
                                        borderRadius: '5px',
                                        backgroundColor: collaborator.unit !== undefined && collaborator.unit !== null ? '#4ad862' : '#f54269',
                                        color: 'white'
                                    }}>
                                        {collaborator.unit !== undefined && collaborator.unit !== null ? 'Active' : 'Inactive'}
                                    </div>
                                </div>

                            </div>
                        }
                        content={null}
                        animationDelay={index * 200}
                        asRow={true} disabled={false} key={null} dark={false}
                        background={undefined} openSize={undefined} closedSize={100}
                        asButton={true} onClick={props.redirect}
                    />
                </div>
            )}

        </div>
    )
}
ExtensionsList.propTypes = {
    data: PropTypes.array,
    sorterMethod: PropTypes.string,
    redirect: PropTypes.func,
    inactiveLocale: PropTypes.string,
}