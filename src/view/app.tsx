import React from 'react'
import Sandbox from './sandbox/sandbox'
import Status from './status/status'
import './app.scss'

export default function App() {
  return <div className="flex h-full">
    <Sandbox/>
    <Status/>
  </div>
}