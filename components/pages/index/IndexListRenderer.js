import PropTypes from 'prop-types'
import PersonCard from "./PersonCard";
import React from "react";

export default function IndexListRenderer(props) {
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

    return (sorter()).map((collaborator, index) =>
        <div key={collaborator.profile.id} onClick={() => props.redirect(collaborator.profile.id)} style={{padding: 0}}>
            <PersonCard
                profile={collaborator.profile}
                collaboration={collaborator.collaboration}
                unit={collaborator.unit}
                lastActivity={collaborator.last_activity}
                dark={false}
                index={index}
                asProfile={false}
                inactiveLocale={props.inactiveLocale}
                redirect={props.redirect}
            />
        </div>
    )
}
IndexListRenderer.propTypes = {
    data: PropTypes.array,
    sorterMethod: PropTypes.string,
    redirect: PropTypes.func,
    inactiveLocale: PropTypes.string,
}