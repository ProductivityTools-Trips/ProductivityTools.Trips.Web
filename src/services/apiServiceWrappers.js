
import { toast } from "react-toastify";

async function invokeCall(call) {
        let token = localStorage.getItem("token");
        debugger;
        const header = { headers: { Authorization: `Bearer ${token}` } };
        const response =await call(header);
        return response;
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
                        {data.request.responseURL}
                    </p>
                );
            },
        },
    });
}

