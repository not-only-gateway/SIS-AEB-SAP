import styles from "../../../../styles/form/Form.module.css";
import {TextField} from "@material-ui/core";
import React from "react";

export default class ContactForm extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className={styles.field_set_container}
                 style={{borderBottom: (this.props.dark ? '#262d37 3px solid' : '#f4f8fb 3px solid')}}>
                <legend>
                    <p style={{fontSize: '1.2rem', fontWeight: 450}}>Contact</p>
                </legend>

                <div className={styles.form_row}>
                    <TextField disabled={this.props.disabled} label={'Email'} value={null}
                               variant={"outlined"} style={this.props.mediumContainer} required/>
                    <TextField disabled={this.props.disabled} label={'Alt Email'} value={null}
                               variant={"outlined"} style={this.props.mediumContainer}/>
                </div>
                <div className={styles.form_row}>
                    <TextField disabled={this.props.disabled} label={'Phone'} value={null}
                               variant={"outlined"} style={this.props.mediumContainer} required/>
                    <TextField disabled={this.props.disabled} label={'Alt Phone'} value={null}
                               variant={"outlined"} style={this.props.mediumContainer}/>
                </div>
            </div>

        )
    }
}