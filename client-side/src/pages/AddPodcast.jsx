import React from 'react'
import { useSelector } from 'react-redux'
import Err404page from './Err404page'
import InputPodcast from '../components/Add podcast/InputPodcast'

const AddPodcast = () => {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  return (
    <div>
    {isLoggedIn ? (
        <InputPodcast/>
    ) : (<Err404page />)}
    </div>
  )
}

export default AddPodcast
