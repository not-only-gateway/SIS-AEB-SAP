import styles from "../../../styles/form/Form.module.css";
import {Button, TextField} from "@material-ui/core";
import React from "react";
import Cookies from "universal-cookie/lib";
import {Skeleton} from "@material-ui/lab";

const cookies = new Cookies()

export default class AddressForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            changed: false,
            zipCode: null,
            address: null,
            complement: null,
            street: null,
            state: null,
            stateInitials: null,
            neighborhood: null,
            city: null,
        }
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        this.fetchData().catch(error => console.log(error))
    }

    async fetchData() {
        const response = await this.props.fetchData('/address')

        if (response !== null)
            this.setState({
                zipCode: response.zip_code,
                address: response.address,
                complement: response.complement,
                street: response.street,
                state: response.state,
                stateInitials: response.state_initials,
                neighborhood: response.neighborhood,
                city: response.city
            })
        this.setState({loading: false})

    }

    async saveChanges() {
        const response = await this.props.saveChanges(
            {
                id: this.props.id,
                zip_code: this.state.zipCode,
                address: this.state.address,
                complement: this.state.complement,
                street: this.state.street,
                state: this.state.state,
                state_initials: this.state.stateInitials,
                neighborhood: this.state.neighborhood,
                city: this.state.city,
            }, '/address')
        if (response)
            this.setState({changed: false})
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value

        })
        if (!this.state.changed)
            this.setState({
                changed: true
            })
    }


    render() {
        if (!this.state.loading)
            return (
                <div className={styles.form_component_container}
                     style={{borderBottom: (this.props.dark ? '#262d37 3px solid' : '#f4f8fb 3px solid')}}>
                    <legend style={{width: '100%'}}>
                        <p style={{fontSize: '1.2rem', fontWeight: 450}}>Address</p>
                    </legend>
                    <TextField disabled={this.props.disabled} label={'Address'} value={this.state.address}
                               variant={"outlined"}
                               style={this.props.mediumContainer} required
                               onChange={this.handleChange}
                               name={'address'}
                    />
                    <TextField disabled={this.props.disabled} label={'Address Complement'}
                               value={this.state.complement} variant={"outlined"}
                               style={this.props.mediumContainer}
                               onChange={this.handleChange}
                               name={'complement'}
                    />
                    <TextField disabled={this.props.disabled} label={'Zip code'} value={this.state.zipCode}
                               variant={"outlined"}
                               style={this.props.smallContainer} required
                               onChange={this.handleChange}
                               name={'zipCode'}
                    />

                    <TextField disabled={this.props.disabled} label={'Street name'} value={this.state.street}
                               variant={"outlined"}
                               style={this.props.smallContainer} required
                               onChange={this.handleChange}
                               name={'street'}
                    />
                    <TextField disabled={this.props.disabled} label={'Neighborhood'} value={this.state.neighborhood}
                               variant={"outlined"}
                               style={this.props.smallContainer} required
                               onChange={this.handleChange}
                               // error={this.state.neighborhood === null}
                               name={'neighborhood'}
                    />

                    <TextField disabled={this.props.disabled} label={'City'}
                               value={this.state.city} variant={"outlined"}
                               onChange={this.handleChange}
                               name={'city'}
                               style={this.props.smallContainer}/>
                    <TextField disabled={this.props.disabled} label={'State'}
                               value={this.state.state} variant={"outlined"}
                               style={this.props.smallContainer}
                               onChange={this.handleChange}
                               name={'state'}
                    />
                    <TextField disabled={this.props.disabled} label={'State initials'}
                               value={this.state.stateInitials} variant={"outlined"}
                               style={this.props.smallContainer}
                               // error={this.state.stateInitials !== null && this.state.stateInitials.length > 2}
                               onChange={event => event.target.value.length <= 2 ? this.handleChange(event) : null}
                               name={'stateInitials'}
                    />


                    <Button style={{width: '100%'}} disabled={!this.state.changed}
                            onClick={() => this.saveChanges()}>Save</Button>
                </div>
            )
        else
            return (
                <div className={styles.form_component_container}
                     style={{borderBottom: (this.props.dark ? '#262d37 3px solid' : '#f4f8fb 3px solid')}}>
                    <legend>
                        <p style={{fontSize: '1.2rem', fontWeight: 450}}>Address</p>
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