import styles from "../../styles/form/Form.module.css";
import {Button, InputBase, Paper} from "@material-ui/core";
import {paperStyle} from "../../styles/form/FormMaterialStyles";
import React from "react";

export default class PersonFormFields extends React.Component{

    constructor(props){
        super(props)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    render() {
        switch (this.props.page){
            case 0: {
                return(
                    <>
                        <div className={styles.form_row}>
                            <Paper component="form" style={{...paperStyle, ...{backgroundColor: !this.props.dark ? '#f7f8fa' : '#303741'}}}>
                                <InputBase
                                    placeholder={'input 1'}
                                    disabled={!this.props.canEdit && !this.props.ownProfile}
                                    style={{color: this.props.dark ? 'white' : 'black',width: '90%', marginLeft: '5%'}}
                                />
                            </Paper>
                            <Paper component="form"
                                   style={{...paperStyle, ...{backgroundColor: !this.props.dark ? '#f7f8fa' : '#303741'}}}>
                                <InputBase
                                    disabled={!this.props.canEdit && !this.props.ownProfile}
                                    placeholder={'input 1'}
                                    style={{color: this.props.dark ? 'white' : 'black',width: '90%', marginLeft: '5%'}}
                                />
                            </Paper>
                        </div>
                        <div className={styles.form_row}>
                            <Paper component="form" style={{...paperStyle, ...{backgroundColor: !this.props.dark ? '#f7f8fa' : '#303741'}}}>
                                <InputBase
                                    placeholder={'input 3'}
                                    disabled={!this.props.canEdit && !this.props.ownProfile}
                                    style={{color: this.props.dark ? 'white' : 'black',width: '90%', marginLeft: '5%'}}
                                />
                            </Paper>
                            <Paper component="form"
                                   style={{...paperStyle, ...{backgroundColor: !this.props.dark ? '#f7f8fa' : '#303741'}}}>
                                <InputBase
                                    disabled={!this.props.canEdit && !this.props.ownProfile}
                                    placeholder={'input 4'}
                                    style={{color: this.props.dark ? 'white' : 'black',width: '90%', marginLeft: '5%'}}
                                />
                            </Paper>
                        </div>
                        <div className={styles.form_row}>
                            <Paper component="form" style={{...paperStyle, ...{backgroundColor: !this.props.dark ? '#f7f8fa' : '#303741'}}}>
                                <InputBase
                                    placeholder={'input 3'}
                                    disabled={!this.props.canEdit && !this.props.ownProfile}
                                    style={{color: this.props.dark ? 'white' : 'black',width: '90%', marginLeft: '5%'}}
                                />
                            </Paper>
                            <Paper component="form"
                                   style={{...paperStyle, ...{backgroundColor: !this.props.dark ? '#f7f8fa' : '#303741'}}}>
                                <InputBase
                                    disabled={!this.props.canEdit && !this.props.ownProfile}
                                    placeholder={'input 4'}
                                    style={{color: this.props.dark ? 'white' : 'black',width: '90%', marginLeft: '5%'}}
                                />
                            </Paper>
                        </div>
                        <div className={styles.form_row}>
                            <Paper component="form" style={{...paperStyle, ...{backgroundColor: !this.props.dark ? '#f7f8fa' : '#303741'}}}>
                                <InputBase
                                    placeholder={'input 3'}
                                    disabled={!this.props.canEdit && !this.props.ownProfile}
                                    style={{color: this.props.dark ? 'white' : 'black',width: '90%', marginLeft: '5%'}}
                                />
                            </Paper>
                            <Paper component="form"
                                   style={{...paperStyle, ...{backgroundColor: !this.props.dark ? '#f7f8fa' : '#303741'}}}>
                                <InputBase
                                    disabled={!this.props.canEdit && !this.props.ownProfile}
                                    placeholder={'input 4'}
                                    style={{color: this.props.dark ? 'white' : 'black',width: '90%', marginLeft: '5%'}}
                                />
                            </Paper>
                        </div>
                    </>
                )
            }
            case 1: {
                return(
                    <>
                        <div className={styles.form_row}>
                            <Paper component="form" style={{...paperStyle, ...{backgroundColor: !this.props.dark ? '#f7f8fa' : '#303741'}}}>
                                <InputBase
                                    placeholder={'input 1123'}
                                    disabled={!this.props.canEdit && !this.props.ownProfile}
                                    style={{color: this.props.dark ? 'white' : 'black',width: '90%', marginLeft: '5%'}}
                                />
                            </Paper>
                            <Paper component="form"
                                   style={{...paperStyle, ...{backgroundColor: !this.props.dark ? '#f7f8fa' : '#303741'}}}>
                                <InputBase
                                    disabled={!this.props.canEdit && !this.props.ownProfile}
                                    placeholder={'input 1'}
                                    style={{color: this.props.dark ? 'white' : 'black',width: '90%', marginLeft: '5%'}}
                                />
                            </Paper>
                        </div>
                        <div className={styles.form_row}>
                            <Paper component="form" style={{...paperStyle, ...{backgroundColor: !this.props.dark ? '#f7f8fa' : '#303741'}}}>
                                <InputBase
                                    placeholder={'input 10'}
                                    disabled={!this.props.canEdit && !this.props.ownProfile}
                                    style={{color: this.props.dark ? 'white' : 'black',width: '90%', marginLeft: '5%'}}
                                />
                            </Paper>
                            <Paper component="form"
                                   style={{...paperStyle, ...{backgroundColor: !this.props.dark ? '#f7f8fa' : '#303741'}}}>
                                <InputBase
                                    disabled={!this.props.canEdit && !this.props.ownProfile}
                                    placeholder={'input 34'}
                                    style={{color: this.props.dark ? 'white' : 'black',width: '90%', marginLeft: '5%'}}
                                />
                            </Paper>
                        </div>
                        <div className={styles.form_row}>
                            <Paper component="form" style={{...paperStyle, ...{backgroundColor: !this.props.dark ? '#f7f8fa' : '#303741'}}}>
                                <InputBase
                                    placeholder={'input 32'}
                                    disabled={!this.props.canEdit && !this.props.ownProfile}
                                    style={{color: this.props.dark ? 'white' : 'black',width: '90%', marginLeft: '5%'}}
                                />
                            </Paper>
                            <Paper component="form"
                                   style={{...paperStyle, ...{backgroundColor: !this.props.dark ? '#f7f8fa' : '#303741'}}}>
                                <InputBase
                                    disabled={!this.props.canEdit && !this.props.ownProfile}
                                    placeholder={'input 4'}
                                    style={{color: this.props.dark ? 'white' : 'black',width: '90%', marginLeft: '5%'}}
                                />
                            </Paper>
                        </div>
                        <div className={styles.form_row}>
                            <Paper component="form" style={{...paperStyle, ...{backgroundColor: !this.props.dark ? '#f7f8fa' : '#303741'}}}>
                                <InputBase
                                    placeholder={'input 3'}
                                    disabled={!this.props.canEdit && !this.props.ownProfile}
                                    style={{color: this.props.dark ? 'white' : 'black',width: '90%', marginLeft: '5%'}}
                                />
                            </Paper>
                            <Paper component="form"
                                   style={{...paperStyle, ...{backgroundColor: !this.props.dark ? '#f7f8fa' : '#303741'}}}>
                                <InputBase
                                    disabled={!this.props.canEdit && !this.props.ownProfile}
                                    placeholder={'input 4'}
                                    style={{color: this.props.dark ? 'white' : 'black',width: '90%', marginLeft: '5%'}}
                                />
                            </Paper>
                        </div>
                    </>
                )
            }
            case 2: {
                return(
                    <>
                        <div className={styles.form_row}>
                            <Paper component="form" style={{...paperStyle, ...{backgroundColor: !this.props.dark ? '#f7f8fa' : '#303741'}}}>
                                <InputBase
                                    placeholder={'input 1123'}
                                    disabled={!this.props.canEdit && !this.props.ownProfile}
                                    style={{color: this.props.dark ? 'white' : 'black',width: '90%', marginLeft: '5%'}}
                                />
                            </Paper>
                            <Paper component="form"
                                   style={{...paperStyle, ...{backgroundColor: !this.props.dark ? '#f7f8fa' : '#303741'}}}>
                                <InputBase
                                    disabled={!this.props.canEdit && !this.props.ownProfile}
                                    placeholder={'input 1'}
                                    style={{color: this.props.dark ? 'white' : 'black',width: '90%', marginLeft: '5%'}}
                                />
                            </Paper>
                        </div>
                        <div className={styles.form_row}>
                            <Paper component="form" style={{...paperStyle, ...{backgroundColor: !this.props.dark ? '#f7f8fa' : '#303741'}}}>
                                <InputBase
                                    placeholder={'input asdasdasd'}
                                    disabled={!this.props.canEdit && !this.props.ownProfile}
                                    style={{color: this.props.dark ? 'white' : 'black',width: '90%', marginLeft: '5%'}}
                                />
                            </Paper>
                            <Paper component="form"
                                   style={{...paperStyle, ...{backgroundColor: !this.props.dark ? '#f7f8fa' : '#303741'}}}>
                                <InputBase
                                    disabled={!this.props.canEdit && !this.props.ownProfile}
                                    placeholder={'inasdasddsaput 4'}
                                    style={{color: this.props.dark ? 'white' : 'black',width: '90%', marginLeft: '5%'}}
                                />
                            </Paper>
                        </div>
                        <div className={styles.form_row}>
                            <Paper component="form" style={{...paperStyle, ...{backgroundColor: !this.props.dark ? '#f7f8fa' : '#303741'}}}>
                                <InputBase
                                    placeholder={'inpuasdadassadadasdasdt 3'}
                                    disabled={!this.props.canEdit && !this.props.ownProfile}
                                    style={{color: this.props.dark ? 'white' : 'black',width: '90%', marginLeft: '5%'}}
                                />
                            </Paper>
                            <Paper component="form"
                                   style={{...paperStyle, ...{backgroundColor: !this.props.dark ? '#f7f8fa' : '#303741'}}}>
                                <InputBase
                                    disabled={!this.props.canEdit && !this.props.ownProfile}
                                    placeholder={'asdasdasdadsa 4'}
                                    style={{color: this.props.dark ? 'white' : 'black',width: '90%', marginLeft: '5%'}}
                                />
                            </Paper>
                        </div>
                        <div className={styles.form_row}>
                            <Paper component="form" style={{...paperStyle, ...{backgroundColor: !this.props.dark ? '#f7f8fa' : '#303741'}}}>
                                <InputBase
                                    placeholder={'inpu12313123t 3'}
                                    disabled={!this.props.canEdit && !this.props.ownProfile}
                                    style={{color: this.props.dark ? 'white' : 'black',width: '90%', marginLeft: '5%'}}
                                />
                            </Paper>
                            <Paper component="form"
                                   style={{...paperStyle, ...{backgroundColor: !this.props.dark ? '#f7f8fa' : '#303741'}}}>
                                <InputBase
                                    disabled={!this.props.canEdit && !this.props.ownProfile}
                                    placeholder={'inp1231323132ut 4'}
                                    style={{color: this.props.dark ? 'white' : 'black',width: '90%', marginLeft: '5%'}}
                                />
                            </Paper>
                        </div>
                    </>
                )
            }
            case 3: {
                return(
                    <>
                        <div className={styles.form_row}>
                            <Paper component="form" style={{...paperStyle, ...{backgroundColor: !this.props.dark ? '#f7f8fa' : '#303741'}}}>
                                <InputBase
                                    placeholder={'input 1123'}
                                    disabled={!this.props.canEdit && !this.props.ownProfile}
                                    style={{color: this.props.dark ? 'white' : 'black',width: '90%', marginLeft: '5%'}}
                                />
                            </Paper>
                            <Paper component="form"
                                   style={{...paperStyle, ...{backgroundColor: !this.props.dark ? '#f7f8fa' : '#303741'}}}>
                                <InputBase
                                    disabled={!this.props.canEdit && !this.props.ownProfile}
                                    placeholder={'input 1'}
                                    style={{color: this.props.dark ? 'white' : 'black',width: '90%', marginLeft: '5%'}}
                                />
                            </Paper>
                        </div>
                        <div className={styles.form_row}>
                            <Paper component="form" style={{...paperStyle, ...{backgroundColor: !this.props.dark ? '#f7f8fa' : '#303741'}}}>
                                <InputBase
                                    placeholder={'input asdasdasd'}
                                    disabled={!this.props.canEdit && !this.props.ownProfile}
                                    style={{color: this.props.dark ? 'white' : 'black',width: '90%', marginLeft: '5%'}}
                                />
                            </Paper>
                            <Paper component="form"
                                   style={{...paperStyle, ...{backgroundColor: !this.props.dark ? '#f7f8fa' : '#303741'}}}>
                                <InputBase
                                    disabled={!this.props.canEdit && !this.props.ownProfile}
                                    placeholder={'inasdasddsaput 4'}
                                    style={{color: this.props.dark ? 'white' : 'black',width: '90%', marginLeft: '5%'}}
                                />
                            </Paper>
                        </div>
                        <div className={styles.form_row}>
                            <Paper component="form" style={{...paperStyle, ...{backgroundColor: !this.props.dark ? '#f7f8fa' : '#303741'}}}>
                                <InputBase
                                    placeholder={'inpuasdadassadadasdasdt 3'}
                                    disabled={!this.props.canEdit && !this.props.ownProfile}
                                    style={{color: this.props.dark ? 'white' : 'black',width: '90%', marginLeft: '5%'}}
                                />
                            </Paper>
                            <Paper component="form"
                                   style={{...paperStyle, ...{backgroundColor: !this.props.dark ? '#f7f8fa' : '#303741'}}}>
                                <InputBase
                                    disabled={!this.props.canEdit && !this.props.ownProfile}
                                    placeholder={'asdasdasdadsa 4'}
                                    style={{color: this.props.dark ? 'white' : 'black',width: '90%', marginLeft: '5%'}}
                                />
                            </Paper>
                        </div>
                        <div className={styles.form_row}>
                            <Paper component="form" style={{...paperStyle, ...{backgroundColor: !this.props.dark ? '#f7f8fa' : '#303741'}}}>
                                <InputBase
                                    placeholder={'inpu12313123t 3'}
                                    disabled={!this.props.canEdit && !this.props.ownProfile}
                                    style={{color: this.props.dark ? 'white' : 'black',width: '90%', marginLeft: '5%'}}
                                />
                            </Paper>
                            <Paper component="form"
                                   style={{...paperStyle, ...{backgroundColor: !this.props.dark ? '#f7f8fa' : '#303741'}}}>
                                <InputBase
                                    disabled={!this.props.canEdit && !this.props.ownProfile}
                                    placeholder={'inp1231323132ut 4'}
                                    style={{color: this.props.dark ? 'white' : 'black',width: '90%', marginLeft: '5%'}}
                                />
                            </Paper>
                        </div>
                    </>
                )
            }
            default: {
                return null
            }
        }

    }
}