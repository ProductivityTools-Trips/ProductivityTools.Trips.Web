
import { toast } from "react-toastify";
  
async function invokeCall(call){
    try {
        const response = call(null);
        return response;
      } catch (error) {
        console.log("Call endpoint");
        console.log(error);
      }
}

export async function invokeCallWithToast(call, pendingMessage, successMessage) {
    return toast.promise(invokeCall(call), {
      pending: pendingMessage ? pendingMessage : "Missing pending message",
      success: successMessage ? successMessage : "Missing sucesss message",
      error: {
        render({ data }) {
          console.log(data);
          return (
            <p>
              {data.message} [{data.response.data.message}]
            </p>
          );
        },
      },
    });
  }

