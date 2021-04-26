import PropTypes from 'prop-types'
import React from "react";
import mainStyles from "../../styles/shared/Main.module.css";
import {getTertiaryColor} from "../../styles/shared/MainStyles";
import Accordion from "../layout/Accordion";
import ProfilePersona from "../elements/profile/ProfilePersona";

export default function ExtensionsList(props) {
    const currentDate = new Date()

    function sorter() {
        let response = [...props.data]
        switch (props.sorterMethod) {
            case 'name': {
                response.sort(function (a, b) {

                    if (a.profile.name > b.profile.name) {
                        return -1;
                    }
                    if (a.profile.name < b.profile.name) {
                        return 1;
                    }
                    return 0;
                })
                break
            }
            case 'extension': {
                response.sort((a, b) => (b.profile.extension - a.profile.extension))
                break
            }
            default:
                break
        }
        return response
    }

    return (
        <div style={{display: 'grid', gap: '10px', marginTop: '10px'}}>
            {(sorter()).map((collaborator, index) =>
                <div key={collaborator.profile.id} onClick={() => props.redirect(collaborator.profile.id)} style={{padding: 0}}>
                    <Accordion
                        summary={

                            <div className={mainStyles.rowContainer}  style={{height: '80px'}}>
                                <div
                                    className={[mainStyles.displayInlineStart, mainStyles.overflowEllipsis].join(' ')}
                                >
                                    <ProfilePersona dark={false} key={collaborator.profile.id} image={collaborator.profile.image}
                                                  cakeDay={((new Date(collaborator.profile.birth)).getDay() === currentDate.getDay() && (new Date(collaborator.profile.birth)).getMonth() === currentDate.getMonth())}/>
                                    <p className={mainStyles.secondaryParagraph}
                                       style={{marginLeft: '5px', textTransform: 'capitalize'}}>{collaborator.profile.name}</p>
                                </div>
                                <div className={[mainStyles.tertiaryParagraph, mainStyles.displayInlineStart, mainStyles.overflowEllipsis].join(' ')}
                                     style={getTertiaryColor({dark: false})}>
                                    {collaborator.profile.corporate_email}
                                </div>
                                <div className={[mainStyles.tertiaryParagraph, mainStyles.displayInlineStart].join(' ')}
                                     style={getTertiaryColor({dark: false})}>
                                    {collaborator.profile.extension}
                                </div>
                                <div className={[mainStyles.tertiaryParagraph, mainStyles.displayInlineStart].join(' ')}>
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
                                <div className={[mainStyles.tertiaryParagraph, mainStyles.displayInlineStart].join(' ')}
                                     style={getTertiaryColor({dark: false})}>
                                    {collaborator.unit === undefined || collaborator.unit === null ? null : collaborator.unit.acronym}
                                </div>
                            </div>
                        }
                        content={null}
                        animationDelay={index * 200}
                        asRow={true} disabled={false} key={null} dark={false}
                        background={undefined} openSize={undefined} closedSize={55}
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