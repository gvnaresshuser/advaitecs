import { RefreshCw, Save } from "lucide-react";

function SaveButton3({ onClick, loading }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      className="flex items-center gap-2 rounded-lg bg-purple-600 px-5 py-2.5 font-medium text-white hover:bg-purple-700 disabled:opacity-60"
    >
      {loading ? (
        <>
          <RefreshCw size={18} className="animate-spin" />
          Processing...
        </>
      ) : (
        <>
          <Save size={18} />
          Save User
        </>
      )}
    </button>
  );
}

export default SaveButton3;
