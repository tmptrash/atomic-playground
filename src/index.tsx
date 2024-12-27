//
// These references solve a problem of using declaration files for 
// javascript project irma5. All other methods didn't work
//
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../node_modules/irma5/types/shared.d.ts"/>
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../node_modules/irma5/types/world.d.ts"/>
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../node_modules/irma5/types/vms.d.ts"/>
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../node_modules/irma5/types/atom.d.ts"/>
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../node_modules/irma5/types/cfg.d.ts"/>
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './view/app'
import './index.scss'
import { parseAtom } from './utils'

declare global {
  interface Window { parseAtom: (a: number) => string; }
}
//
// create react Atomic Playground app
//
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(<App/>)
//
// For the debug mode we set parseAtom() function
//
if (process.env.NODE_ENV === 'development') {
  window.parseAtom = parseAtom
}