import { LoaderCircle } from "lucide-react";

function LoadingOverlay({ message = "Please wait...", onClose }) {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="rounded-2xl bg-white px-10 py-8 shadow-2xl"
      >
        <div className="flex flex-col items-center">
          <LoaderCircle size={52} className="animate-spin text-blue-600" />

          <p className="mt-5 text-base font-semibold text-gray-700">
            {message}
          </p>

          <p className="mt-2 text-xs text-gray-400">Click outside to close</p>
        </div>
      </div>
    </div>
  );
}

export default LoadingOverlay;
