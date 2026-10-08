import toast from "react-hot-toast";
import { CheckCircle, XCircle, Info, AlertTriangle } from "lucide-react";

export const showSuccessToast = (message) => {
    console.log("showSuccessToast called with message:", message);
  toast.custom((t) => (
    <div
      className={`flex items-center gap-3 rounded-xl bg-white px-5 py-4 shadow-xl ring-1 ring-gray-200 transition ${
        t.visible ? "animate-in fade-in slide-in-from-right-5" : "opacity-0"
      }`}
    >
      <CheckCircle size={24} className="text-green-600" />

      <div>
        <p className="font-semibold text-gray-800">Success</p>

        <p className="text-sm text-gray-500">{message}</p>
      </div>
    </div>
  ));
};

export const showErrorToast = (message) => {

  toast.custom((t) => (
    <div
      className={`flex items-center gap-3 rounded-xl bg-white px-5 py-4 shadow-xl ring-1 ring-gray-200 ${
        t.visible ? "animate-in fade-in slide-in-from-right-5" : ""
      }`}
    >
      <XCircle size={24} className="text-red-600" />

      <div>
        <p className="font-semibold text-gray-800">Error</p>

        <p className="text-sm text-gray-500">{message}</p>
      </div>
    </div>
  ));
};

export const showInfoToast = (message) => {
  toast.custom((t) => (
    <div
      className={`flex items-center gap-3 rounded-xl bg-white px-5 py-4 shadow-xl ring-1 ring-gray-200 ${
        t.visible ? "animate-in fade-in slide-in-from-right-5" : ""
      }`}
    >
      <Info size={24} className="text-blue-600" />

      <div>
        <p className="font-semibold text-gray-800">Information</p>

        <p className="text-sm text-gray-500">{message}</p>
      </div>
    </div>
  ));
};

export const showWarningToast = (message) => {
  toast.custom((t) => (
    <div
      className={`flex items-center gap-3 rounded-xl bg-white px-5 py-4 shadow-xl ring-1 ring-gray-200 ${
        t.visible ? "animate-in fade-in slide-in-from-right-5" : ""
      }`}
    >
      <AlertTriangle size={24} className="text-yellow-500" />

      <div>
        <p className="font-semibold text-gray-800">Warning</p>

        <p className="text-sm text-gray-500">{message}</p>
      </div>
    </div>
  ));
};
