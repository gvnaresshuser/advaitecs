import { Save } from "lucide-react";

function SaveButton5({ onClick, loading }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      className="flex items-center gap-2 rounded-lg bg-pink-600 px-5 py-2.5 font-medium text-white hover:bg-pink-700 disabled:opacity-60"
    >
      {loading ? (
        <>
          <span className="flex gap-1">
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white [animation-delay:-0.3s]" />
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white [animation-delay:-0.15s]" />
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white" />
          </span>
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

export default SaveButton5;
