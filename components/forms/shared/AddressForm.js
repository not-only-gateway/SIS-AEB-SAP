import styles from "../../../styles/form/Form.module.css";
import {TextField} from "@material-ui/core";
import React from "react";

export default class AddressForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={styles.field_set_container}
                 style={{borderBottom: (this.props.dark ? '#262d37 3px solid' : '#f4f8fb 3px solid')}}>
                <legend>
                    <p style={{fontSize: '1.2rem', fontWeight: 450}}>Address</p>
                </legend>
                <div className={styles.form_row}>
                    <TextField disabled={this.props.disabled} label={'CEP'} value={null} variant={"outlined"}
                               style={this.props.smallContainer} required/>
                    <TextField disabled={this.props.disabled} label={'Address'} value={null} variant={"outlined"}
                               style={this.props.smallContainer} required/>
                    <TextField disabled={this.props.disabled} label={'Address Complement'}
                               value={null} variant={"outlined"}
                               style={this.props.smallContainer}/>

                </div>
                <div className={styles.form_row}>
                    <TextField disabled={this.props.disabled} label={'Neighborhood'} value={null} variant={"outlined"}
                               style={this.props.smallContainer} required/>
                    <TextField disabled={this.props.disabled} label={'Street name'} value={null} variant={"outlined"}
                               style={this.props.smallContainer} required/>
                    <TextField disabled={this.props.disabled} label={'City (dropdown)'}
                               value={null} variant={"outlined"}
                               style={this.props.smallContainer}/>
                </div>
            </div>
        )
    }
}