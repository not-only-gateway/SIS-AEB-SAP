import React from "react";
import PropTypes from 'prop-types'
import {AddRounded} from "@material-ui/icons";
import styles from "./styles/List.module.css";


export default function ListContent(props) {
  const element = props.create ? null : props.renderElement(props.entity)
  return (
    <button
      disabled={!props.create && props.onlyCreate}
      className={[styles.rowContainer, styles.fadeIn].join(' ')}
      onClick={() => {
        props.setEntity()
        props.clickEvent()
      }}
      style={{animationDuration: '250ms', display: (element === null || element === undefined) && !props.create? 'none' : undefined}}
    >
      <AddRounded style={{
        color: '#555555',
        display: !props.create ? 'none' : undefined
      }}/>

      {
        props.create ?
          props.lang.create
          :
          props.renderElement(props.entity, props.index)
      }
    </button>

  )
}

ListContent.propTypes = {
  onlyCreate: PropTypes.bool,
  index: PropTypes.number,
  entity: PropTypes.any,
  create: PropTypes.bool,
  lang: PropTypes.object,
  clickEvent: PropTypes.func,
  renderElement: PropTypes.func,
}
