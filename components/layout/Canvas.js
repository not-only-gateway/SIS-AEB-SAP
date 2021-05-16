import styles from "../../styles/Structure.module.css";
import TreeNode from "../modules/TreeNode";
import mainStyles from "../../styles/shared/Main.module.css";
import {Button} from "@material-ui/core";
import {AddRounded, RemoveRounded} from "@material-ui/icons";
import React, {useState} from "react";
import PropTypes from 'prop-types'


export default function Canvas(props) {
    const [zoom, setZoom] = useState(1)

    return (
        <div style={{position: 'relative', width: '100%', height: 'auto', minHeight: '100%'}}>
            <div style={{
                zoom: zoom,
                transition: '.2s',
                '-moz-transform': 'scale(' + zoom + ')',
                marginTop: zoom > 1 ? 'calc(8.3% * ' + (zoom - .25) + ')' : null
            }}>
                <span className={styles.nav} style={{width: '100%', display: 'flex', placeContent: 'center'}}>
                    <ul >
                        <TreeNode dark={props.dark} subject={props.subject}
                                  type={props.type} hoveredParent={false}/>
                    </ul>
                </span>
            </div>
            <div className={mainStyles.displayColumnSpaced}
                 style={{position: 'fixed', bottom: '50px', right: '50px', height: '140px'}}>
                <span className={mainStyles.displayInlineCenter} style={{
                    color: '#555555',
                    padding: '5px',
                    borderRadius: '8px',
                    border: 'hsla(210, 11%, 78%, 0.5)  .7px solid'
                }}>{zoom} : 1</span>
                <Button disabled={zoom === 2} onClick={() => setZoom(zoom + 0.25)}
                        style={{
                            borderRadius: '8px',
                            height: '50px',
                            width: '30px',
                            color: 'white',
                            backgroundColor: zoom === 2 ? 'hsla(210, 11%, 78%, 0.5)' : '#0095ff'
                        }}
                        variant={'contained'}
                        color={'primary'}>
                    <AddRounded/>
                </Button>
                <Button disabled={zoom === 0.5} onClick={() => setZoom(zoom - 0.25)}
                        style={{
                            borderRadius: '8px',
                            height: '30px',
                            width: '30px',
                            color: 'white',
                            backgroundColor: zoom === 0.5 ? 'hsla(210, 11%, 78%, 0.5)' : '#f54269'
                        }}
                        variant={'contained'}
                >
                    <RemoveRounded/>
                </Button>
            </div>
        </div>
    )
}

Canvas.propTypes = {
    subject: PropTypes.object,
    type: PropTypes.string,
    dark: PropTypes.bool
}