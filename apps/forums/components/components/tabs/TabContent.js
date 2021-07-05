import animations from "../shared/Animations.module.css";
import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";


export default function TabContent(props) {
  const [style, setStyle] = useState('')
  const [isInRender, setIsInRender] = useState(false)

  useEffect(() => {
    if (isInRender && props.openTab !== props.tab.buttonKey) {
      setStyle(animations.fadeOutAnimation)
      const elementFound = document.querySelector('#content-' + props.tab.buttonKey + '\\:tab' + props.tabsKey)
      if (elementFound !== null && style === animations.fadeOutAnimation) {
        elementFound.addEventListener('animationend', () => {
          setIsInRender(false)
          props.setRendering(null)
        });
      }
    } else if (!isInRender && props.openTab === props.tab.buttonKey && props.rendering === null) {
      props.setRendering(props.tab.buttonKey)
      setIsInRender(true)
      setStyle(animations.fadeIn)
    }

  })


  return (
    <div key={props.tab.buttonKey + '-' + props.tab.value}
         id={'content-' + props.tab.buttonKey + ':tab' + props.tabsKey}
         className={style} style={{display: isInRender ? undefined : 'none'}}>
      {props.tab.value}
    </div>
  )

}

TabContent.propTypes = {
  tabsKey: PropTypes.any,
  tab: PropTypes.object,
  rendering: PropTypes.any,
  setRendering: PropTypes.func,
  openTab: PropTypes.any
}
