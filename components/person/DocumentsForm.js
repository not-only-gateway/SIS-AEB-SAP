import styles from "../../styles/form/Form.module.css";
import {Button, Grid, TextField} from "@material-ui/core";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import React from "react";
import {Skeleton} from "@material-ui/lab";
import axios from "axios";
import Host from "../../utils/Host";
import Cookies from "universal-cookie/lib";

export default class DocumentsForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            changed: false,
            cpf: null,
            rg: null,
            dispatchDate: null,
            issuingBody: null,
            voterRegistration: null,
            electoralZone: null,
            electoralSection: null,
            bank: null,
            agency: null,
            workCard: null,
            pis: null
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleDateChange = this.handleDateChange.bind(this)
    }

    componentDidMount() {
        this.fetchData().catch(error => console.log(error))
    }

    async fetchData() {
        await this.props.fetchData('form/documents', {id: this.props.id}).then(res => {
            if (res !== null)
                this.setState({
                    cpf: res.cpf,
                    rg: res.rg,
                    dispatchDate: res.dispatch_date,
                    issuingBody: res.issuing_body,
                    voterRegistration: res.voter_registration,
                    electoralZone: res.electoral_zone,
                    electoralSection: res.electoral_section,
                    bank: res.bank,
                    agency: res.agency,
                    workCard: res.work_card,
                    pis: res.pis
                })
        })

        this.setState({loading: false})
    }

    async saveChanges() {
        await this.props.saveChanges(
            'form/contact',
            {
                id: this.props.id,
                cpf: this.state.cpf,
                rg: this.state.rg,
                dispatch_date: this.state.dispatchDate,
                issuing_body: this.state.issuingBody,
                voter_registration: this.state.voterRegistration,
                electoral_zone: this.state.electoralZone,
                electoral_section: this.state.electoralSection,
                bank: this.state.bank,
                agency: this.state.agency,
                work_card: this.state.workCard,
                pis: this.state.pis,
            },
            'put'
        ).then(res => res ? this.setState({changed: false}) : console.log(res))
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,

        })
        if (!this.state.changed)
            this.setState({
                changed: true
            })
    }

    handleDateChange(event) {
        this.setState({
            dispatchDate: event.getTime()
        })
    }

    render() {
        if (!this.state.loading)
            return (
                <div className={styles.form_component_container}
                     style={{borderBottom: (this.props.dark ? '#262d37 3px solid' : '#f4f8fb 3px solid')}}>
                    <legend style={{width: '100%'}}>
                        <p style={{fontSize: '1.2rem', fontWeight: 450}}>Documents</p>
                    </legend>

                    <TextField disabled={this.props.disabled} label={'RG'} value={this.state.rg}
                               variant={"outlined"}
                               onChange={this.handleChange} name={'rg'}
                               style={this.props.smallContainer} required/>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container justify="space-around"
                              style={{width: '32%', marginTop: '0vh', marginBottom: 'auto'}}>
                            <KeyboardDatePicker
                                style={{
                                    margin: 'auto',
                                    backgroundColor: (!this.props.dark ? '#f7f8fa' : '#272e38')
                                }}
                                inputVariant="outlined"
                                margin="normal"
                                id="dispatch-picker"
                                disabled={this.props.disabled}
                                label="Dispatch Date"
                                format="dd/MM/yyyy"
                                value={this.state.dispatchDate === null ? null : (new Date(this.state.dispatchDate)).toLocaleDateString()}
                                onChange={this.handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </Grid>
                    </MuiPickersUtilsProvider>
                    <TextField disabled={this.props.disabled} label={'Issuing body'} value={this.state.issuingBody}
                               variant={"outlined"}
                               style={this.props.smallContainer}
                               onChange={this.handleChange} name={'issuingBody'}
                               required/>
                    <TextField disabled={this.props.disabled} label={'CPF'} value={this.state.cpf}
                               variant={"outlined"}
                               onChange={this.handleChange} name={'cpf'}
                               style={this.props.smallContainer} required/>
                    <TextField disabled={this.props.disabled} label={'Work Card'} value={this.state.workCard}
                               onChange={this.handleChange} name={'workCard'}
                               variant={"outlined"} style={this.props.smallContainer}/>
                    <TextField disabled={this.props.disabled} label={'pis / pasep'} value={this.state.pis}
                               variant={"outlined"}
                               onChange={this.handleChange} name={'pis'}
                               style={this.props.smallContainer}/>
                    <TextField disabled={this.props.disabled} label={'Bank'} value={this.state.bank}
                               variant={"outlined"}
                               style={this.props.mediumContainer} name={'bank'} onChange={this.handleChange}/>
                    <TextField disabled={this.props.disabled} label={'Agency'} value={this.state.agency}
                               variant={"outlined"}
                               style={this.props.mediumContainer} name={'agency'} onChange={this.handleChange}/>
                    <TextField disabled={this.props.disabled} label={'Voter Registration'}
                               value={this.state.voterRegistration} variant={"outlined"} name={'voterRegistration'}
                               style={this.props.smallContainer} onChange={this.handleChange}/>
                    <TextField disabled={this.props.disabled} label={'Electoral zone'}
                               value={this.state.electoralZone} variant={"outlined"} name={'electoralZone'}
                               style={this.props.smallContainer} onChange={this.handleChange}/>
                    <TextField disabled={this.props.disabled} label={'Electoral section'}
                               value={this.state.electoralSection} variant={"outlined"} name={'electoralSection'}
                               style={this.props.smallContainer} onChange={this.handleChange}/>
                    <Button style={{width: '100%'}} disabled={!this.state.changed}
                            onClick={() => this.saveChanges()}>Save</Button>
                </div>
            )
        else
            return (
                <div className={styles.form_component_container}
                     style={{borderBottom: (this.props.dark ? '#262d37 3px solid' : '#f4f8fb 3px solid')}}>
                    <legend>
                        <p style={{fontSize: '1.2rem', fontWeight: 450}}>Documents</p>
                    </legend>
                    <Skeleton variant="rect" style={{
                        borderRadius: '8px',
                        marginBottom: '2vh',
                        width: '45vw',
                        height: '6vh',
                        backgroundColor: this.props.dark ? '#3b424c' : '#f4f8fb'
                    }}/>
                    <Skeleton variant="rect" style={{
                        borderRadius: '8px',
                        marginBottom: '2vh',
                        width: '45vw',
                        height: '6vh',
                        backgroundColor: this.props.dark ? '#3b424c' : '#f4f8fb'
                    }}/>
                    <Skeleton variant="rect" style={{
                        borderRadius: '8px',
                        marginBottom: '2vh',
                        width: '45vw',
                        height: '6vh',
                        backgroundColor: this.props.dark ? '#3b424c' : '#f4f8fb'
                    }}/>
                </div>
            )
    }
}