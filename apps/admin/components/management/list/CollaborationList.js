import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";

export default function CollaborationList(props) {
    // const [collaborations, setCollaborations] = useState([])
    //
    //
    // useEffect(() => {
    //     if(props.id !== undefined)
    //         fetchCollaborations(props.id).then(res => {
    //             setCollaborations(res)
    //         })
    // }, [props.id])
    //
    // return (
    //     <div style={{
    //         width: '100%',
    //         display: 'grid',
    //         justifyItems: 'center',
    //         gap: '16px'
    //     }}>
    //         <Collaboration memberID={props.id} create={true} key={'create'} index={undefined}
    //                        collaborationID={undefined} locale={props.locale} canEdit={props.editionMode}
    //                        fetch={() => fetchCollaborations(props.id).then(res => {
    //                            setCollaborations(res)
    //                        })}/>
    //
    //         {collaborations.map((collaboration, index) => (
    //             <div key={collaboration.id + '-collaboration-' + index} style={{width: '100%'}}>
    //                 <Collaboration memberID={props.id} collaborationID={collaboration.id} key={collaboration.id}
    //                                create={false} index={index} locale={props.locale} canEdit={props.editionMode}
    //                                fetch={() => fetchCollaborations(props.id).then(res => {
    //                                    setCollaborations(res)
    //                                })} />
    //             </div>
    //         ))
    //         }
    //     </div>
    // )
    return null
}

CollaborationList.propTypes = {
    dark: PropTypes.bool,
    editionMode: PropTypes.bool,
    id: PropTypes.string,
    locale: PropTypes.string
}
