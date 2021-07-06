import {Modal, Overview} from "sis-aeb-misc";
import PropTypes from 'prop-types'
import styles from "../../styles/Pop.module.css";
import {AddRounded, CloseRounded} from "@material-ui/icons";
import UnitPT from "../../packages/locales/SubjectPT";
import {useEffect, useState} from "react";
import ForumRequests from "../../utils/fetch/ForumRequests";
import handleObjectChange from "../../utils/shared/HandleObjectChange";
import PopFormPT from "../../packages/locales/PopFormPT";

export default function PopOverview(props) {
    const lang = PopFormPT

    const [entity, setEntity] = useState(null)
    useEffect(() => {
        if (props.open && props.data !== null && props.data !== undefined) {
            setEntity(props.data)
            ForumRequests.fetchContent(props.data.id).then(res => {
                if (res !== null) {
                    handleObjectChange({
                        event: {name: 'body', value: res.body},
                        setData: setEntity
                    })
                    handleObjectChange({
                        event: {name: 'image', value: res.image},
                        setData: setEntity
                    })
                    handleObjectChange({
                        event: {name: 'description', value: res.description},
                        setData: setEntity
                    })
                }
                console.log(res)
            })
        }
    }, [props])

    return (
        <Overview
            entity={entity}
            open={props.open}
            handleClose={() => props.handleClose()}
            rootElementID={'root'}
            fields={[
                {
                    label: lang.title,
                    field: 'title',
                    type: 'string'
                },
                {
                    label: lang.description,
                    field: 'description',
                    type: 'string'
                },
                {
                    label: lang.body,
                    field: 'body',
                    type: 'string'
                },
                {
                    label: lang.image,
                    field: 'image',
                    type: 'object',
                    renderObjectField: field => {
                        return (<img src={field}/>)
                    }
                }
            ]}
            applyHistory={null}/>
    )
}
PopOverview.propTypes = {
    handleClose: PropTypes.func,
    data: PropTypes.object,
    open: PropTypes.bool
}