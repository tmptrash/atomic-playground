import React from 'react'
import Upload from './upload'
import Divider from '@mui/material/Divider'
import { bind } from '../../store/binder'
import { store } from '../../store/store'
import Edit from './edit'

export default function Status() {
  bind(store.status)
  
  return (
    <div className="w-60 bg-gray-100">
      <Upload/>
      <Divider/>
      <Edit/>
      <Divider/>
    </div>
  )
}