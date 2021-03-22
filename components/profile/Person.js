import React from 'react'
import styles from '../../styles/Profile.module.css'
import {Avatar, Button} from "@material-ui/core";
import SimplifiedProfile from "./SimplifiedProfile";

export default class Person extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div className={styles.profile_container}>
                <div className={styles.title_container}>
                    <Avatar src={this.props.pic} style={{width: '120px', height: '120px'}}/>
                    {/*<Avatar src={this.props.pic} alt={this.state.profile.name}/>*/}
                    {/*<p>{this.state.profile.name}</p>*/}
                    <p style={{color: (this.props.dark? 'white': 'black'), fontWeight: 450, textAlign: 'center'}}>{this.props.name}</p>
                </div>
                <fieldset style={{borderRadius: '8px'}}>
                    <legend>
                        <h4 style={{color: this.props.dark ? 'white': 'black'}}>Contact</h4>
                    </legend>

                    <div className={styles.profile_info_row}>
                        <p style={{fontSize: '1.05rem', fontWeight: 450, color: this.props.dark ? 'white': 'black'}}>Email</p>
                        <p style={{fontSize: '.9rem' ,color: this.props.dark ? 'white': 'black'}}>{this.props.email}</p>
                    </div>
                    <div className={styles.profile_info_row}>
                        <p style={{fontSize: '1.05rem', fontWeight: 450, color: this.props.dark ? 'white': 'black'}}>Extension</p>
                        <p style={{fontSize: '.9rem' ,color: this.props.dark ? 'white': 'black'}}>{this.props.phone}</p>
                    </div>
                </fieldset>

                <fieldset className={styles.profile_info_row} style={{borderRadius: '8px'}}>
                    <legend>
                        <h4 style={{color: this.props.dark ? 'white': 'black'}}>Unity</h4>
                    </legend>
                    <div className={styles.person_unity_field_container}>
                        <p style={{fontSize: '1.05rem', fontWeight: 450, color: this.props.dark ? 'white': 'black'}}>Name</p>
                        <p style={{fontSize: '.9rem' ,color: this.props.dark ? 'white': 'black'}}>CTIC</p>
                    </div>
                    <div className={styles.person_unity_field_container}>
                        <p style={{fontSize: '1.05rem', fontWeight: 450, color: this.props.dark ? 'white': 'black'}}>Role</p>
                        <p style={{fontSize: '.9rem' ,color: this.props.dark ? 'white': 'black'}}>Mendigo</p>
                    </div>
                    <div className={styles.person_unity_field_container}>
                        <p style={{fontSize: '1.05rem', fontWeight: 450, color: this.props.dark ? 'white': 'black'}}>Superior</p>
                        {/*<SimplifiedProfile name={this.props.superior.name} pic={this.props.superior.pic}/>*/}
                        <SimplifiedProfile name={'JUAN JUAN JUAN JUAN JUAN JUANJUANJUANJUANJUANJUAN'} pic={null} dark={this.props.dark}/>
                    </div>
                </fieldset>
            </div>
        )
    }
}