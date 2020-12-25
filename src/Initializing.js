import React, { useEffect, useState, useReducer } from 'react'

import { Navigation } from 'react-native-navigation';
import navigation from './Navigation';




const Initialising = ({ ...props }) => {
  useEffect(() => {
    Navigation.setRoot(navigation.MainContact())
  }, [])
  return (
    <>
    </>
  )
}
export default Initialising;



