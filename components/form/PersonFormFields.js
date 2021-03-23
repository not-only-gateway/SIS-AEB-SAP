import styles from "../../styles/form/Form.module.css";
import {Button, createMuiTheme, InputBase, Paper, TextField} from "@material-ui/core";
import {ThemeProvider} from "@material-ui/styles";
import {paperStyle} from "../../styles/form/FormMaterialStyles";
import React from "react";
import {Label} from "@material-ui/icons";
import Cookies from "universal-cookie/lib";

export default class PersonFormFields extends React.Component{

    constructor(props){
        super(props)
        this.state={
            theme: createMuiTheme({
                palette: {
                    type: (new Cookies()).get('theme') === '0' ? "dark" : "light"
                }
            })
        }
    }

    componentDidMount() {

    }

    render() {
        switch (this.props.page){
            case 0: {
                return(
                    <div className={styles.page_container}>
                        <fieldset className={styles.field_set} style={{border : (this.props.dark ? '#262d37 3px solid':'#f4f8fb 3px solid')}}>
                            <legend>
                                <p style={{fontSize: '1.15rem', fontWeight: 440}}>Personal</p>
                            </legend>
                            <ThemeProvider theme={this.state.theme}>
                                <div className={styles.form_row}>
                                    <TextField label={'Name'} value={this.props.name} variant={"outlined"} style={{width: '32vw', backgroundColor: (!this.props.dark ? '#f7f8fa': '#272e38')}} required/>
                                </div>
                                <div className={styles.form_row}>
                                    <TextField label={'Education'} value={this.props.name} variant={"outlined"} style={{width: '14vw', backgroundColor: (!this.props.dark ? '#f7f8fa': '#272e38')}} required/>
                                    <TextField label={'Marital Status'} value={this.props.name} variant={"outlined"} style={{width: '14vw', backgroundColor: (!this.props.dark ? '#f7f8fa': '#272e38')}} required/>
                                </div>
                                <div className={styles.form_row}>
                                    <TextField label={'Gender'} value={this.props.name} variant={"outlined"} style={{width: '14vw', backgroundColor: (!this.props.dark ? '#f7f8fa': '#272e38')}} required/>
                                    <TextField label={'Birth'} value={this.props.name} variant={"outlined"} style={{width: '14vw', backgroundColor: (!this.props.dark ? '#f7f8fa': '#272e38')}} required/>
                                </div>
                                <div className={styles.form_row}>
                                    <TextField label={'CPF'} value={this.props.name} variant={"outlined"} style={{width: '10.33333vw', backgroundColor: (!this.props.dark ? '#f7f8fa': '#272e38')}} required/>
                                    <TextField label={'RG'} value={this.props.name} variant={"outlined"} style={{width: '10.33333vw', backgroundColor: (!this.props.dark ? '#f7f8fa': '#272e38')}} required/>
                                    <TextField label={'Voter Registration'} value={this.props.name} variant={"outlined"} style={{width: '10.33333vw', backgroundColor: (!this.props.dark ? '#f7f8fa': '#272e38')}}/>
                                </div>
                                <div className={styles.form_row}>
                                    <TextField label={'Work Card'} value={this.props.name} variant={"outlined"} style={{width: '14vw', backgroundColor: (!this.props.dark ? '#f7f8fa': '#272e38')}}/>
                                    <TextField label={'pis / pasep'} value={this.props.name} variant={"outlined"} style={{width: '14vw', backgroundColor: (!this.props.dark ? '#f7f8fa': '#272e38')}}/>
                                </div>
                            </ThemeProvider>
                        </fieldset>
                        <fieldset className={styles.field_set} style={{ border : (this.props.dark ? '#262d37 3px solid':'#f4f8fb 3px solid')}}>
                            <legend>
                                <p style={{fontSize: '1.15rem', fontWeight: 440}}>Contact</p>
                            </legend>
                            <ThemeProvider theme={this.state.theme}>
                                <div className={styles.form_row}>
                                    <TextField label={'Email'} value={this.props.name} variant={"outlined"} style={{width: '14vw', backgroundColor: (!this.props.dark ? '#f7f8fa': '#272e38')}} required/>
                                    <TextField label={'Alt Email'} value={this.props.name} variant={"outlined"} style={{width: '14vw', backgroundColor: (!this.props.dark ? '#f7f8fa': '#272e38')}}/>
                                </div>
                                <div className={styles.form_row}>
                                    <TextField label={'Phone'} value={this.props.name} variant={"outlined"} style={{width: '14vw', backgroundColor: (!this.props.dark ? '#f7f8fa': '#272e38')}} required/>
                                    <TextField label={'Alt Phone'} value={this.props.name} variant={"outlined"} style={{width: '14vw', backgroundColor: (!this.props.dark ? '#f7f8fa': '#272e38')}}/>
                                </div>
                                <div className={styles.form_row}>
                                    <TextField label={'Address'} value={this.props.name} variant={"outlined"} style={{width: '14vw', backgroundColor: (!this.props.dark ? '#f7f8fa': '#272e38')}} required/>
                                    <TextField label={'CEP'} value={this.props.name} variant={"outlined"} style={{width: '14vw', backgroundColor: (!this.props.dark ? '#f7f8fa': '#272e38')}} required/>
                                </div>
                                <div className={styles.form_row}>
                                    <TextField label={'Address Complement'} value={this.props.name} variant={"outlined"} style={{width: '32vw', backgroundColor: (!this.props.dark ? '#f7f8fa': '#272e38')}}/>
                                </div>
                            </ThemeProvider>
                        </fieldset>
                    </div>
                )
            }
            case 1: {
                return(
                    <fieldset className={styles.field_set} style={{border : (this.props.dark ? '#262d37 3px solid':'#f4f8fb 3px solid')}}>
                        <legend>Corporate Information</legend>
                        <ThemeProvider theme={this.state.theme}>
                            <div className={styles.form_row}>
                                <TextField label={'Corp Email'} value={this.props.name} variant={"outlined"} style={{width: '14vw', backgroundColor: (!this.props.dark ? '#f7f8fa': '#272e38')}} required/>
                                <TextField label={'Extension'} value={this.props.name} variant={"outlined"} style={{width: '14vw', backgroundColor: (!this.props.dark ? '#f7f8fa': '#272e38')}} required/>
                            </div>
                            <div className={styles.form_row}>
                                <TextField label={'Registration'} value={this.props.name} variant={"outlined"} style={{width: '10.3vw'}}/>
                                <TextField label={'Official Publication'} value={this.props.name} variant={"outlined"} style={{width: '10.3vw'}}/>
                                <TextField label={'Admission Date'} value={this.props.name} variant={"outlined"} style={{width: '10.3vw'}} required/>
                            </div>
                            <div className={styles.form_row}>
                                <TextField label={'Unity'} value={this.props.name} variant={"outlined"} style={{width: '14vw'}} />
                                <TextField label={'Superior'} value={this.props.name} variant={"outlined"} style={{width: '14vw'}}/>
                            </div>
                            <div className={styles.form_row}>
                                <TextField label={'Role'} value={this.props.name} variant={"outlined"} style={{width: '14vw'}}/>
                                <TextField label={'Substitute'} value={this.props.name} variant={"outlined"} style={{width: '7.5vw'}}/>
                                <TextField label={'Active on role'} value={this.props.name} variant={"outlined"} style={{width: '7.5vw'}}/>
                            </div>

                            <div className={styles.form_row}>
                                <TextField label={'Legal Document'} value={this.props.name} variant={"outlined"} style={{width: '14vw'}}/>
                                <TextField label={'level'} value={this.props.name} variant={"outlined"} style={{width: '7.5vw'}}/>
                                <TextField label={'Linkage'} value={this.props.name} variant={"outlined"} style={{width: '7.5vw'}}/>
                            </div>
                        </ThemeProvider>
                    </fieldset>
                )
            }
            default: {
                return null
            }
        }
    }
}