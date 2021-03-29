import {Modal} from "@material-ui/core";
import CollaborationForm from "./CollaborationForm";
import React from "react";
import styles from '../../../../styles/form/Form.module.css'
export default class SimplifiedCollaboration extends React.Component{
    constructor(props) {
        super(props);
        this.state ={
            modal: false
        }
    }

    renderModal(){
        return(
            <Modal open={this.state.modal} onClose={() => this.setState({modal: false})}>
                <CollaborationForm collaborationID={this.props.collaborationID}
                                   dark={this.props.dark}
                                   mediumContainer={this.props.mediumContainer}
                                   smallContainer={this.props.smallContainer}
                                   selectStyle={this.props.selectStyle}
                />
            </Modal>
        )
    }
    render() {
        return(
            <div className={styles.simplified_collaboration_container}>
                {this.renderModal()}
            </div>
        )
    }
}