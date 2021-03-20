import styles from '../../styles/Layout.module.css'
import {Avatar, Button} from "@material-ui/core";
import React from 'react'
import {CakeRounded} from "@material-ui/icons";

export default class Persona extends React.Component{
    constructor(props) {
        super(props);
    }
    render(){
        return (
            <div className={styles.persona_container}  key={this.props.id}>
                <Button onClick={() => this.props.renderModal()} style={{width: '100%', height: '11vh', backgroundColor: 'transparent', display: 'flex', justifyContent: 'space-between', textTransform: 'none'}}>
                    <Avatar src={this.props.pic} alt={this.props.name} style={{marginLeft: '10px', height: '7vh', width: '7vh'}}/>
                    <div className={styles.persona_text_fields_container} style={{marginRight: '10px'}}>
                        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                            {((new Date(this.props.birth)).getDay() === (new Date).getDay() && (new Date(this.props.birth)).getMonth() === (new Date).getMonth()) ? <CakeRounded style={{color: '#f54269', marginRight: '10px', fontSize: '1.8rem'}}/> : null }
                            <p style={{fontSize: '1.02rem', fontWeight:435, color: (this.props.dark ? 'white': 'black')}}>{this.props.name}</p>
                        </div>

                        <p style={{fontSize: '.8rem', fontWeight:400, color: (this.props.dark ? '#e2e2e2': '#111111')}}>{this.props.email}</p>
                        <p style={{fontSize: '.8rem', fontWeight:400, color: (this.props.dark ? '#e2e2e2': '#111111')}}>{this.props.phone.substr(this.props.phone.length-4, this.props.phone.length)}</p> {/*last 4 digits*/}
                    </div>
                </Button>
            </div>
        )
    }
}