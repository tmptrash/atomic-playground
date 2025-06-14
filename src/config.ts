const Config = {
  minZoom: .1,
  maxZoom: 30,
  zoomDivider: 1.02,
  textColor: 'black',
  grid: {
    linesColor: '#aaa',
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
    vmDirColor:   '#6aa84f',
    movDirColor:  '#cc4125',
    bond1Color:   '#6aa84f',
    bond2Color:   '#3d85c6',
    bondIfColor:  '#cc4125',
    bondIs2Color: '#b4a7d6'
  },
  atoms: {
    movColor:     '#e6b8af',
    fixColor:     '#9fc5e8',
    splColor:     '#b6d7a8',
    conColor:     '#efefef',
    jobColor:     '#f9cb9c',
    repColor:     '#b4a7d6',
    mutColor:     '#cccccc'
  },
  vm: {
    nextColor:    '#6aa84f',
    color:        '#6aa84f',
    inactiveColor:'#888',
    amountColor:  '#cc4125',
    energyColor:  '#6aa84f',
    energy: 10
  }
}

export default Config