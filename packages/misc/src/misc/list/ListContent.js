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
      onClick={event => {
        props.setEntity()
        props.clickEvent(event, props.create)
      }}
      style={{animationDuration: '250ms', display: (element === null || element === undefined) && !props.create? 'none' : undefined, borderBottom: props.isLast || props.dataLength === 0 ? '#ecedf2 1px solid' : undefined}}
    >
      <AddRounded style={{
        color: '#555555',
        display: !props.create ? 'none' : undefined
      }}/>

      {
        props.create ?
          (props.createOptionLabel !== undefined ? props.createOptionLabel : props.lang.create)
          :
          props.renderElement(props.entity, props.index)
      }
    </button>

  )
}

ListContent.propTypes = {
  isLast: PropTypes.bool,
  createOptionLabel: PropTypes.string,
  onlyCreate: PropTypes.bool,
  index: PropTypes.number,
  entity: PropTypes.any,
  create: PropTypes.bool,
  lang: PropTypes.object,
  clickEvent: PropTypes.func,
  renderElement: PropTypes.func,
}
