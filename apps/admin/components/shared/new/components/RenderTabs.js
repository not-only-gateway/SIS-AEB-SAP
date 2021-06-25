import PropTypes from 'prop-types'
import React, {useEffect, useState} from "react";
import TabContent from "./templates/TabContent";

export default function RenderTabs(props) {
  const [rendering, setRendering] = useState(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  })

  return (
    <div style={{display: mounted ? undefined : 'none'}}>
      {props.tabs.map(tab => (
        <React.Fragment key={tab.buttonKey + '-content'}>
        <TabContent tab={tab} setRendering={setRendering} rendering={rendering} openTab={props.openTab}/>
        </React.Fragment>
      ))}
    </div>
  )
}

RenderTabs.propTypes =
  {
    tabs: PropTypes.arrayOf(
      PropTypes.shape({
        buttonKey: PropTypes.number,
        value: PropTypes.any
      })
    ),
    openTab: PropTypes.any,
    noContainer: PropTypes.bool
  }
