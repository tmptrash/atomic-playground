const Config = {
  minZoom: .1,
  maxZoom: 20,
  zoomDivider: 1.03,
  textColor: 'black',
  grid: {
    linesColor: '#aaa',
    fillColor: '#2980B9',
    lineWidth: .3,
    fillOpacity: .15,
    borderWidth: 4,
    stepSize: 40,
    query: 'canvas',
    rows: 5,
    cols: 5
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
    conColor:  '#efefef',
    jobColor:  '#f9cb9c',
    repColor:  '#b4a7d6'
  },
  vm: {
    nextColor: '#6aa84f'
  }
}

export default Config