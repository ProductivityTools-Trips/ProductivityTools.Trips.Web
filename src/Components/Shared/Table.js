import { useState } from 'react'

/**
 * Sortable column header. `sort` is `{ key, dir }`, `onSort(key)` toggles.
 */
export function SortHeader({ col, sort, onSort }) {
    const active = sort.key === col.key
    return (
        <th className={`${col.className ?? ''} ${col.numeric ? 'tbl__num' : ''}`}>
            {col.sortable === false ? col.label : (
                <button className={`tbl__sort ${active ? 'is-active' : ''}`} onClick={() => onSort(col.key)}>
                    {col.label}
                    <span className="tbl__sort-icon">{active ? (sort.dir === 'asc' ? '▲' : '▼') : '⇅'}</span>
                </button>
            )}
        </th>
    )
}

/** Sort state hook: toggles direction on the same key, resets on a new one. */
export function useSort(initialKey, initialDir = 'desc', ascKeys = ['name']) {
    const [sort, setSort] = useState({ key: initialKey, dir: initialDir })
    const toggle = (key) =>
        setSort(prev => prev.key === key
            ? { key, dir: prev.dir === 'asc' ? 'desc' : 'asc' }
            : { key, dir: ascKeys.includes(key) ? 'asc' : 'desc' })
    return [sort, toggle]
}
