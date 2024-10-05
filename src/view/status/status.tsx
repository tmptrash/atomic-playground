import React from 'react'
import Upload from './upload'
import Divider from '@mui/material/Divider'
import { bind } from '../../store/binder'
import { store } from '../../store/store'
import Edit from './edit'
import Run from './run'

export default function Status() {
  bind(store.status)
  
  return (
    <div className="bg-gray-100" style={{width: 260}}>
      <Upload/>
      <Divider/>
      <Edit/>
      <Divider/>
      <Run/>
    </div>
  )
}