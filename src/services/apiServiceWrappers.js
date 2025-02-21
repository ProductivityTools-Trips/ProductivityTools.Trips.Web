
import { toast } from "react-toastify";

async function invokeCall(call) {
        const response =await call(null);
        return response;
}

export async function invokeCallWithToast(call, pendingMessage, successMessage) {
    return toast.promise(call, {
        pending: pendingMessage ? pendingMessage : "Missing pending message",
        success: successMessage ? successMessage : "Missing sucesss message",
        error: {
            render({ data }) {
                debugger;
                console.log("invokeCallwithtost", data);
                return (
                    <p>
                        {data.message}<br/>
                        {data.request.responseURL}
                    </p>
                );
            },
        },
    });
}

