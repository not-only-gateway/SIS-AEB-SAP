import PropTypes from 'prop-types'
import NodeTemplate from "../../templates/NodeTemplate";
import styles from '../../styles/NodeOverview.module.css'
import {CloseRounded, EditRounded} from "@material-ui/icons";
import {useState} from "react";
import NodeForm from "./NodeForm";

export default function NodeOverview(props) {
    const [openForm, setOpenForm] = useState(false)
    return openForm || props.node.description === undefined || props.node.description === null ? <NodeForm node={props.node} data={props.data} setState={props.setState} handleClose={props.handleClose}/> : (
        <div className={styles.overviewContainer} id={'node-overview'}>
            <button className={styles.closeButtonContainer} onClick={() => props.handleClose()}>
                <CloseRounded/>
            </button>
            <div className={styles.body}>
                <div className={styles.header}>
                    <div style={{
                        fontSize: '20px',
                        fontWeight: 'bold',
                        fontFamily: 'Roboto',
                        color: '#393C44',
                        display: 'flex',
                        gap: '16px',
                        alignItems: 'center'
                    }}>
                        {props.node.title}
                        <button className={styles.buttonContainer} onClick={() => setOpenForm(true)}>
                            <EditRounded/>
                        </button>
                    </div>
                    <div style={{fontSize: '.9rem', fontFamily: 'Roboto', color: '#393C44'}}>
                        {props.node.description}
                    </div>
                </div>

                <div style={{fontSize: '.9rem', fontFamily: 'Roboto', color: '#393C44'}}>
                    {props.node.body}
                </div>
            </div>
            <div className={styles.footer}>
                <div style={{fontFamily: 'Roboto'}}>
                    Criado em:
                </div>
                <div style={{fontSize: '.9rem', fontFamily: 'Roboto', color: '#393C44'}}>
                    {new Date(props.node.creationDate).toDateString()}
                </div>

            </div>
        </div>
    )
}

NodeOverview.propTypes = {
    node: NodeTemplate,
    setState: PropTypes.func,
    data: PropTypes.object,
    handleClose: PropTypes.func,
}