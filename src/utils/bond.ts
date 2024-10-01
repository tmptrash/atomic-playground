import Config from "../config"
import { BONDS_OFFS, LinePoints, Dir } from "../types"

export function getLinePoints(x: number, y: number, d: Dir, bondIdx: number, bonds: number): LinePoints {
  const step = Config.grid.stepSize
  const offs = BONDS_OFFS[d] as number[]

  // two bonds. use: two additional coordinates to move them
  if (bonds === 2) return [
    x + offs[0] * step + offs[4 + bondIdx * 2] * step,
    y + offs[1] * step + offs[5 + bondIdx * 2] * step,
    x + offs[2] * step + offs[4 + bondIdx * 2] * step,
    y + offs[3] * step + offs[5 + bondIdx * 2] * step
  ]
  // three bonds. use: two additional coordinates and x0,y0,x1,y1 in the middle
  if (bonds === 3) return [
    x + offs[0] * step + (bondIdx === 2 ? 0 : offs[4 + bondIdx * 2] * step),
    y + offs[1] * step + (bondIdx === 2 ? 0 : offs[5 + bondIdx * 2] * step),
    x + offs[2] * step + (bondIdx === 2 ? 0 : offs[4 + bondIdx * 2] * step),
    y + offs[3] * step + (bondIdx === 2 ? 0 : offs[5 + bondIdx * 2] * step)
  ]
  // four bonds. use: first with additional coords & the same * 2, second with additional coords & the same * 2
  if (bonds === 4) return [
    x + offs[0] * step + (bondIdx < 2 ? offs[4] * (bondIdx + .5) * step : offs[6] * (bondIdx - 1.5) * step),
    y + offs[1] * step + (bondIdx < 2 ? offs[5] * (bondIdx + .5) * step : offs[7] * (bondIdx - 1.5) * step),
    x + offs[2] * step + (bondIdx < 2 ? offs[4] * (bondIdx + .5) * step : offs[6] * (bondIdx - 1.5) * step),
    y + offs[3] * step + (bondIdx < 2 ? offs[5] * (bondIdx + .5) * step : offs[7] * (bondIdx - 1.5) * step)
  ]
  // only one bond. use: x0,y0,x1,y1
  return [
    x + offs[0] * step,
    y + offs[1] * step,
    x + offs[2] * step,
    y + offs[3] * step
  ]
}