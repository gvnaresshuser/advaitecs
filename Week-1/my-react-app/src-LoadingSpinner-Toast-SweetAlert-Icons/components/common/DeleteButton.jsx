import { Trash2 } from "lucide-react";

function DeleteButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
    >
      <Trash2 size={17} />
      Delete
    </button>
  );
}

export default DeleteButton;
