import { Toaster } from "react-hot-toast";

function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3000,
        style: {
          fontSize: "14px",
          fontWeight: "500",
        },
      }}
    />
  );
}

export default ToastProvider;
