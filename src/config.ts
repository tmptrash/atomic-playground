const Config = {
  minZoom: .1,
  maxZoom: 20,
  zoomDivider: 1.3,
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
  atoms: {
    movColor: '#cc4125',
    fixColor: '#6fa8dc',
    splColor: '#93c47d',
    ifColor: '#efefef',
    jobColor: '#e69138',
    textColor: 'black',
    movDirColor: '#3d85c6'
  },
  vm: {
    nextColor: '#6aa84f'
  }
}

export default Config;