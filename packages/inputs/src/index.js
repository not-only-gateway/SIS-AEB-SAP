import React from 'react'

import DateField from './components/DateField'
import TextField from './components/TextField'
import ImageField from './components/ImageField'
import DropDownField from './components/DropDownField'
import Button from './components/Button'
import Selector from './components/Selector'


export default const Inputs = (props) => {
  return (
    <>

      {TextField(props)}
    </>
  )
}


