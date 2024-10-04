import React from 'react'
import World from 'irma5/src/world'
import ReactDOM from 'react-dom/client'
import App from './view/app'
import './index.scss'
//
// create react Atomic Playground app
//
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(<App/>)
//
// create irma5 world instance to run playground atoms
//
const w = World()