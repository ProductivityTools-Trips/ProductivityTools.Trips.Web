import { toast } from "react-toastify";

/** Auth header is added by the axios interceptor (session/authInterceptor.js). */
async function invokeCall(call) {
    return call({});
}

export async function invokeCallWithToast(call, pendingMessage, successMessage) {
    return toast.promise(invokeCall(call), {
        pending: pendingMessage ? pendingMessage : "Missing pending message",
        success: successMessage ? successMessage : "Missing sucesss message",
        error: {
            render({ data }) {
                console.log("invokeCallwithtost", data);
                return (
                    <p>
                        {data.message}<br/>
                        {data.request?.responseURL}
                    </p>
                );
            },
        },
    });
}
