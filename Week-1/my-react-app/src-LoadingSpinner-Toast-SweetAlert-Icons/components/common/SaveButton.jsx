import { LoaderCircle, Save } from "lucide-react";

function SaveButton({ loading, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading ? (
        <>
          <LoaderCircle size={18} className="animate-spin" />
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

export default SaveButton;
