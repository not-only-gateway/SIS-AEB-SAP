import PropTypes from 'prop-types'
import React, {useEffect, useState} from "react";
import TabContent from "./TabContent";

export default function RenderTabs(props) {
  const [rendering, setRendering] = useState(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  })

  return (
    <div style={{display: mounted ? undefined : 'none'}}>
      {props.tabs.map(tab => (
        <React.Fragment key={tab.buttonKey + '-list-fragment-'+props.tabsKey}>
        <TabContent tab={tab} tabsKey={props.tabsKey} setRendering={setRendering} rendering={rendering} openTab={props.openTab}/>
        </React.Fragment>
      ))}
    </div>
  )
}

RenderTabs.propTypes = {
    tabsKey: PropTypes.any,
    tabs: PropTypes.arrayOf(
      PropTypes.shape({
        buttonKey: PropTypes.number,
        value: PropTypes.any
      })
    ),
    openTab: PropTypes.any,
    noContainer: PropTypes.bool
  }
