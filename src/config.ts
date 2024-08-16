const Config = {
  minZoom: .1,
  maxZoom: 20,
  zoomDivider: 1.03,
  grid: {
    linesColor: 'aaa',
    fillColor: '#2980B9',
    lineWidth: .1,
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
    movColor:  '#cc4125',
    fixColor:  '#3d85c6',
    splColor:  '#6aa84f',
    ifColor:   '#efefef',
    jobColor:  '#e69138',
    repColor:  '#9900ff',
    textColor: 'black'
  },
  vm: {
    nextColor: '#6aa84f'
  }
}

export default Config;