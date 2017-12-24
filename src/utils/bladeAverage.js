export const calc = (data) => {
  let dataLen = data[Object.keys(data)[0]].cpu.length
  let vms = 0
  let newResult = {
    cpu: Array.apply(null, Array(dataLen)).map(Number.prototype.valueOf, 0),
    mem: Array.apply(null, Array(dataLen)).map(Number.prototype.valueOf, 0)
  }

  for (let i in data) {
    for (let j in data[i].cpu) {
      newResult.mem[j] += Number(data[i].mem[j])
      newResult.cpu[j] += Number(data[i].cpu[j])
    }
    vms++
  }
  let tmpCpu = newResult.cpu.map(each => round((each / vms), 2))
  let tmpMem = newResult.mem.map(each => round((each / vms), 2))
  let res = {}
  res.cpu = tmpCpu
  res.mem = tmpMem

  return res
}

function round (value, decimals) {
  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals)
}
