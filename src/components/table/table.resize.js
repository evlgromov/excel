import {$} from '@core/dom';


export function resizeHandler($root, e) {
  return new Promise(resolve => {
    const $resizer = $(e.target)
    const $parent = $resizer.closest('[data-type="resizable"]')
    const coords = $parent.getCoords()
    const type = $resizer.data.resize
    let value

    document.onmousemove = event => {
      if (type === 'col') {
        const minCellWidth = 40
        const minDelta = coords.width - minCellWidth
        const delta = event.pageX - coords.right
        const resizeValue = delta < -minDelta
          ? -minDelta
          : delta
        value = coords.width + delta
        $resizer.css({right: -resizeValue + 'px'})
      } else {
        const minRowHeight = 20
        const minDelta = coords.height - minRowHeight
        const delta = event.pageY - coords.bottom
        const resizeValue = delta < -minDelta
          ? -minDelta
          : delta
        value = coords.height + delta
        $resizer.css({bottom: -resizeValue + 'px'})
      }

      document.onmouseup = () => {
        document.onmousemove = null
        document.onmouseup = null
        if (type === 'col') {
          $parent.css({'width': value + 'px'})
          $root.findAll(`[data-col="${$parent.data.col}"]`)
              .forEach(el => el.style.width = value + 'px')
        } else {
          $parent.css({'height': value + 'px'})
        }
        resolve({
          value,
          type,
          id: $parent.data[type]
        })
        $resizer.css({
          bottom: 0,
          right: 0
        })
      }
    }
  })
}

