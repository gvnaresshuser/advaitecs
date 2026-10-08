import { LoaderCircle, Save } from "lucide-react";

function SaveButton4({ onClick, loading }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      className="flex items-center gap-2 rounded-lg bg-orange-500 px-5 py-2.5 font-medium text-white hover:bg-orange-600 disabled:opacity-60"
    >
      {loading ? (
        <>
          <LoaderCircle size={22} strokeWidth={3} className="animate-spin" />
          Please Wait...
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

export default SaveButton4;
