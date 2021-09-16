setInterval(() => {
  if (new Date().getSeconds() === 0) renderTime()
}, 1000)

document.addEventListener('DOMContentLoaded', renderTime)

function dateNow() {
  const [day, month, dayOfMonth] = new Date().toDateString().split(' ')
  let MM = new Date().getMinutes()
  let HH = new Date().getHours()

  MM = MM < 10 ? '0' + MM : MM
  HH = HH < 10 ? '0' + HH : HH

  return `${day} ${dayOfMonth} ${month} ${HH}:${MM}`
}

function renderTime() {
  const p = getEl('#date')
  p.innerText = dateNow()
}
