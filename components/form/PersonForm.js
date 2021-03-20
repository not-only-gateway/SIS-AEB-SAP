import React from 'react'
import Cookies from "universal-cookie/lib";
import {Avatar, Button, IconButton, InputBase, Paper} from "@material-ui/core";
import styles from '../../styles/form/Form.module.css'
import axios from "axios";
import Host from "../../config/Host";
import {searchFieldStyle} from "../../styles/bar/BarMaterialStyles";
import {SearchRounded} from "@material-ui/icons";
import {inputStyle} from "../../styles/auth/AuthMaterialStyles";
import {paperStyle} from "../../styles/form/FormMaterialStyles";
import PersonFormFields from "./PersonFormFields";

const cookies = new Cookies()

export default class PersonForm extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            canEdit: false,
            ownProfile: parseInt(cookies.get('id')) === props.id,
            profile: null,
            page: 0
        }
    }

    componentDidMount() {
        this.fetchData().catch(e => console.log(e))
        this.fetchAccess().catch(e => console.log(e))
    }

    async fetchData(){
        try {
            await axios({
                method: 'get',
                url: Host + 'person',
                headers:{'authorization': cookies.get('jwt')},
                params: {
                    id: this.props.id
                }
            }).then(res => {
                this.setState({
                    profile: res.data
                })
            }).catch(error => {
                console.log(error)
            })
        } catch (error) {
            console.log(error)
        }
    }

    async fetchAccess(){
        try {
            await axios({
                method: 'get',
                url: Host + 'access',
                headers:{'authorization': cookies.get('jwt')}
            }).then(res => {
                this.setState({
                    canEdit: res.data
                })
            }).catch(error => {
                console.log(error)
            })
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        return(
            <div className={styles.container}>
                <div className={styles.title_container}>
                    <Avatar src={'https://rollingstone.uol.com.br/media/_versions/marcos_jeeves_teaser_reprod_widemd.jpg'} style={{width: '8vh', height: '8vh'}}/>
                    {/*<Avatar src={this.props.pic} alt={this.state.profile.name}/>*/}
                    {/*<p>{this.state.profile.name}</p>*/}
                    <p>Gustavo Roque</p>
                </div>
                <div className={styles.form_rows_container}>
                    <div className={styles.form_row}>
                        <Button onClick={() => this.setState({page: this.state.page-1})} disabled={this.state.page === 0}>Prev</Button>
                        <p>{this.state.page}</p>
                        <Button onClick={() => this.setState({page: this.state.page+1})} disabled={this.state.page === 3}>Next</Button>
                    </div>
                    <PersonFormFields page={this.state.page}/>
                </div>
            </div>
        )
    }
}