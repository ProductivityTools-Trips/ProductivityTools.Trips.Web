import { track } from "../session/activity";

/** Auth header is added by the axios interceptor (session/authInterceptor.js). */
async function invokeCall(call) {
    return call({});
}

/**
 * Kept under its historical name for apiService; progress is now reported to
 * the top status bar instead of toast popups.
 */
export async function invokeCallWithToast(call, pendingMessage, successMessage) {
    return track(invokeCall(call), pendingMessage ?? "Loading…", successMessage ?? "Done");
}
