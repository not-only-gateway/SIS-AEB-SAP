import PropTypes from 'prop-types'
import React, {useEffect, useState} from "react";
import styles from '../styles/Canvas.module.css'

export default function TreeNode(props) {
  const [dependents, setDependents] = useState([])
  const [hovered, setHovered] = useState(false)
  const [content, setContent] = useState(null)

  useEffect(() => {
    props.fetchDependents(props.subjectID).then(res => {
      setDependents(res)
    })
    setContent(props.getContent(props.content))
  }, [])


  return (
    <li key={'subject-layout-' + props.subjectID + props.type}>
          <span onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                style={{
                  width: 'clamp(150px, 150px, 200px)',
                  height: props.maxHeight,
                  border: hovered || props.hoveredParent ? '#0095ff .7px solid' : '#ecedf2 .7px solid',
                  boxSizing: 'border-box',
                  cursor: props.disabled ? 'unset' : 'pointer'
                }}
                className={styles.fadeIn}>
            {content}
            </span>

      {dependents.length > 0 ?
        <ul>
          {dependents.map(subject => (
            <TreeNode redirect={props.redirect} subjectID={subject.id}
                      disabled={props.disabled} content={subject}
                      fetchDependents={props.fetchDependents} getContent={props.getContent} maxHeight={props.maxHeight}
                      hoveredParent={props.hoveredParent ? props.hoveredParent : hovered}/>
          ))}
        </ul>
        :
        null
      }
    </li>
  )
}

TreeNode.propTypes = {
  getContent: PropTypes.func,
  fetchDependents: PropTypes.func,
  redirect: PropTypes.func,
  subjectID: PropTypes.number,
  content: PropTypes.any,
  hoveredParent: PropTypes.bool,
  disabled: PropTypes.bool,
  maxHeight: PropTypes.string,
}
