import styles from "../../styles/Structure.module.css";
import SubjectLayout from "./SubjectLayout";
import mainStyles from "../../styles/shared/Main.module.css";
import {Button} from "@material-ui/core";
import {AddRounded, RemoveRounded} from "@material-ui/icons";
import React, {useState} from "react";
import PropTypes from 'prop-types'


export default function ContentCanvas(props) {
    const [zoom, setZoom] = useState(1)
    return (
        <div style={{position: 'relative'}}>
            <div className={styles.tree_container}>
                <ul className={styles.tree} style={{
                    backgroundColor: props.dark ? '#3b424c' : 'none',
                    borderRadius: '8px',
                    margin: 'auto',
                    zoom: zoom
                }}>
                    <SubjectLayout dark={props.dark} subject={props.subject}
                                   type={props.type}/>
                </ul>
            </div>
            <div className={mainStyles.displayColumnSpaced}
                 style={{position: 'absolute', bottom: '0%', left: '90%', height: '100px'}}>
                <Button disabled={zoom === 2} onClick={() => setZoom(zoom + 0.5)}
                        style={{
                            borderRadius: '8px',
                            height: '50px',
                            width: '50px',
                            backgroundColor: !props.dark ? '#46b2f3 ' : '#1ea1f1'
                        }}
                        variant={'contained'}
                        color={'primary'}>
                    <AddRounded/>
                </Button>
                <Button disabled={zoom === 0.5} onClick={() => setZoom(zoom - 0.5)}
                        style={{
                            borderRadius: '8px',
                            height: '30px'
                        }}
                        variant={'contained'}
                        color={'secondary'}
                >
                    <RemoveRounded/>
                </Button>
            </div>
        </div>
    )
}

ContentCanvas.propTypes = {
    subject: PropTypes.object,
    type: PropTypes.string,
    dark: PropTypes.bool
}