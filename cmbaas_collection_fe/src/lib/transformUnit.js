function transform (dataByte) {
  let sufix = ''
  if (dataByte < 1e3) {
    // Byte
    sufix = 'Byte(s)'
  } else if (dataByte >= 1e3 && dataByte < 1e6) {
    // KByte
    dataByte /= 1e3
    sufix = 'KB'
  } else if (dataByte >= 1e6 && dataByte < 1e9) {
    // MByte
    dataByte /= 1e6
    sufix = 'MB'
  } else if (dataByte >= 1e9 && dataByte < 1e12) {
    dataByte /= 1e9
    sufix = 'GB'
  } else if (dataByte >= 1e12) {
    dataByte /= 1e12
    sufix = 'TB'
  }
  return '' + Math.floor(dataByte) + '' + sufix
}

function transformCpu (timeUs) {
  let sufix = ''
  if (timeUs < 1e3) {
    // Byte
    sufix = 'us'
  } else if (timeUs >= 1e3 && timeUs < 1e6) {
    // KByte
    timeUs /= 1e3
    sufix = 'ms'
  } else if (timeUs >= 1e6 && timeUs < 1e6 * 60) {
    // MByte
    timeUs /= 1e6
    sufix = 's'
  } else if (timeUs >= 1e6 * 60 && timeUs < 1e6 * 3600) {
    timeUs /= (1e6 * 60)
    sufix = 'min'
  } else if (timeUs >= 1e6 * 3600) {
    timeUs /= (1e6 * 3600)
    sufix = 'hour'
  }
  return '' + Math.floor(timeUs) + '' + sufix
}

function transferData (value) {
  var units = ['', '千', '万', '十万', '百万', '千万', '亿', '十亿', '百亿', '千亿', '万亿', '兆']
  var param = {}
  if (Math.floor(value / 1e3) === 0) {
    param.unit = units[0]
    param.val = 3
  } else if (Math.floor(value / 1e4) === 0) {
    param.unit = units[1]
    param.val = 4
  } else if (Math.floor(value / 1e5) === 0) {
    param.unit = units[2]
    param.val = 5
  } else if (Math.floor(value / 1e6) === 0) {
    param.unit = units[3]
    param.val = 6
  } else if (Math.floor(value / 1e7) === 0) {
    param.unit = units[4]
    param.val = 7
  } else if (Math.floor(value / 1e8) === 0) {
    param.unit = units[5]
    param.val = 8
  } else if (Math.floor(value / 1e9) === 0) {
    param.unit = units[6]
    param.val = 9
  } else if (Math.floor(value / 1e10) === 0) {
    param.unit = units[7]
    param.val = 10
  } else if (Math.floor(value / 1e11) === 0) {
    param.unit = units[8]
    param.val = 11
  } else if (Math.floor(value / 1e12) === 0) {
    param.unit = units[9]
    param.val = 12
  } else if (Math.floor(value / 1e13) === 0) {
    param.unit = units[10]
    param.val = 13
  } else if (Math.floor(value / 1e14) === 0) {
    param.unit = units[11]
    param.val = 14
  }
  return param
}

function transferVal (value) {
  var param = {}
  var k = 10000
  var sizes = ['', '万', '亿', '万亿', '兆', '万兆']
  // var reg = /\d{1,3}(?=(\d{3})+$)/g
  var i
  if (value < k) {
    param.value = value
    param.unit = ''
  } else {
    i = Math.floor(Math.log(value) / Math.log(k))
    param.value = ((value / Math.pow(k, i)))
    param.unit = sizes[i]
  }
  param.value = Math.floor(param.value)
  return param
}

export {
  transform,
  transformCpu,
  transferData,
  transferVal
}
