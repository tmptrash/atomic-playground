import React, { useEffect, useRef, useState } from 'react'
import Konva from 'konva'
import { Layer, Stage } from 'react-konva'
import { KonvaEventObject } from 'konva/lib/Node'
import { Vector2d } from 'konva/lib/types'
import Config from '../../config'
import Grid from '../../components/grid'
import { bind } from '../../store/binder'
import { store } from '../../store/store'
import Atoms from '../../components/atoms/atoms'
import './sandbox.scss'

export default function Sandbox() {
  bind(store.sandbox)

  const [size, setSize] = useState({w: 0, h: 0})
  const [zoom, setZoom] = useState(1)
  const stageRef = useRef(null)

  function onResize() {
    const canvasEl = document.querySelector('#' + Config.grid.query) as HTMLElement
    setSize({
      w: canvasEl.clientWidth,
      h: canvasEl.clientHeight
    })
  }

  function onWheel(e: KonvaEventObject<WheelEvent>) {
    e.evt.preventDefault()
    if (stageRef.current === null) { return }
    const stage = stageRef.current as Konva.Stage
    const pos = stage.getPointerPosition() as Vector2d

    // Zoom in or zoom out?
    let scale = e?.evt?.deltaY > 0 ? zoom / Config.zoomDivider : zoom * Config.zoomDivider
    if (scale < Config.minZoom) { scale = Config.minZoom }
    else if (scale > Config.maxZoom) { scale = Config.maxZoom }

    stage.scale({ x: scale, y: scale })
    stage.position({ x: pos.x - ((pos.x - stage.x()) / zoom) * scale, y: pos.y - ((pos.y - stage.y()) / zoom) * scale })
    setZoom(scale)
  }

  useEffect(() => {
    !size.w && onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <div id={Config.grid.query} className="sandbox">
      <Stage
        ref={stageRef}
        width={size.w}
        height={size.h}
        draggable={true}
        x={Config.grid.borderWidth}
        y={Config.grid.borderWidth}
        onWheel={onWheel}>
        <Layer draggable={false} x={0} y={0}>
          <Grid/>
          {stageRef?.current && <Atoms stage={stageRef.current} zoom={zoom}/>}
        </Layer>
      </Stage>
    </div>
  )
}
