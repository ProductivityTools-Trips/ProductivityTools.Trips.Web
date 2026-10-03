import moment from 'moment'

/** Expensed bar reaches full width / dark red at this amount (PLN). */
export const EXPENSED_SCALE = 30000

/** 0 → vivid green, 1 → deep red; values in between blend smoothly. */
export const barColor = (t) => {
    const hue = 140 - 140 * t        // 140° green → 0° red
    const light = 42 - 6 * t         // slightly darker towards red
    return `hsl(${hue}, 70%, ${light}%)`
}

export const fmtMoney = (v, digits = 0) =>
    v == null ? '—' : v.toLocaleString('pl-PL', { maximumFractionDigits: digits })

export const fmtDate = (d) => moment(d).format('D MMM YYYY')

export const fmtRange = (start, end) => {
    const s = moment(start), e = moment(end)
    if (s.isSame(e, 'day')) return e.format('D MMM YYYY')
    const sameYear = s.year() === e.year()
    const sameMonth = sameYear && s.month() === e.month()
    const left = sameMonth ? s.format('D') : sameYear ? s.format('D MMM') : s.format('D MMM YYYY')
    return `${left} – ${e.format('D MMM YYYY')}`
}

/** Generic comparator-driven sort helper: returns a new sorted array. */
export const sortBy = (rows, key, dir) => {
    const sign = dir === 'asc' ? 1 : -1
    return [...rows].sort((a, b) => {
        const x = a[key] ?? '', y = b[key] ?? ''
        return x > y ? sign : x < y ? -sign : 0
    })
}
