import PropTypes from 'prop-types'
import React, {useEffect, useState} from "react";

import TabContent from "./templates/TabContent";

export default function RenderTabs(props) {
  const [rendering, setRendering] = useState(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

  })


  if (mounted)
    return (
      <>
        {props.tabs.map(tab => (
          <TabContent tab={tab} setRendering={setRendering} rendering={rendering} openTab={props.openTab}/>
        ))}
      </>
    )
  else return <></>
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
