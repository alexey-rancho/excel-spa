import { $ } from '@core/dom'

const ROW_MIN_HEIGH = 20
const COLUMN_MIN_WIDTH = 40

export function resizeHandler(event, $root) {
    const $resize = $(event.target)
    const resizeType = $resize.data.resizeType
    const $parent = $resize.closest('[data-type="resizable"]')
    const coords = $parent.getCoords()
    const offset = $parent.offset()
    let value
    let delta
    $resize.addClass('pressed')
    document.body.classList.add('not-selectable')

    document.onmousemove = (e) => {
        if (resizeType === 'col') {
            delta = e.pageX - offset.right
            value = coords.width + delta
            if (value > COLUMN_MIN_WIDTH) {
                $resize.css({ right: -delta + 'px' })
            }
        } else {
            delta = e.pageY - offset.bottom
            value = coords.height + delta
            if (value > ROW_MIN_HEIGH) {
                $resize.css({ bottom: -delta + 'px' })
            }
        }
    }
    document.onmouseup = (e) => {
        if (resizeType === 'col') {
            const colIndex = $parent.data.col
            $root.findAll(`[data-col="${colIndex}"]`).forEach((el) => {
                el.css({
                    width: value > 0 ? value + 'px' : '0px',
                })
            })
        } else {
            $parent.css({
                height: value > 0 ? value + 'px' : '0px',
            })
        }
        $resize.removeClass('pressed')
        $resize.css({ bottom: 0, right: 0 })
        document.body.classList.remove('not-selectable')
        document.onmousemove = null
        document.onmouseup = null
    }
}
