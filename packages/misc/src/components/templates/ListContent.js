import React from "react";
import PropTypes from 'prop-types'
import {AddRounded} from "@material-ui/icons";
import styles from "../styles/List.module.css";


export default function ListContent(props) {
  return (
    <button
      className={[styles.rowContainer, styles.fadeIn].join(' ')}
      onClick={() => {
        props.setEntity()
        props.clickEvent()
      }}
      key={props.index + '-list'}
    >
      <AddRounded style={{
        color: 'black',
        display: !props.create ? 'none' : undefined
      }}/>

      {
        props.create ?
          props.lang.create
          :
          props.renderElement(props.entity)
      }
    </button>

  )
}

ListContent.propTypes = {
  entity: PropTypes.any,
  create: PropTypes.bool,
  lang: PropTypes.object,
  clickEvent: PropTypes.func,
  renderElement: PropTypes.func,
  primaryLabel: PropTypes.string,
  secondaryLabel: PropTypes.string,
  index: PropTypes.number,
}
