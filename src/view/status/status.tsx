import React from 'react'
import Upload from './upload'
import Divider from '@mui/material/Divider'
import { bind } from '../../store/binder'
import { store } from '../../store/store'
import Edit from './edit'
import Run from './run'
import Info from './info'

export default function Status() {
  bind(store.status)
  
  return (
    <div className="bg-gray-100" style={{width: 280}}>
      <Upload/>
      <Divider/>
      <Edit/>
      <Divider/>
      <Run/>
      <Divider/>
      <Info/>
    </div>
  )
}