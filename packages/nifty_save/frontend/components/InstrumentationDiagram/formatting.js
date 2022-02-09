export function msToTime(ms) {
  let seconds = (ms / 1000).toFixed(1)
  let minutes = (ms / (1000 * 60)).toFixed(1)
  let hours = (ms / (1000 * 60 * 60)).toFixed(1)
  let days = (ms / (1000 * 60 * 60 * 24)).toFixed(1)
  if (seconds < 60) return seconds + ' Sec'
  else if (minutes < 60) return minutes + ' Min'
  else if (hours < 24) return hours + ' Hrs'
  else return days + ' Days'
}
