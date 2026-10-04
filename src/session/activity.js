/**
 * Tiny pub/sub for API activity messages shown in the top status bar.
 * Replaces the react-toastify popups.
 *
 *   report({ level: 'pending' | 'success' | 'error', text })
 *   subscribe(fn) -> unsubscribe
 */
const listeners = new Set()
let last = null

export function report(message) {
    last = { ...message, at: Date.now() }
    listeners.forEach(fn => fn(last))
}

export function subscribe(fn) {
    listeners.add(fn)
    if (last) fn(last)
    return () => listeners.delete(fn)
}

/** Runs `promise`, reporting pending → success/error around it. */
export async function track(promise, pendingText, successText) {
    report({ level: 'pending', text: pendingText })
    try {
        const r = await promise
        report({ level: 'success', text: successText })
        return r
    } catch (err) {
        // axios errors are already reported by the response interceptor
        if (!err?.config) report({ level: 'error', text: err?.message ?? String(err) })
        throw err
    }
}
