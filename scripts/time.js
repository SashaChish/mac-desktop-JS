setInterval(() => {
  if (new Date().getSeconds() === 0) renderTime()
}, 1000)

document.addEventListener('DOMContentLoaded', renderTime)

function getDate() {
  const date = new Date()
  const [day, month, dayOfMonth] = date.toDateString().split(' ')
  let MM = date.getMinutes()
  let HH = date.getHours()

  MM = MM < 10 ? '0' + MM : MM
  HH = HH < 10 ? '0' + HH : HH

  return `${day} ${dayOfMonth} ${month} ${HH}:${MM}`
}

function renderTime() {
  const p = getEl('#date')
  p.innerText = getDate()
}
