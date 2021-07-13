import PropTypes from 'prop-types'
import React, {useEffect, useRef, useState} from "react";
import ForumRequests from "../../utils/fetch/ForumRequests";
// import PopOverview from "./PopOverview";
// import PopForm from "./PopForm";
// import handleObjectChange from "../../utils/shared/HandleObjectChange";
import Cookies from "universal-cookie/lib";
import submitSubjectLayout from "../../utils/submit/SubmitSubjectLayout";
import {Alert} from "sis-aeb-misc";
import deletePop from "../../utils/submit/DeletePop";
// import SubjectEditModal from "./SubjectEditModal";
// import LinkForm from "./LinkForm";
import Canvas from "../shared/canvas/Canvas";
import HandleChange from "../shared/canvas/methods/HandleChange";
import submitPop from "../../utils/submit/SubmitPop";
import DataModel from "../shared/canvas/DataModel";


export default function Pops(props) {
    const [pops, setPops] = useState([])
    const changed = useRef(false)
    const popsRef = useRef([])
    const [currentEntity, setCurrentEntity] = useState(null)

    const [openForm, setOpenForm] = useState(false)
    const [openSubjectForm, setOpenSubjectForm] = useState(false)
    const [show, setShow] = useState(false)
    const [status, setStatus] = useState({type: undefined, message: undefined})
    const [linkEntity, setLinkEntity] = useState({
        child: null,
        parent: null
    })
    const updatePops = () => {
        changed.current = false
        submitSubjectLayout({
            setStatus: () => null,
            data: popsRef.current,
            subject: props.subjectID
        })


    }
    useEffect(() => {
        ForumRequests.listPops(props.subjectID).then(res => {
            setPops(res)
            popsRef.current = res
        })
    }, [])

    return (
        <div style={{display: 'grid',}}>
            <Alert
                type={status.type} render={status.type !== undefined} rootElementID={'root'}
                handleClose={() => setStatus({type: undefined, message: undefined})} message={status.message}
            />
            <Canvas
                options={{
                    move: (new Cookies()).get('jwt') !== undefined,
                    edit: (new Cookies()).get('jwt') !== undefined,
                    show: true
                }} onSave={data => {
                let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
                let downloadAnchorNode = document.createElement('a');
                downloadAnchorNode.setAttribute("href", dataStr);
                downloadAnchorNode.setAttribute("download","Canvas.json");
                document.body.appendChild(downloadAnchorNode)
                downloadAnchorNode.click()
                downloadAnchorNode.remove()
            }}
                data={DataModel}
            />
        </div>
    )
}
Pops.propTypes = {
    subjectID: PropTypes.any,
    data: PropTypes.object,
    handleChange: PropTypes.func
}