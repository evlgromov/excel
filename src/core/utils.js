export function capitalize(string) {
  if (typeof string !== 'string') {
    return ''
  }
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function getPropValue(el, prop) {
  return parseInt(window.getComputedStyle(el)[prop])
}
