const Config = {
  minZoom: .1,
  maxZoom: 20,
  zoomDivider: 1.03,
  grid: {
    linesColor: 'aaa',
    fillColor: '#2980B9',
    lineWidth: .3,
    fillOpacity: .15,
    borderWidth: 4,
    stepSize: 40,
    query: 'canvas',
    rows: 10,
    cols: 10
  },
  bonds: {
    vmDirColor:  '#6aa84f',
    movDirColor: '#cc4125',
    bond1Color:  '#6aa84f',
    bond2Color:  '#3d85c6',
    bondIfColor: '#cc4125'
  },
  atoms: {
    movColor:  '#e6b8af',
    fixColor:  '#9fc5e8',
    splColor:  '#b6d7a8',
    ifColor:   '#efefef',
    jobColor:  '#f9cb9c',
    repColor:  '#b4a7d6',
    textColor: 'black'
  },
  vm: {
    nextColor: '#6aa84f'
  }
}

export default Config