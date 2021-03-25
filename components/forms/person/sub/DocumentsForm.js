import styles from "../../../../styles/form/Form.module.css";
import {Grid, TextField} from "@material-ui/core";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import React from "react";

export default class DocumentsForm extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className={styles.field_set_container} style={{borderBottom: (this.props.dark ? '#262d37 3px solid' : '#f4f8fb 3px solid')}}>
                <legend>
                    <p style={{fontSize: '1.2rem', fontWeight: 450}}>Documents</p>
                </legend>
                <div className={styles.form_row}>

                    <TextField disabled={this.props.disabled} label={'RG'} value={null} variant={"outlined"}
                               style={this.props.smallContainer} required/>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container justify="space-around">
                            <KeyboardDatePicker
                                style={{
                                    width: '93%',
                                    margin: 'auto',
                                    backgroundColor: (!this.props.dark ? '#f7f8fa' : '#272e38')
                                }}
                                inputVariant="outlined"
                                margin="normal"
                                id="dispatch-picker"
                                disabled={this.props.disabled}
                                label="Dispatch Date"
                                format="dd/MM/yyyy"
                                value={(new Date()).toLocaleDateString()}
                                // onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </Grid>
                    </MuiPickersUtilsProvider>
                    <TextField disabled={this.props.disabled} label={'Issuing body'} value={null} variant={"outlined"}
                               style={this.props.smallContainer} required/>
                </div>
                <div className={styles.form_row}>
                    <TextField disabled={this.props.disabled} label={'CPF'} value={null} variant={"outlined"}
                               style={this.props.smallContainer} required/>
                    <TextField disabled={this.props.disabled} label={'Work Card'} value={null}
                               variant={"outlined"} style={this.props.smallContainer}/>
                    <TextField disabled={this.props.disabled} label={'pis / pasep'} value={null} variant={"outlined"}
                               style={this.props.smallContainer}/>
                </div>

                <div className={styles.form_row}>
                    <TextField disabled={this.props.disabled} label={'Bank'} value={null} variant={"outlined"}
                               style={this.props.mediumContainer} />
                    <TextField disabled={this.props.disabled} label={'Agency'} value={null} variant={"outlined"}
                               style={this.props.mediumContainer} />
                </div>
                <div className={styles.form_row}>
                    <TextField disabled={this.props.disabled} label={'Voter Registration'}
                               value={null} variant={"outlined"}
                               style={this.props.smallContainer}/>
                    <TextField disabled={this.props.disabled} label={'Electoral zone'}
                               value={null} variant={"outlined"}
                               style={this.props.smallContainer}/>
                    <TextField disabled={this.props.disabled} label={'Electoral section'}
                               value={null} variant={"outlined"}
                               style={this.props.smallContainer}/>
                </div>
            </div>
        )
    }
}