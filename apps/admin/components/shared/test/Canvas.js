import styles from "./styles/Canvas.module.css";
import TreeNode from "./templates/TreeNode";
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

                      <ul key={props.subject.id}>
                        <TreeNode subjectID={props.subject} disabled={props.disabled} getContent={props.getContent} maxHeight={props.maxHeight}
                                  fetchDependents={props.fetchDependents} content={props.subject} redirect={props.redirect}
                                  hoveredParent={false}/>
                      </ul>

                </span>
      </div>
      <div className={styles.zoomContainer}>
        <span className={styles.zoomLevelContainer}>{zoom} : 1</span>
        <button disabled={zoom === 2} onClick={() => setZoom(zoom + 0.25)}
                className={styles.buttonContainer}
                style={{
                  cursor: zoom === 2 ? undefined : 'pointer',
                  boxShadow: zoom === 2 ? 'none' : undefined
                }}
        >
          <AddRounded/>
        </button>
        <button disabled={zoom === 0.5} onClick={() => setZoom(zoom - 0.25)}
                className={styles.buttonContainer}
                style={{
                  cursor: zoom === 0.5 ? undefined : 'pointer',
                  boxShadow: zoom === 0.5 ? 'none' : undefined
                }}

        >
          <RemoveRounded/>
        </button>
      </div>
    </div>
  )
}

Canvas.propTypes = {
  subject: PropTypes.object,
  maxHeight: PropTypes.any,
  disabled: PropTypes.bool,
  fetchDependents: PropTypes.func,
  getContent: PropTypes.func,
  redirect: PropTypes.func
}
