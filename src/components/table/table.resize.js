import { $ } from '../../core/dom'

const ROW_MIN_HEIGHT = 20
const COLUMN_MIN_WIDTH = 40

export const COL_RESIZE_TYPE = 'col'
export const ROW_RESIZE_TYPE = 'row'

export function resizeHandler(event, $root) {
    return new Promise((resolve) => {
        const $resize = $(event.target)
        const resizeType = $resize.data.resizeType
        const $parent = $resize.closest('[data-type="resizable"]')
        const coords = $parent.getCoords()
        const offset = $parent.offset()
        let size
        let delta
        $resize.addClass('pressed')
        document.body.classList.add('not-selectable')

        document.onmousemove = (e) => {
            if (resizeType === COL_RESIZE_TYPE) {
                delta = e.pageX - offset.right
                size = coords.width + delta
                if (size > COLUMN_MIN_WIDTH) {
                    $resize.css({ right: -delta + 'px' })
                }
            } else if (resizeType === ROW_RESIZE_TYPE) {
                delta = e.pageY - offset.bottom
                size = coords.height + delta
                if (size > ROW_MIN_HEIGHT) {
                    $resize.css({ bottom: -delta + 'px' })
                }
            }
        }

        document.onmouseup = () => {
            size = Math.round(size)
            if (resizeType === COL_RESIZE_TYPE) {
                size = roundToMinValue(size, COLUMN_MIN_WIDTH)
                const colIndex = $parent.data.col
                $root.findAll(`[data-col="${colIndex}"]`).forEach((el) => {
                    el.css({ width: size + 'px' })
                })
            } else if (resizeType === ROW_RESIZE_TYPE) {
                size = roundToMinValue(size, ROW_MIN_HEIGHT)
                $parent.css({ height: size + 'px' })
            }
            resolve({
                resizeType,
                resizeInfo: {
                    index: resizeType === COL_RESIZE_TYPE
                        ? parseInt($parent.data.col)
                        : parseInt($parent.data.row),
                    size,
                },
            })
            $resize.removeClass('pressed')
            $resize.css({ bottom: 0, right: 0 })
            document.body.classList.remove('not-selectable')
            document.onmousemove = null
            document.onmouseup = null
        }
    })
}

/**
 * @param {Number} currentValue (0 by default) input value
 * If {currentValue} > {minValue}, {currentValue} will be returned,
 * otherwise {minValue} will be returned
 * @param {Number} minValue (0 by default) number to which
 * {currentValue} will be rounded up
 * @return {Number}
 */
function roundToMinValue(currentValue = 0, minValue = 0) {
    if (currentValue > minValue) {
        return currentValue
    }
    return minValue
}
