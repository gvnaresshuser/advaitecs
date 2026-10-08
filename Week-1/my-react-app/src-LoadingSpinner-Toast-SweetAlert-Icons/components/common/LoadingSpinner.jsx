import {
  LoaderCircle,
  Loader,
  RefreshCw,
  RotateCw,
  CircleDashed,
} from "lucide-react";

function LoadingSpinner({ message = "Loading...", type = "circle" }) {
  const spinnerIcons = {
    circle: LoaderCircle,
    loader: Loader,
    refresh: RefreshCw,
    rotate: RotateCw,
    dashed: CircleDashed,
  };

  // Select icon based on type
  const SpinnerIcon = spinnerIcons[type] || LoaderCircle;

  return (
    <div className="flex flex-col items-center justify-center py-10">
      <SpinnerIcon size={48} className="animate-spin text-blue-600" />

      <p className="mt-4 text-sm font-medium text-gray-600">{message}</p>
    </div>
  );
}

export default LoadingSpinner;
