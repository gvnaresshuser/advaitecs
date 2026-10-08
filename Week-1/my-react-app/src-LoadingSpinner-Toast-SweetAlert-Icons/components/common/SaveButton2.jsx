import { Loader, Save } from "lucide-react";

function SaveButton2({ onClick, loading }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      className="flex items-center gap-2 rounded-lg bg-green-600 px-5 py-2.5 font-medium text-white hover:bg-green-700 disabled:opacity-60"
    >
      {loading ? (
        <>
          <Loader size={18} className="animate-spin" />
          Saving...
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

export default SaveButton2;
